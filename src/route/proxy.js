import { CM_PROXY_APP_HOST, CM_PROXY_APP_PORT, CM_PROXY_HTTPS_ENABLED, CONSTANTS, TRANSCTION_TIMEOUT } from '../configuration/config';
import EthTransactionProcessor from '../processor/eth-transation-processor';
import { sendData, getClientIp } from '../util/http-client-utils';

const proxy = (request, response, next) => {
    const ethToken = request.headers[CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS];
    if (ethToken === undefined || ethToken === null) {
        const err = new Error();
        err.status = 403;
        err.message = 'child "' + CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS + '" fails because [' +
            CONSTANTS.HEADER.X_ETH_PUBLIC_ADDRESS + ' is required]';
        return response.jsonp(err);
    }

    const protocol = CM_PROXY_HTTPS_ENABLED ? 'https' : 'http';

    const options = {
        host: CM_PROXY_APP_HOST,
        port: CM_PROXY_APP_PORT,
        path: request.url,
        method: request.method,
        headers: getClientIp(request, request.headers),
    };

    // only create entry in blockchain support yet
    if (request.method === 'POST') {
        const exec = () => Promise.all([new EthTransactionProcessor
                .transactionResolve(request, response, next)]);
                setTimeout(exec, TRANSCTION_TIMEOUT);
    }
    // request forwarding
    sendData(protocol, options, request.body, response);
    return response;
};

export {
    proxy
}
