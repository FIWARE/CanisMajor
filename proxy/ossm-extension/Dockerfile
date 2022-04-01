FROM tinygo/tinygo as build

COPY /proxy/cm-forward-filter/go.mod /cm-forward-filter/go.mod
COPY /proxy/cm-forward-filter/go.sum /cm-forward-filter/go.sum
COPY /proxy/cm-forward-filter/main.go /cm-forward-filter/main.go

WORKDIR /cm-forward-filter
RUN tinygo build -o cm-forward-filter.wasm -target=wasi ./main.go

FROM scratch

COPY --from=build /cm-forward-filter/cm-forward-filter.wasm /cm-forward-filter.wasm
COPY /proxy/ossm-extension/manifest.yaml manifest.yaml