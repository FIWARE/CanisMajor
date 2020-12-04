const ENV = process.env;

const DB_NAME = ENV.DB_NAME || 'canis_major';
const DB_HOST = ENV.DB_HOST || 'localhost';
const DB_PORT = ENV.DB_PORT || '3306';
const DB_DILECT = ENV.DB_DILECT || 'mysql';
const DB_USERNAME = ENV.DB_USERNAME || 'root';
const DB_PASSWORD = ENV.DB_PASSWORD || 'root';

const CM_PROXY_APP_HOST = ENV.CM_PROXY_HOST || 'localhost';
const CM_PROXY_APP_PORT = ENV.CM_PROXY_APP_PORT || 1026;
const CM_PROXY_PORT = ENV.CM_PROXY_PORT || 4000;
const CM_PROXY_HTTPS_ENABLED = ENV.CM_PROXY_HTTPS_ENABLED || false;


const CONSTANTS = {
    ENCRYPTION_ALGORITHMS: {
        SHA256: 'sha256',
        AES_256_CTR: 'aes-256-ctr'
    },
    HEADER: {
        CORRELATOR: 'fiware-correlator',
        FIWARE_SERVICE: 'fiware-service',
        FIWARE_SERVICE_PATH: 'fiware-servicepath',
        FIWARE_TOTAL_COUNT: 'fiware-total-count',
        X_REAL_IP: 'x-real-ip',
        X_AUTH_TOKEN: 'x-auth-token',
        X_ETH_PUBLIC_ADDRESS: 'x-eth-public-address'
    },
    DLT_TYPE: {
        ETH: 'eth'
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
    CM_PROXY_PORT,
}