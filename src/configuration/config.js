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

const DLTType = {
    ETHEREUM : 'eth',
    IOTA: 'iota'
    // In future
    // fabric chaincode
}

const DB_NAME = ENV.DB_NAME || 'cm';
const DB_HOST = ENV.DB_HOST || 'localhost';
const DB_PORT = ENV.DB_PORT || '3306';
const DB_DILECT = ENV.DB_DILECT || 'mysql';
const DB_USERNAME = ENV.DB_USERNAME || 'root';
const DB_PASSWORD = ENV.DB_PASSWORD || 'root';
const CM_PORT = ENV.CM_PORT || 4000;

const CM_PROXY_APP_HOST = ENV.CM_PROXY_APP_HOST || 'localhost';
const CM_PROXY_APP_PORT = ENV.CM_PROXY_APP_PORT || 1026;
const CM_PROXY_HTTPS_ENABLED = ENV.CM_PROXY_HTTPS_ENABLED || false;
const TRANSCTION_TIMEOUT = ENV.TRANSCTION_TIMEOUT || 1000;
const DLT_TYPE = ENV.DLT_TYPE || DLTType.IOTA;


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
    IOTA_CONFIG: {
        endpoint: ENV.IOTA_ENDPOINT || 'https://nodes.devnet.iota.org:443'
    },
    ETHEREUM_CONFIG: {
        endpoint: ENV.RPC_ENDPOINT ||  'http://127.0.0.1:8545',
        default_gas: ENV.DEFAULT_GAS || 3000000,
        default_gasPrice: ENV.DEFAULT_GAS_PRICE || 0,
        aei_contract_mode: ENV.AEI_CONTRACT_MODE || true,
        contractAddress: ENV.AEI_CONTRACT_ADDRESS || '0x39BF03Ab98EE4e37A482Fa5F4B411Cf0e73C39b4',
        storage_type: ENV.STORAGE_TYPE || storageType.IOTA, //supported type: merkletree, ipfs, iota,
        encrpytionMode: true,
        txSignMode: false,
        encyptionConfig: {
            algorithm: 'aes-256-ctr',
            secret: '1234'
        },
        ipfsConfig: {
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: ''
            },
            dagOptions: {
                format: 'dag-cbor',
                hashAlg: 'sha2-256'
            },
        },
        IOTAMaMConfig: {
            host: 'https://nodes.devnet.iota.org',
            mode: 'public'
        }
    }
};

module.exports = {
    DLT_TYPE,
    DB_DILECT,
    DB_USERNAME,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_PASSWORD,
    CONSTANTS,
    CM_PROXY_APP_HOST,
    CM_PROXY_APP_PORT,
    CM_PROXY_HTTPS_ENABLED,
    CM_PORT,
    TRANSCTION_TIMEOUT,
    storageType,
    DLTType
}