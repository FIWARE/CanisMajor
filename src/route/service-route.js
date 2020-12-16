import express from 'express';

// validators
import tokenValidator from '../validator/token-validator';
import headerValidator from '../validator/header-validator';
import paginationValidator from '../validator/pagination-validator';

// CRUD Routes
import versionHandlerController from '../controller/vesion-controller';
import configHandlerController from '../controller/config-controller';
// import EntityCRUDController from '../controllers/entity-crud-controller';

// // transaction processor
import EthTransactionProcessor from '../processor/eth-transation-processor';

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
router.get( '/config/:id([0-9]+)',
  configHandlerController.oneSpecifiedEntry.bind(configHandlerController)
);
// update configuration
router.put( '/config/:id([0-9]+)',
  configHandlerController.updateEntry.bind(configHandlerController)
);
// delete configuration
router.delete( '/config/:id([0-9]+)',
  configHandlerController.deleteEntry.bind(configHandlerController)
);


//*******QUERIES*******

// router.delete('/v2/entities/:entityId',
//   tokenValidator.validate,
//   // headerValidator.validate,
//   entitiesHandlerController.deleteEntityHandler.bind(entitiesHandlerController)
// );

// router.delete('/v2/types/:entityType',
//   tokenValidator.validate,
//   // headerValidator.validate,
//   typesHandlerController.deleteTypeHandler.bind(typesHandlerController)
// );

// router.get( '/entity',
//   paginationValidator.middleware,
//   EntityCRUDController.allEntries.bind(EntityCRUDController)
// );

// router.post( '/entity',
//   EntityCRUDController.createEntry.bind(EntityCRUDController)
// );


//*******REQUEST*******
router.post('/transaction',
  tokenValidator.validate,
  headerValidator.validate,
  EthTransactionProcessor.transactionResolve.bind(EthTransactionProcessor)
);

module.exports = router;