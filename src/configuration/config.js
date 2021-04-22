import fetch from 'node-fetch';
const ENV = process.env;
//supported storage
const storageType = {
    IPFS: 'ipfs',
    MERKLETREE: 'merkletree',
    IOTA: 'iota',
    //In Future
    //DCB (decentralized context broker)
    //storj
};
// supported DLT Type
const DLTType = {
    ETHEREUM: 'eth',
    IOTA: 'iota'
    // In future
    // fabric chaincode
}

// DB Check
const DB_NAME = ENV.DB_NAME || 'cm';
const DB_HOST = ENV.DB_HOST || 'localhost';
const DB_PORT = ENV.DB_PORT || '3306';
const DB_DILECT = ENV.DB_DILECT || 'mysql';
const DB_USERNAME = ENV.DB_USERNAME || 'root';
const DB_PASSWORD = ENV.DB_PASSWORD || 'root';
// DEFAULT CanisMajor PORT
const CM_PORT = ENV.CM_PORT || 4000;

// implementation pending
const TRANSCTION_TIMEOUT = ENV.TRANSCTION_TIMEOUT || 1000;

// default DLT Transaction Type
const DLT_TYPE = ENV.DLT_TYPE || DLTType.ETHEREUM;

// DLT Configuration
const DLT_CONFIGURATION = {
    // IOTA
    IOTA_CONFIG: {
        endpoint: ENV.IOTA_ENDPOINT || 'https://nodes.devnet.iota.org:443'
    },
    // ETH-RPC Clients
    ETHEREUM_CONFIG: {
        endpoint: ENV.RPC_ENDPOINT || 'http://localhost:8545',
        default_gas: ENV.DEFAULT_GAS || 3000000,
        default_gasPrice: ENV.DEFAULT_GAS_PRICE || 0,
        aei_contract_mode: ENV.AEI_CONTRACT_MODE || true,
        contractAddress: ENV.CONTRACT_ADDRESS || '0x9a3DBCa554e9f6b9257aAa24010DA8377C57c17e',
    }
}

// Storage Configuration for ETH-Clients
const STORAGE_CONFIGURATION = {
    storage_type: ENV.STORAGE_TYPE || storageType.IPFS, //supported type: merkletree, ipfs, iota,
    ipfsConfig: {
        host: ENV.IPFS_HOST || 'ipfs.infura.io',
        port: ENV.IPFS_PORT || 5001,
        protocol: ENV.IPFS_PROTOCOL || 'https',
        headers: {
            authorization: ENV.IPFS_AUTH_CODE || ''
        },
        dagOptions: {
            format: 'dag-cbor',
            hashAlg: 'sha2-256'
        },
    },
    IOTAMaMConfig: {
        host: ENV.IOTAMAM_HOST || 'https://nodes.devnet.iota.org',
        mode: ENV.IOTAMAM_MODE || 'public'
    }
}

// encryption is not supported yet
const ENCYPTION_CONFIG = {
    // encrpytion and TxSign is not supported yet
    encrpytionMode: false,
    txSignMode: false,
    encyptionConfig: {
        algorithm: 'aes-256-ctr',
        secret: '1234'
    },
}

const CONSTANTS = {
    HEADER: {
        CORRELATOR: 'fiware-correlator',
        FIWARE_SERVICE: 'fiware-service',
        FIWARE_SERVICE_PATH: 'fiware-servicepath',
        FIWARE_TOTAL_COUNT: 'fiware-total-count',
        X_REAL_IP: 'x-real-ip',
        X_AUTH_TOKEN: 'x-auth-token',
        DLT_TOKEN: 'dlt-token',
        CONTEXT_MAPPING_KEYS: 'ctx_map',
    },
};

const validateConfig = async() => {

    if(CM_PORT == '') {
        throw new Error('CM_PORT is not defined');
    }
    if(DLT_TYPE == '') {
        if(DLT_TYPE != DLTType.IOTA || DLT_TYPE != DLTType.ETHEREUM) {
            throw new Error('DLT_TYPE should be either eth or iota');
        }
        throw new Error('DLT_TYPE is not defined');
    }

    //check if IOTA network is up or not
    if(DLT_TYPE == DLTType.IOTA) {
        await fetch(DLT_CONFIGURATION.IOTA_CONFIG.endpoint)
        .catch((err) => {
            console.log('IOTA Network Error : ' + err);
            process.exit(1);
        })
    }

    // check if RPC client is working or not
    if(DLT_TYPE == DLTType.ETHEREUM) {
        await fetch(DLT_CONFIGURATION.ETHEREUM_CONFIG.endpoint, 
            {method: 'POST', body: '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}' }
        )
        .then((res) => {
            if(res.status != 200) {
            console.log('Ethereum Network Error status : ' + res.status);
            process.exit(1);
            }
        }).catch((err) => {
            console.log('Ethereum Network Error : ' + err);
            process.exit(1);
        });
    }

    // check if storage type IPFS is working or not
    if(STORAGE_CONFIGURATION.storage_type == storageType.IOTA) {
        await fetch(STORAGE_CONFIGURATION.IOTAMaMConfig.host)
        .catch((err) => {
            console.log('IOTAMaM Storage Error : ' + err);
            process.exit(1);
        })
    }

    if(STORAGE_CONFIGURATION.storage_type == storageType.IPFS) {
        await fetch(STORAGE_CONFIGURATION.ipfsConfig.protocol 
                    + '://' + STORAGE_CONFIGURATION.ipfsConfig.host 
                    + ':' + STORAGE_CONFIGURATION.ipfsConfig.port)
        .catch((err) => {
            console.log('IPFS Storage Error : ' + err);
            process.exit(1);
        })
    }

    console.log('configuration validated');
    // rest validation is pending
}

validateConfig();

module.exports = {
    DLT_TYPE,
    DB_DILECT,
    DB_USERNAME,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_PASSWORD,
    CONSTANTS,
    DLT_CONFIGURATION,
    STORAGE_CONFIGURATION,
    ENCYPTION_CONFIG,
    CM_PORT,
    TRANSCTION_TIMEOUT,
    storageType,
    DLTType
}