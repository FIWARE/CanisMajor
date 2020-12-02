import express from 'express';

import tokenValidator from '../validators/token-validators';
import headerValidator from '../validators/header-validators';
import paginationValidator from '../validators/pagination-validators';
import versionHandlerController from '../controllers/vesion-controller';

import transactionHandlerController from '../controllers/transaction-handler-controller';

import configHandlerController from '../controllers/config-controller';
import EntityCRUDController from '../controllers/entity-crud-controller';
import entitiesHandlerController from '../controllers/entities-handler-controller';

import notificationHandlerController from '../controllers/notification-handler-controller';
import subscriptionHandlerController from '../controllers/subscription-handler-controller';
import typesHandlerController from '../controllers/types-handler-controller';

const router = express.Router();


//*******META*******

//Returns the List of API's available in CanisMajor
router.get('/v2/',
  versionHandlerController.getVerionHandler.bind(versionHandlerController)
);


// service info
//version
router.get('/version',
  versionHandlerController.getVerionHandler.bind(versionHandlerController)
);

// health
router.get('/health',
  versionHandlerController.getHealthStatus.bind(versionHandlerController)
);

//*******CONFIG*******

//create configuration
router.post( '/create',
  configHandlerController.createEntry.bind(configHandlerController)
);

// configuration routes
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

router.delete('/v2/entities/:entityId',
  tokenValidator.validate,
  // headerValidator.validate,
  entitiesHandlerController.deleteEntityHandler.bind(entitiesHandlerController)
);

router.delete('/v2/types/:entityType',
  tokenValidator.validate,
  // headerValidator.validate,
  typesHandlerController.deleteTypeHandler.bind(typesHandlerController)
);

router.get( '/entity',
  paginationValidator.middleware,
  EntityCRUDController.allEntries.bind(EntityCRUDController)
);

router.post( '/entity',
  EntityCRUDController.createEntry.bind(EntityCRUDController)
);


//*******REQUEST*******

router.post('/v2/createEntity',
  tokenValidator.validateKeyRock,
  headerValidator.validate,
  entitiesHandlerController.createEntity.bind(entitiesHandlerController)
);

// router.post('/v2/subscribe',
//   tokenValidator.validate,
//   // headerValidator.validate,
//   subscriptionHandlerController.subscriptionHandler.bind(subscriptionHandlerController)
// );

router.post('/notify',
  tokenValidator.validate,
  headerValidator.validate,
  transactionHandlerController.transactionResolve.bind(transactionHandlerController)
);

module.exports = router;