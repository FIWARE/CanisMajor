import express from 'express';

// validators
import tokenValidator from '../validator/token-validator';
import paginationValidator from '../validator/pagination-validator';

// CRUD Routes
import versionHandlerController from '../controller/vesion-controller';
import configHandlerController from '../controller/config-controller';
import entityCRUDController from '../controller/entity-controller';

// transaction processor
import ethTransactionController from '../controller/eth-transaction-controller';

import ethTransactionProcessor from '../processor/eth-transation-processor';


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
  configHandlerController.updateEntry.bind(configHandlerController)
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
// update entity
router.put('/entity/:id([0-9]+)',
  entityCRUDController.updateEntry.bind(entityCRUDController)
);
// delete entity
router.delete('/entity/:id([0-9]+)',
  entityCRUDController.deleteEntry.bind(entityCRUDController)
);


//*******ETH Transaction*******
// router.post('/eth/transaction/create',
//   tokenValidator.validate,
//   ethTransactionController.createATrasaction.bind(ethTransactionController)
// );

// router.post('/eth/transaction/read',
//   tokenValidator.validate,
//   ethTransactionController.readTransactionData.bind(ethTransactionController)
// );

// router.post('/eth/transaction/retry',
//   tokenValidator.validate,
//   ethTransactionController.retryTransaction.bind(ethTransactionController)
// );

//*******PROXY debug*******
router.post('/proxy',
  tokenValidator.validate,
  ethTransactionProcessor.transactionResolve.bind(ethTransactionProcessor)
);

module.exports = router;