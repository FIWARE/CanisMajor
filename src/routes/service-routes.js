import express from 'express';

import tokenValidator from '../validators/token-validators';
import headerValidator from '../validators/header-validators';
import paginationValidator from '../validators/pagination-validators';
import versionHandlerController from '../controllers/vesion-controller';
import transactionHandlerController from '../controllers/transaction-handler-controller';
import configHandlerController from '../controllers/config-controller';
import EntityHandlerController from '../controllers/entity-crud-controller';
const router = express.Router();
// service info
//version
router.get('/version',
  versionHandlerController.getVerionHandler.bind(versionHandlerController)
);

// health
router.get('/health',
  versionHandlerController.getHealthStatus.bind(versionHandlerController)
);


// configuration routes
//get all configuration
router.get(
  '/config',
  paginationValidator.middleware,
  configHandlerController.allEntries.bind(configHandlerController)
);

router.get(
  '/entity',
  paginationValidator.middleware,
  EntityHandlerController.allEntries.bind(EntityHandlerController)
);

//get configuration byId
router.get(
  '/config/:id([0-9]+)',
  configHandlerController.oneSpecifiedEntry.bind(configHandlerController)
);




//create configuration
router.post(
  '/config',
  configHandlerController.createEntry.bind(configHandlerController)
);

router.post(
  '/entity',
  EntityHandlerController.createEntry.bind(EntityHandlerController)
);
// update configuration
router.put(
  '/config/:id([0-9]+)',
  configHandlerController.updateEntry.bind(configHandlerController)
);

// delete configuration
router.delete(
  '/config/:id([0-9]+)',
  configHandlerController.deleteEntry.bind(configHandlerController)
);



router.post('/notify',
  tokenValidator.validate,
  headerValidator.validate,
  transactionHandlerController.transactionResolve.bind(transactionHandlerController)
);


module.exports = router;
