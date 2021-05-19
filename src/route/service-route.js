import express from 'express';
// validators
import dltKeyValidator from '../validator/key-validation';
import paginationValidator from '../validator/pagination-validator';
// CRUD Routes
import versionHandlerController from '../controller/vesion-controller';
import configHandlerController from '../controller/config-controller';
import entityCRUDController from '../controller/entity-controller';
// transaction processor
import transactionController from '../controller/transaction-controller';
import helperController from '../controller/helper-controller';


const router = express.Router();

//*******META*******
//version
router.get('/version',
  versionHandlerController.getVerionHandler.bind(versionHandlerController)
);
// health
router.get('/health',
  versionHandlerController.getHealthStatus.bind(versionHandlerController)
);
//*******CONFIG*******
// create configuration
router.post('/config',
  configHandlerController.createConfig.bind(configHandlerController)
);
//get all configuration
router.get('/config',
  paginationValidator.middleware,
  configHandlerController.allEntries.bind(configHandlerController)
);
//get configuration byId
router.get('/config/:id([0-9]+)',
  configHandlerController.oneSpecifiedEntry.bind(configHandlerController)
);
// update configuration
router.put('/config/:id([0-9]+)',
  configHandlerController.updateConfig.bind(configHandlerController)
);
// delete configuration
router.delete('/config/:id([0-9]+)',
  configHandlerController.deleteEntry.bind(configHandlerController)
);
//*******QUERIES*******
router.get('/entity',
  paginationValidator.middleware,
  entityCRUDController.allEntries.bind(entityCRUDController)
);
//get entity byId
router.get('/entity/:id([0-9]+)',
  entityCRUDController.oneSpecifiedEntry.bind(entityCRUDController)
);
//get entity byId
router.get('/entity/:id([0-9]+)/dlt',
  entityCRUDController.fetchDataFromDLT.bind(entityCRUDController)
);
// delete entity
router.delete('/entity/:id([0-9]+)',
  entityCRUDController.deleteEntry.bind(entityCRUDController)
);

router.get('/ipfs/:id',
helperController.getDataFromIPFS.bind(helperController));

router.get('/iotaMaM/:id',
helperController.getDatafromIOTAMaM.bind(helperController));

router.get('/iotaTx/:id',
helperController.getDatafromIOTATx.bind(helperController));

router.post('/merkle/:id/:key',
helperController.verifyMerkleTree.bind(helperController));

// PEP Proxy Request Handler only for NGSI-LD
router.post('/ngsi-ld/v1/entities/', 
  dltKeyValidator.validate,
  transactionController.createAssetTransaction.bind(transactionController)
);

router.post('/ngsi-ld/v1/entities/:id/attrs', 
  dltKeyValidator.validate,
  transactionController.addMetaDataTransaction.bind(transactionController)
);

router.patch('/ngsi-ld/v1/entities/:id/attrs', 
  dltKeyValidator.validate,
  transactionController.addMetaDataTransaction.bind(transactionController)
);

// PEP Proxy Request Handler only for NGSI-V2
router.post('/v2/entities/', 
  dltKeyValidator.validate,
  transactionController.createAssetTransaction.bind(transactionController)
);

router.post('/v2/entities/:id/attrs', 
  dltKeyValidator.validate,
  transactionController.addMetaDataTransaction.bind(transactionController)
);

router.patch('/v2/entities/:id/attrs', 
  dltKeyValidator.validate,
  transactionController.addMetaDataTransaction.bind(transactionController)
);


//pending
// Update Attribute Value (PATCH)
// http://{{orion}}/v2/entities/urn:ngsi-ld:Product:001/attrs/price/value
// http://{{orion}}/ngsi-ld/v1/entities/urn:ngsi-ld:TemperatureSensor:001/attrs/category
// {
//   "value": ["sensor", "actuator"],
//   "type": "Property"
// }

//batch has to be implemented

module.exports = router;