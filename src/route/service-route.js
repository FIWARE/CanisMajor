import express from 'express';

// validators
import tokenValidator from '../validator/token-validator';
import paginationValidator from '../validator/pagination-validator';

// CRUD Routes
import versionHandlerController from '../controller/vesion-controller';
import configHandlerController from '../controller/config-controller';
import entityCRUDController from '../controller/entity-controller';

//TOKEN Routes
import jwtHandlerController from '../controller/jwt-controller';

// transaction processor
import ethTransactionController from '../controller/eth-transaction-controller';

// eth processor (for proxy test only)
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

//**** JWT TOKEN */
router.post('/token',
  jwtHandlerController.generateJWT.bind(jwtHandlerController)
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
// delete entity
router.delete('/entity/:id([0-9]+)',
  entityCRUDController.deleteEntry.bind(entityCRUDController)
);


//*******ETH Transaction*******
router.post('/transaction/eth/create',
  tokenValidator.validate,
  ethTransactionController.createATrasaction.bind(ethTransactionController)
);

router.post('/transaction/eth/retry/:id([0-9]+)',
  tokenValidator.validate,
  ethTransactionController.retryTransaction.bind(ethTransactionController)
);

//*******PROXY debug*******
router.post('/notification',
  tokenValidator.validate,
  ethTransactionProcessor.transactionResolve.bind(ethTransactionProcessor)
);

module.exports = router;