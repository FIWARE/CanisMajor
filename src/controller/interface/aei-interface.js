import { DLT_CONFIGURATION } from '../../configuration/config';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import AssetArtifact from 'aeicontract/build/contracts/Assets.json';
import logger from '../../util/logger';


Contract.setProvider(DLT_CONFIGURATION.ETHEREUM_CONFIG.endpoint);
const contract = new Contract(AssetArtifact.abi, DLT_CONFIGURATION.ETHEREUM_CONFIG.contractAddress);
const web3 = new Web3(new Web3.providers.HttpProvider(DLT_CONFIGURATION.ETHEREUM_CONFIG.endpoint));

const createAsset = async (uuid, hash, identity) => {
    return new Promise((resolve, reject) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        let payloadData = contract.methods.createAsset(uuidToByte32, hash).encodeABI();
        console.log('uuidToByte32 ' + uuidToByte32);
        console.log('encoded payload ' + payloadData);
        web3.eth.getTransactionCount(identity.address)
            .then((TxCount) => {
                let txObj = {
                    nonce: web3.utils.toHex(TxCount),
                    gas: DLT_CONFIGURATION.ETHEREUM_CONFIG.default_gas,
                    data: payloadData,
                    to: DLT_CONFIGURATION.ETHEREUM_CONFIG.contractAddress,
                };
                console.log('txObject' + JSON.stringify(txObj));
                return web3.eth.accounts.signTransaction(txObj, identity.privateKey);
            })
            .then((tx) => {
                console.log('tx to be uploaded' + JSON.stringify(tx));
                return web3.eth.sendSignedTransaction(tx.rawTransaction);
            })
            .then((recipt) => {
                console.log('tx recipt' + JSON.stringify(recipt));
                logger.info(recipt);
                resolve(recipt);
            })

            .catch((error) => {
                console.log('tx error' + JSON.stringify(error));
                logger.error(error);
                reject(error);
            })
    });
};

const getAsset = (uuid, callback) => {
    let uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getAsset(uuidToByte32).call().then((response) => {
        logger.info(response);
        callback(response);
    }).catch((err) => {
        logger.error(err);
        callback(err);
    });
};

// const updateAsset = (uuid, payload, address, callback) => {
//     return Promise.resolve().then(() => {
//         if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IPFS) {
//             return uploadToIPFS(payload);
//         }
//         else if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IOTA) {
//             return publishToIOTA(payload);
//         } else {
//             return getMerkelRoot(payload);
//         }
//     }).then((value) => {
//         let uuidToByte32 = Web3.utils.fromAscii(uuid);
//         return contract.methods.updateAsset(uuidToByte32, value).send({
//             from: address,
//             gas: CONSTANTS.ETHEREUM_CONFIG.default_gas
//         });
//     }).then((res) => {
//         callback({ TxRecipt: res, StorageType: CONSTANTS.ETHEREUM_CONFIG.storage_type });
//     })
//         .catch((err) => {
//             callback(err);
//         });
// };

// const removeAsset = (uuid, address, callback) => {
//     var uuidToByte32 = Web3.utils.fromAscii(uuid);
//     contract.methods.removeAsset(uuidToByte32).send({
//         from: address
//     }).then((response) => {
//         callback({ TxRecipt: response });
//     }).catch((err) => {
//         callback(err);
//     });
// };

const addMetaData = (uuid, hash, identity) => {
    return new Promise((resolve, reject) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        let payloadData = contract.methods.addMetadata(uuidToByte32, hash).encodeABI();
        console.log('uuidToByte32 ' + uuidToByte32);
        console.log('encoded payload ' + payloadData);
        web3.eth.getTransactionCount(identity.address)
            .then((TxCount) => {
                let txObj = {
                    nonce: web3.utils.toHex(TxCount),
                    gas: DLT_CONFIGURATION.ETHEREUM_CONFIG.default_gas,
                    data: payloadData,
                    to: DLT_CONFIGURATION.ETHEREUM_CONFIG.contractAddress,
                };
                console.log('txObject' + JSON.stringify(txObj));
                return web3.eth.accounts.signTransaction(txObj, identity.privateKey);
            })
            .then((tx) => {
                console.log('tx to be uploaded' + JSON.stringify(tx));
                return web3.eth.sendSignedTransaction(tx.rawTransaction);
            })
            .then((recipt) => {
                console.log('tx recipt' + JSON.stringify(recipt));
                logger.info(recipt);
                resolve(recipt);
            })

            .catch((error) => {
                console.log('tx error' + JSON.stringify(error));
                logger.error(error);
                reject(error);
            })
    });
};


const getMetaData = (uuid, callback) => {
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getMetadatas(uuidToByte32).call().then((res) => {
        logger.info(res);
        callback(res);
    });
};

// const remoteMetaData = (uuid, index, address, callback) => {
//     var uuidToByte32 = Web3.utils.fromAscii(uuid);
//     contract.methods.removeMetadata(uuidToByte32, index).send({
//         from: address
//     }).then((response) => {
//         callback({ TxRecipt: response });
//     }).catch((err) => {
//         callback(err);
//     });
// };

// const addRelation = (uuid, relationPayload, success, error) => {
//     return new Promise((resolve, rejecct) => {
//         let uuidToByte32 = Web3.utils.fromAscii(uuid);
//         contract.methods.addRelation(uuidToByte32, hash).send({
//             from: address,
//             gas: DLT_CONFIGURATION.ETHEREUM_CONFIG.default_gas
//         })
//             .on('receipt', (receipt) => {
//                 logger.info(receipt);
//                 resolve(receipt);
//             })
//             .on('error', (err, receipt) => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
//                 logger.error(err);
//                 rejecct(err);
//             });
//     });
// };

// const getRelations = (uuid, callback) => {
//     var uuidToByte32 = Web3.utils.fromAscii(uuid);
//     contract.methods.getRelations(uuidToByte32).call().then((res) => {
//         logger.info(res);
//         callback(res);
//     });
// };

// const removeRelation = (uuid, index, address, callback) => {
//     var uuidToByte32 = Web3.utils.fromAscii(uuid);
//     contract.methods.removeRelation(uuidToByte32, index).send({
//         from: address
//     }).then((response) => {
//         callback({ TxRecipt: response });
//     }).catch((err) => {
//         callback(err);
//     });
// };

export {
    createAsset,
    getAsset,
    // updateAsset,
    // removeAsset,
    addMetaData,
    getMetaData,
    // remoteMetaData,
    // addRelation,
    // getRelations,
    // removeRelation
};