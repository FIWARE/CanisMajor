import { CONSTANTS } from '../configuration/config';
import logger from './logger';
// import JWTController from '../controller/jwt-controller';

// context mapping with the configuration and payload
const contextMappingResolver = (configuration, data) => {
    // let contextMapping = configuration.contextMapping;
    return new Promise((resolve, reject) => {
        try {
        const obj = [];
        //context mapping from payload to contract method, vars
        configuration.forEach((mapping) => {
            console.log(JSON.stringify(mapping));
            for(let key in  mapping.contextMapping) {
                const values = [];
                    mapping.contextMapping[key].forEach((params) => {
                        // maps for ID and TYPE from NGSI payload
                        if (data.hasOwnProperty(params)) {
                            if (params == 'id') {
                                values.push(data[params]);
                            } else 
                            if (params == 'type') {
                                values.push(data[params]);
                            } else {
                                // else values
                                values.push(data[params].value);
                            }
                        }
                })
                if(values.length !=0 ) {
                    obj.push({ method: key, value: values });
                }
            }
        })
        resolve(obj);
        } catch(e) {
            logger.error('contextMappingResolver error');
            reject('contextMappingResolver error');
        }
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
                            reject(`Smart Contract ABI doesnt have "${maps.method}" method, please fix config`);
                        }
                        // variable validation
                        if (element.inputs.length != maps.value.length) {
                            reject(`Smart Contract method "${maps.method}" takes ${maps.inputs.length} inputs, please fix config`);
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
const vaildateIdentity = (request) => {
    // in the current implementation validate only ETH public address
    const token = request.headers[CONSTANTS.HEADER.DLT_TOKEN];
    let keys = Buffer.from(token, 'base64').toString();
    keys = keys.split(':');
    let account = {
        address : keys[0],
        privateKey: keys[1]
    }
    return account;
}

// // check the entity Exist in Context Broker
// const contextBrokerEntityCheck = (entityId) => {
//     return new Promise((resolve, reject) => {
//         // support only v2 now ld implementation and resolver to be added
//         let protocol = CM_PROXY_HTTPS_ENABLED ? 'https' : 'http';
//         let url = `${protocol}://${CM_PROXY_APP_HOST}:${CM_PROXY_APP_PORT}/v2/entities/${entityId}`;
//         // fetch the data from the ContextBroker
//         fetch(url).then((response) => {
//             if (response.status == StatusCodes.OK) {
//                 resolve(resolve.json());
//             }
//         }).catch(() => {
//             let err = new Error();
//             err.status = StatusCodes.NOT_FOUND;
//             err.message = 'entity doesnt exists';
//             reject(err);
//         })
//     });
// }

 // future implementation
//  const signingTransaction = (payload, identity) => {
//     // to do
//   }

export {
    ABIValidator,
    contextMappingResolver,
    vaildateIdentity,
    // contextBrokerEntityCheck,
}