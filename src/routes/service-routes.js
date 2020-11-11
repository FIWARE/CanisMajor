import express from 'express';

// import tokenValidator from '../validators/token-validators';
// import headerValidator from '../validators/header-validators';
import paginationValidator from '../validators/pagination-validators';
import versionHandlerController from '../controllers/vesion-controller';
<<<<<<< HEAD
// import notificationHandlerController from '../controllers/notification-handler-controller';
import configHandlerController from '../controllers/config-controller';
import EntityHandlerController from '../controllers/entity-crud-controller';
const router = express.Router();
=======
import notificationHandlerController from '../controllers/notification-handler-controller';
import subscriptionHandlerController from '../controllers/subscription-handler-controller';
import entitiesHandlerController from '../controllers/entities-handler-controller';
import typesHandlerController from '../controllers/types-handler-controller';
>>>>>>> Initial Input API commit

const router = express.Router();

// service info
//version
router.get('/version',
  versionHandlerController.getVerionHandler.bind(versionHandlerController)
);

// health
router.get('/health',
  versionHandlerController.getHealthStatus.bind(versionHandlerController)

router.post('/v2/notify',
  tokenValidator.validate,
  headerValidator.validate,
  notificationHandlerController.notificationHandler.bind(notificationHandlerController)
);

router.post('/v2/subscribe',
  tokenValidator.validate,
  // headerValidator.validate,
  subscriptionHandlerController.subscriptionHandler.bind(subscriptionHandlerController)
);

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

router.get('/test',
  typesHandlerController.testTypeHandler.bind(typesHandlerController)
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


// router.post('/notify',
//   tokenValidator.validate,
//   // headerValidator.validate,
//   notificationHandlerController.notificationHandler.bind(notificationHandlerController)
// );

module.exports = router;
