import { getFromIPFS } from '../util/helper/ipfs';
import { getFromIOTA } from '../util/helper/iota';
import { verify } from '../util/helper/merkle';
import { StatusCodes } from 'http-status-codes';
import { extractJson } from '@iota/extract-json';
import { composeAPI } from '@iota/core';
import { CONSTANTS } from '../configuration/config';

class HelperController {

    getDataFromIPFS(request, response) {
        let hash = request.params.id;
        if (hash == null || hash == '') {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'hash missing in param';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }
        getFromIPFS(hash).then((res) => {
            return response.status(StatusCodes.OK).jsonp(res);
        }).catch((err) => {
            return response.status(StatusCodes.BAD_REQUEST).jsonp(err);
        })
    }

    getDatafromIOTAMaM(request, response) {
        let hash = request.params.id;
        if (hash == null || hash == '') {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'hash missing in param';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }
        console.log('has' + hash);
        getFromIOTA(hash).then((res) => {
            return response.status(StatusCodes.OK).jsonp(res);
        }).catch((err) => {
            return response.status(StatusCodes.BAD_REQUEST).jsonp(err);
        })
    }

    getDatafromIOTATx(request, response) {
        const iota = composeAPI({
            provider: CONSTANTS.IOTA_CONFIG.endpoint
        });

        let hash = request.params.id;
        if (hash == null || hash == '') {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'hash missing in param';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }
        console.log('has' + hash);
        iota.getBundle(hash).then((bundle) => {
            console.log(bundle);
            console.log(Extract.extractJson(bundle));
            // console.log(JSON.parse(Extract.extractJson(bundle)));
            return response.status(StatusCodes.OK).jsonp(Extract.extractJson(bundle));
        }).catch((err) => {
            return response.status(StatusCodes.BAD_REQUEST).jsonp(err);
        })
    }

    verifyMerkleTree(request, response) {
        let hash = request.params.id;
        let key = request.params.key;
        if (hash == null || hash == '') {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'hash missing in param';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }
        if (key == null || key == '') {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'key missing in param';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }
        let body = request.body;
        if (body == null || body == '') {
            let err = new Error();
            err.status = StatusCodes.FORBIDDEN;
            err.message = 'body is empty';
            return response.status(StatusCodes.FORBIDDEN).jsonp(err);
        }

        verify(body, key, hash).then((res) => {
            return response.status(StatusCodes.OK).jsonp({ valid: res });
        }).catch((err) => {
            return response.status(StatusCodes.BAD_REQUEST).jsonp(err);
        })
    }
}

export default new HelperController();
