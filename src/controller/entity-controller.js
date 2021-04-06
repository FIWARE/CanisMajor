import BaseCRUDController from './base-crud-controller';
import EntityRepository from '../repository/entity-repository';
import { CONSTANTS } from '../configuration/config';
import { StatusCodes } from 'http-status-codes';
import { getAsset, getMetaData, getRelations } from './interface/aei-interface';

class EntityCRUDController extends BaseCRUDController {
  constructor() {
    super();
    this.repository = EntityRepository;
    this.filters = ['entityId'];
  }

  fetchDataFromDLT(request, response, next) {
    if(!CONSTANTS.ETHEREUM_CONFIG.aei_contract_mode) {
      return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'method is only supported for aeicontract'});
    }
    EntityRepository.findOneById(request.params.id).then((entity) => {
       if(entity.txDetails.objectType == 'asset') {
        getAsset(entity.entityId,(result) => {
          if(result == null || result == '') {
            return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'no data found'});
          }
            return response.status(StatusCodes.OK).jsonp(result);
        })
       } else if(entity.txDetails.objectType == 'metadata') {
        getMetaData(entity.entityId,(result) => {
          if(result == null || result == '') {
            return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'no data found'});
          }
            return response.status(StatusCodes.OK).jsonp(result);
        })
       }else if(entity.txDetails.objectType == 'relationship') {
        getRelations(entity.entityId,(result) => {
          if(result == null || result == '') {
            return response.status(StatusCodes.BAD_REQUEST).jsonp({'message': 'no data found'});
          }
            return response.status(StatusCodes.OK).jsonp(result);
        })
       }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export default new EntityCRUDController();
