const ENV = process.env;

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


const CONSTANTS = {
    // JWT_ALGORITHMS: {
    //     RS256: 'RS256',
    //     SECRET: '123456'
    // },
    HEADER: {
        CORRELATOR: 'fiware-correlator',
        FIWARE_SERVICE: 'fiware-service',
        FIWARE_SERVICE_PATH: 'fiware-servicepath',
        FIWARE_TOTAL_COUNT: 'fiware-total-count',
        X_REAL_IP: 'x-real-ip',
        X_AUTH_TOKEN: 'x-auth-token'
    },
    ETHEREUM_CONFIG: {
        endpoint: ENV.RPC_ENDPOINT ||  'http://127.0.0.1:8545',
        default_gas: ENV.DEFAULT_GAS || 0,
        default_gasPrice: ENV.DEFAULT_GAS_PRICE || 0,
        account: ENV.COINBASE_ACCOUNT ||  '',
        privateKey: ENV.COINBASE_ACCOUNT_PRIVATEKEY || ''
    },
    IOTA_CONFIG: {
        provider : ENV.IOTA_ENDPOINT || 'https://nodes.devnet.thetangle.org:443',
        zmq_provide: ENV.IOTA_ZMQ_ENDPOINT || 'tcp://zmq.devnet.iota.org:5556'
    }
};

module.exports = {
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
}