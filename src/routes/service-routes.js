import express from 'express';

import tokenValidator from '../validators/token-validators';
import headerValidator from '../validators/header-validators';
import versionHandlerController from '../controllers/vesion-controller';
import notificationHandlerController from '../controllers/notification-handler-controller';
import subscriptionHandlerController from '../controllers/subscription-handler-controller';
import entitiesHandlerController from '../controllers/entities-handler-controller';
import typesHandlerController from '../controllers/types-handler-controller';

const router = express.Router();

router.get('/version',
  versionHandlerController.getVerionHandler.bind(versionHandlerController)
);

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

module.exports = router;