import express from 'express';

// import tokenValidator from '../validators/token-validators';
// import headerValidator from '../validators/header-validators';
import paginationValidator from '../validators/pagination-validators';
import versionHandlerController from '../controllers/vesion-controller';
// import notificationHandlerController from '../controllers/notification-handler-controller';
import configHandlerController from '../controllers/config-controller';
const router = express.Router();


// service info
router.get('/version',
  versionHandlerController.getVerionHandler.bind(versionHandlerController)
);


// configuration routes
//get all configuration
router.get(
  '/config',
  paginationValidator.middleware,
  configHandlerController.allEntries.bind(configHandlerController)
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
