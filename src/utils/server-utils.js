import {v4} from 'uuid';
import { HEADER , OPERATION_TYPE , OPERATION_TYPE_PREFIX } from './constant';

/**
 * Returns the platform correlator if included in a request
 * @param {object} request The HTTP request
 * @return {string} The correlator, if any
 */

const getCorrelator = (request) => {
    return request && request.headers[HEADER.CORRELATOR];
}


/**
 * Adds the Fiware-Correlator header into the response object
 * @param {object} request  The request
 * @param {object} response The response
 */
const addFiwareCorrelator = (request, response) => {
    if (response && response.header) {
        // CSV response has no response.header
        response.header(HEADER.CORRELATOR, getCorrelator(request) || request.canismajor.context.trans);
    }
}

/**
 * Adds the Fiware-Total-Count header into the response object
 * @param {object} totalCount  The totalCount
 * @param {object} response The response
 */
const addFiwareTotalCount = (totalCount, response) => {
    if (response && response.header) {
        // CSV response has no response.header
        response.header(HEADER.FIWARE_TOTAL_COUNT, totalCount);
    }
}

/**
 * Generates the transaction identifier to be used for logging
 * @return {string} The generated transaction
 */
const createTransaction = () => {
    return v4();
}

/**
 * Returns the operation type for a concrete request to be used for logging
 * @param {object} request The request
 * @return {string} The operation type
 */
const getOperationType = (request) => {
    if (!request) {
        return OPERATION_TYPE.SERVER_LOG;
    }
    return OPERATION_TYPE_PREFIX + request.method.toUpperCase();
}

/**
 * Returns the object to return in case no aggregated data exists for
 *  certain criteria
 * @returns {Array} An empty array
 */
const getEmptyResponse = () => {
    return [];
}

/**
 * Transforms a response payload into a NGSI formatted response
 *  payload
 * @param ngsiVersion NGSI version to use. Anything different from 2 (included undefined) means v1
 * @param entityId The id of the requested entity's data
 * @param entityType The type of the requested entity's data
 * @param attrName The id of the requested attribute's data
 * @param payload The payload to transform
 * @return {Object} The payload using NGSI format
 */
const getNGSIPayload = (ngsiVersion, entityId, entityType, attrName, payload) => {
    let ngsiResponse;
    if (ngsiVersion === 2) {
        ngsiResponse = {
            // attr type is based in NGSIv2 specification "Partial Representations" section
            type: 'StructuredValue',
            value: payload
        };
    } else {
        ngsiResponse = {
            contextResponses: [
                {
                    contextElement: {
                        attributes: [
                            {
                                name: attrName,
                                values: payload
                            }
                        ],
                        id: entityId,
                        isPattern: false,
                        type: entityType
                    },
                    statusCode: {
                        code: '200',
                        reasonPhrase: 'OK'
                    }
                }
            ]
        };
    }
    return ngsiResponse;
}

/**
 * Returns the logging context associated to a request
 * @param {Object} request The request received
 * @return {Object} The context to be used for logging
 */
const getContext = (request) => {
    const transactionId = createTransaction();
    return {
        corr: getCorrelator(request) || transactionId,
        trans: transactionId,
        op: getOperationType(request),
        from: request.headers[HEADER.X_REAL_IP] || 'n/a',
        srv: request.headers[HEADER.FIWARE_SERVICE],
        subsrv: request.headers[HEADER.FIWARE_SERVICE_PATH],
        comp: 'CM'
    };
}

export {
    addFiwareCorrelator,
    addFiwareTotalCount,
    getContext,
    getCorrelator,
    getEmptyResponse,
    getNGSIPayload
}



