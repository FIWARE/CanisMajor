import { CONSTANTS, CM_PROXY_APP_HOST, CM_PROXY_APP_PORT, CM_PROXY_HTTPS_ENABLED } from '../configuration/config';
import * as fetch from 'node-fetch';
import JWTController from '../controller/jwt-controller';

// context mapping with the configuration and payload
const contextMappingResolver = (configuration, data) => {
    // let contextMapping = configuration.contextMapping;
    return new Promise((resolve, reject) => {
        const obj = [];
        //context mapping from payload to contract method, vars
        configuration.forEach((mapping) => {
            mapping.contextMapping.forEach((items) => {
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
        })
        resolve(obj);
    });
}

// ABI validate with contextMapping
const ABIValidator = (configuration, mapping) => {
    return new Promise((resolve, reject) => {
        configuration.forEach((config) => {
            config.metadata.abi.forEach((element) => {
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
        });       
        resolve();
    });
}

// future implementation
const vaildateIdentity = () => {
    // in the current implementation validate only ETH public address
    // const token = request.headers[CONSTANTS.HEADER.X_AUTH_TOKEN];
    // return JWTController.verifyJWT(token);
    let account = {
        address : CONSTANTS.DLT_CONFIG.account,
        privateKey: CONSTANTS.DLT_CONFIG.privateKey
    }
    return account;
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
    vaildateIdentity,
    contextBrokerEntityCheck,
}