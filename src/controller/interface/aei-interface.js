import { CONSTANTS } from '../../configuration/config';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import AssetArtifact from 'aeicontract/build/contracts/Assets.json';


Contract.setProvider(CONSTANTS.ETHEREUM_CONFIG.endpoint);
const contract = new Contract(AssetArtifact.abi, CONSTANTS.ETHEREUM_CONFIG.contractAddress);

const createAsset = async (uuid, hash, address) => {
    return new Promise((resolve, rejecct) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        contract.methods.createAsset(uuidToByte32, hash).send({
            from: address,
            gas: CONSTANTS.ETHEREUM_CONFIG.default_gas
        })
            .on('receipt', (receipt) => {
                resolve(receipt);
            })
            .on('error', (err, receipt) => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                rejecct(err);
            });
    });
};

const getAsset = (uuid, callback) => {
    let uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getAsset(uuidToByte32).call().then((response) => {
        callback(response);
    }).catch((err) => {
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

const addMetaData = (uuid, hash, address) => {
    return new Promise((resolve, rejecct) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        contract.methods.addMetadata(uuidToByte32, hash).send({
            from: address,
            gas: CONSTANTS.ETHEREUM_CONFIG.default_gas
        })
            .on('receipt', (receipt) => {
                resolve(receipt);
            })
            .on('error', (err, receipt) => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                rejecct(err);
            });
    });
};


const getMetaData = (uuid, callback) => {
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getMetadatas(uuidToByte32).call().then((res) => {
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

const addRelation = (uuid, relationPayload, success, error) => {
    return new Promise((resolve, rejecct) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        contract.methods.addRelation(uuidToByte32, hash).send({
            from: address,
            gas: CONSTANTS.ETHEREUM_CONFIG.default_gas
        })
            .on('receipt', (receipt) => {
                resolve(receipt);
            })
            .on('error', (err, receipt) => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                rejecct(err);
            });
    });
};

const getRelations = (uuid, callback) => {
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getRelations(uuidToByte32).call().then((res) => {
        callback(res);
    });
};

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
    addRelation,
    getRelations,
    // removeRelation
};