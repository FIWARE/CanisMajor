import express from 'express';

import tokenValidator from '../validators/token-validators';
import headerValidator from '../validators/header-validators';
import versionHandlerController from '../controllers/vesion-controller';
import notificationHandlerController from '../controllers/notification-handler-controller';
const router = express.Router();


router.get('/version',
  versionHandlerController.getVerionHandler.bind(versionHandlerController)
);

router.post('/notify',
  tokenValidator.validate,
  // headerValidator.validate,
  notificationHandlerController.notificationHandler.bind(notificationHandlerController)
);


module.exports = router;
