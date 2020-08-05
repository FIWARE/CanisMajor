module.exports = {
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
        X_AUTH_TOKEN: 'x-auth-token'
    },
    OPERATION_TYPE_PREFIX: 'OPS_CM_',
    OPERATION_TYPE: {
        NOT_AVAILABLE: 'NA',
        STARTUP: 'OPS_CM_STARTUP',
        SHUTDOWN: 'OPS_CM_SHUTDOWN',
        DB_CONN_OPEN: 'OPS_CM_DB_CONN_OPEN',
        DB_LOG: 'OPS_CM_DB_LOG',
        DB_CONN_CLOSE: 'OPS_CM_DB_CONN_CLOSE',
        SERVER_START: 'OPS_CM_SERVER_START',
        SERVER_LOG: 'OPS_CM_SERVER_LOG',
        SERVER_STOP: 'OPS_CM_SERVER_STOP'
    },
    DLT_TYPE: {
        ETH: 'eth',
        IOTA: 'iota'
    }
}