// import { StatusCodes } from 'http-status-codes';
import { createAsset, addMetaData } from './interface/aei-interface';
import { vaildateIdentity } from '../util/resolver-utils';
import EntityRepository from '../repository/entity-repository';
import { CONSTANTS , storageType } from '../configuration/config';
import { getMerkelRoot } from '../util/helper/merkle';
import { uploadToIPFS } from '../util/helper/ipfs';
import { publishToIOTA , getFromIOTA } from '../util/helper/iota';

class AEIContractController {
    async CreateAsset(request, response, next) {        
        let identity = vaildateIdentity(request);
        let body = request.body;
        return Promise.resolve().then(() => {
            if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IPFS) {
                return uploadToIPFS(body);
            }
            else if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IOTA) {
                return publishToIOTA(body);
            } else {
                return getMerkelRoot(body);
            }
        }).then((value) => {
            return createAsset(body.id, value, identity.address);
        }).then((res) => {
            console.log(JSON.stringify(res));
            res['storageType'] = CONSTANTS.ETHEREUM_CONFIG.storage_type;
            res['objectType'] = 'asset';
            res['encyptionMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
            res['txSignMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
            delete res.events;
            return EntityRepository.create({entityId: body.id, txDetails: res});
        })      
        .catch((err) => {
            console.log(JSON.stringify(err));
            return EntityRepository.create({entityId: body.id, txDetails: err});
        })
    }

    async AddMetaData(request, response, next) {
        let identity = vaildateIdentity(request);
        let body = request.body;
        let id = request.params.id;
        console.log(id);
        return Promise.resolve().then(() => {
            if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IPFS) {
                return uploadToIPFS(body);
            }
            else if (CONSTANTS.ETHEREUM_CONFIG.storage_type == storageType.IOTA) {
                return publishToIOTA(body);
            } else {
                return getMerkelRoot(body);
            }
        }).then((value) => {
            return addMetaData(id, value, identity.address);
        }).then((res) => {
            res['storageType'] = CONSTANTS.ETHEREUM_CONFIG.storage_type;
            res['objectType'] = 'metadata';
            res['encyptionMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
            res['txSignMode'] = CONSTANTS.ETHEREUM_CONFIG.encrpytionMode;
            delete res.events;
            console.log('onssuccess');
            return EntityRepository.create({entityId: id, txDetails: res});
        })      
        .catch((err) => {
            console.log('ee');
            console.log(JSON.stringify(err));
            return EntityRepository.create({entityId: id, txDetails: err});
        })
            // let data = this.serielizeObj(body); 
            // data.forEach((rel) => {
            //     addRelation(id, rel, (result) => {
            //     console.log(JSON.stringify(result));
            //     res['storageType'] = CONSTANTS.ETHEREUM_CONFIG.storage_type;
            //     res['objectType'] = 'relationship';
            //     delete res.events;
            //     EntityRepository.create({entityId: body.id, txDetails: result});
            //     }, (err) => {
            //     EntityRepository.create({entityId: body.id, txDetails: err});
            //     });
            // })
    }

    // serielizeObj(payload) {
    //     let Obj=[];
    //     Object.keys(payload).forEach((key) => {
    //         if(typeof payload[key] == 'object') {
    //             this.serielizeObj(payload[key]);
    //             if(payload[key].type === 'Relationship') {
    //                 Obj.push(payload[key].object);
    //             }
    //         }
    //     })
    //     return Obj;
    // }
}

export default new AEIContractController();
