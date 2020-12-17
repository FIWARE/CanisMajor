import { CONSTANTS, CM_PROXY_APP_HOST, CM_PROXY_APP_PORT, CM_PROXY_HTTPS_ENABLED } from '../configuration/config';
import * as fetch from 'node-fetch';

// DLT Type resolver
const dltConfigResolver = (data) => {
    return new Promise((resolve, reject) => {
        // only ETH clients are supported now
        if (data.dlt_config.dlt_type == CONSTANTS.DLT_TYPE.ETH) {
            delete data.dlt_config["dlt_type"];
            resolve(data.dlt_config);
        } else {
            reject(null);
        }
    })
}

// context mapping with the configuration and payload
const contextMappingResolver = (contextMapping, data) => {
    return new Promise((resolve, reject) => {
        const obj = [];
        //context mapping from payload to contract method, vars
        contextMapping.forEach((items) => {
            Object.keys(items).forEach((key) => {
                const values = [];
                items[key].forEach((params) => {
                    // maps for ID and TYPE from NGSI payload
                    if (data.hasOwnProperty(params)) {
                        if (params == 'id') {
                            values.push(data[params]);
                        } else if (params == 'type') {
                            values.push(data[params]);
                        } else {
                            // else values
                            values.push(data[params].value);
                        }
                    }
                });
                obj.push({ method: key, value: values });
            })
        });
        resolve(obj);
    });
}

// ABI validate with contextMapping
const ABIValidator = (abi, mapping) => {
    return new Promise((resolve, reject) => {
        abi.forEach((element) => {
            // function validation (in future: events, constants, constr)
            if (element.type === "function") {
                mapping.forEach((maps) => {
                    // method validation
                    if (maps.method != element.name) {
                        reject(`Smart Contract ABI doesnt have "${element.name}" method, please fix config`);
                    }
                    // variable validation
                    if (element.inputs.length != maps.value.length) {
                        reject(`Smart Contract method "${element.name}" takes ${element.inputs.length} inputs, please fix config`);
                    }
                    // variable type validation
                    // TO DO
                });
            }
        })
        resolve();
    });
}

// future implementation
const vaildateIdentity = (request) => {
    // in the current implementation validate only ETH public address
    const ethPublicAddress = request.headers[CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS];
    return Promise.resolve(ethPublicAddress);
}

// check the entity Exist in Context Broker
const contextBrokerEntityCheck = (entityId) => {
    return new Promise((resolve, reject) => {
        // support only v2 now ld implementation and resolver to be added
        let protocol = CM_PROXY_HTTPS_ENABLED ? 'https' : 'http';
        let url = `${protocol}://${CM_PROXY_APP_HOST}:${CM_PROXY_APP_PORT}/v2/entities/${entityId}`;
        // fetch the data from the ContextBroker
        fetch(url).then((response) => {
            if (response.status == StatusCodes.OK) {
                resolve(resolve.json());
            }
        }).catch(() => {
            let err = new Error();
            err.status = StatusCodes.NOT_FOUND;
            err.message = 'entity doesnt exists';
            reject(err);
        })
    });
}

 // future implementation
 const signingTransaction = (payload, identity) => {
    // to do
  }

export {
    ABIValidator,
    contextMappingResolver,
    dltConfigResolver,
    vaildateIdentity,
    contextBrokerEntityCheck,
}