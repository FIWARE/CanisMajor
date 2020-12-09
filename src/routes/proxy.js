import { CM_PROXY_APP_HOST, CM_PROXY_APP_PORT, CM_PROXY_HTTPS_ENABLED, CONSTANTS, TRANSCTION_TIMEOUT } from '../configuration/config';
import transactionHandlerController from '../controllers/transaction-handler-controller';
import { sendData, getClientIp } from '../utils/http-client-utils';

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

    // create or update entry in blockchain
    if (request.method === 'POST' || request.method === 'PATCH') {
        const exec = () => Promise.all([new transactionHandlerController
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
