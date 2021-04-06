import express from 'express';
// validators
import dltKeyValidator from '../validator/key-validation';
import paginationValidator from '../validator/pagination-validator';
// CRUD Routes
import versionHandlerController from '../controller/vesion-controller';
import configHandlerController from '../controller/config-controller';
import entityCRUDController from '../controller/entity-controller';
// transaction processor
import ethTransactionController from '../controller/eth-transaction-controller';
import aeiContractController from '../controller/aei-contract-controller';
import helperController from '../controller/helper-controller';
import { CONSTANTS } from '../configuration/config';

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

router.get('/iota/:id',
helperController.getDatafromIOTA.bind(helperController));

router.post('/merkle/:id/:key',
helperController.verifyMerkleTree.bind(helperController));

// PEP Proxy Request Handler only for NGSI-LD
router.post('/ngsi-ld/v1/entities/', 
  dltKeyValidator.validate, 
  (CONSTANTS.ETHEREUM_CONFIG.aei_contract_mode) 
  ? aeiContractController.CreateAsset.bind(aeiContractController)
  : ethTransactionController.createATrasaction.bind(ethTransactionController)
);

router.post('/ngsi-ld/v1/entities/:id/attrs', 
  dltKeyValidator.validate, 
  (CONSTANTS.ETHEREUM_CONFIG.aei_contract_mode) 
  ? aeiContractController.AddMetaData.bind(aeiContractController)
  : ethTransactionController.createATrasaction.bind(ethTransactionController)
);

module.exports = router;