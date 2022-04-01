package main

import (
	"fmt"

	"github.com/tetratelabs/proxy-wasm-go-sdk/proxywasm"
	"github.com/tetratelabs/proxy-wasm-go-sdk/proxywasm/types"
	"github.com/valyala/fastjson"
)

const (
	pathKey = ":path"
)

var config PluginConfiguration

var parser fastjson.Parser

/**
* Struct to hold the config for this plugin.
 */
type PluginConfiguration struct {
	CanisMajorName string
	RequestTimeout uint32
	Strict         bool
}

var defaultPluginConfig PluginConfiguration = PluginConfiguration{CanisMajorName: "canis-major", RequestTimeout: 5000}

type (
	vmContext     struct{}
	pluginContext struct {
		// Embed the default plugin context here,
		// so that we don't need to reimplement all the methods.
		types.DefaultPluginContext
	}
	httpContext struct {
		types.DefaultHttpContext
		totalRequestBodySize int
		hs                   [][2]string
		contextId            uint32
	}
)

func main() {
	proxywasm.SetVMContext(&vmContext{})
}

// Handle the start event of the wasm-vm
func (*vmContext) OnVMStart(vmConfigurationSize int) types.OnVMStartStatus {

	proxywasm.LogInfo("Successfully started VM.")
	return types.OnVMStartStatusOK
}

// Handle the plugin start and read the config
func (ctx pluginContext) OnPluginStart(pluginConfigurationSize int) types.OnPluginStartStatus {
	readConfiguration()
	proxywasm.LogInfo("Successfully started plugin.")
	return types.OnPluginStartStatusOK
}

// Update the plugin context and read the config and override types.DefaultPluginContext.
func (*vmContext) NewPluginContext(contextID uint32) types.PluginContext {
	readConfiguration()
	return &pluginContext{}
}

// Override types.DefaultPluginContext.
func (*pluginContext) NewHttpContext(contextID uint32) types.HttpContext {
	proxywasm.LogInfof("Create new context %v", contextID)
	return &httpContext{contextId: contextID}
}

/**
* Reads the plugin config
 */
func readConfiguration() {
	data, err := proxywasm.GetPluginConfiguration()
	if err != nil {
		proxywasm.LogCriticalf("Error reading plugin configuration: %v. Using the default.", err)
		return
	}

	proxywasm.LogInfof("Config: %v", string(data))

	parseConfigFromJson(string(data))

}

/**
* Parses the config provided by the plugin context. Will use defaults for invalid entries.
 */
func parseConfigFromJson(jsonString string) {
	// initialize with defaults
	config = defaultPluginConfig

	parsedJson, err := parser.Parse(jsonString)

	if err != nil {
		proxywasm.LogCriticalf("Unable to parse config: %v, will use default", err)
		return
	}

	canisMajorName := parsedJson.GetStringBytes("clusterName")
	requestTimeout := parsedJson.GetInt("requestTimeout")
	// in case of error, the boolean zero value is used(e.g. false)
	config.Strict = parsedJson.GetBool("strict")

	if canisMajorName != nil {
		config.CanisMajorName = string(canisMajorName)
	} else {
		proxywasm.LogInfof("Use default cluster name for CanisMajor: %v", defaultPluginConfig.CanisMajorName)
	}
	if requestTimeout > 0 {
		config.RequestTimeout = uint32(requestTimeout)
	} else {
		proxywasm.LogInfof("Use default request timeout: %v", defaultPluginConfig.RequestTimeout)
	}

}

func (ctx *httpContext) OnHttpRequestHeaders(numHeaders int, endOfStream bool) types.Action {
	ctx.hs, _ = proxywasm.GetHttpRequestHeaders()
	proxywasm.LogInfof("Got headers: %v", ctx.hs)
	return types.ActionContinue
}

/**
* Take all the incoming requests and forward them to canismajor.
 */
func (ctx *httpContext) OnHttpRequestBody(bodySize int, endOfStream bool) types.Action {

	proxywasm.LogDebugf("Received request %v - EoS: %s", ctx.contextId, endOfStream)
	ctx.totalRequestBodySize += bodySize
	if !endOfStream {
		proxywasm.LogDebugf("Wait for end of stream")
		// Wait until we see the entire body to replace.
		return types.ActionPause
	}

	originalBody, err := proxywasm.GetHttpRequestBody(0, ctx.totalRequestBodySize)
	proxywasm.LogDebugf("Received body %v", string(originalBody))
	if err != nil {
		return handleError(fmt.Sprintf("Failed to get request body: %v", err))
	}
	_, err = proxywasm.DispatchHttpCall(config.CanisMajorName, ctx.hs, originalBody, nil, config.RequestTimeout,
		func(numHeaders, bodySize, numTrailers int) {
			_, err := proxywasm.GetHttpCallResponseHeaders()
			if err != nil {
				_ = handleError(fmt.Sprintf("Was not able to persist data in canismajor. Returned: %v", err))
			}
			proxywasm.LogDebugf("Successfully requested canis major, will resume request.")
			proxywasm.ResumeHttpRequest()
		})
	if err != nil {
		return handleError(fmt.Sprintf("Was not able to dispatch request to CanisMajor. Error: %v", err))
	}

	if config.Strict {
		proxywasm.LogDebugf("Strict forwarding enabled, wait for canismajor-request to be succeeded.")
		// in case of strict forwarding, we have to pause the request and explicitly resume it.
		return types.ActionPause
	} else {
		proxywasm.LogDebugf("Non-Strict forwarding, continue regardless of canismajor-request result.")
		// for non-strict cases, we simply ignore what happens and continue the request.
		return types.ActionContinue
	}
}

func handleError(message string) types.Action {
	proxywasm.LogErrorf(message)
	if config.Strict {
		// we are the gateway, thus every error should be 502
		proxywasm.SendHttpResponse(502, nil, []byte(message), 502)
	}
	return types.ActionContinue
}
