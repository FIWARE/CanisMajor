import express from 'express';

// validators
import tokenValidator from '../validators/token-validators';
import headerValidator from '../validators/header-validators';
import paginationValidator from '../validators/pagination-validators';

// CRUD Routes
import versionHandlerController from '../controllers/vesion-controller';
import configHandlerController from '../controllers/config-controller';
import EntityCRUDController from '../controllers/entity-crud-controller';


// // transaction processor
// import transactionHandlerController from '../controllers/transaction-handler-controller';

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
router.post( '/create',
  configHandlerController.createEntry.bind(configHandlerController)
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

//ENTITY OPERATIONS:

router.get( '/entities',
  paginationValidator.middleware,
  EntityCRUDController.getAll.bind(EntityCRUDController)
);


router.get('/v2/entities/:entityId([0-9]+)',
  //tokenValidator.validate,
  //headerValidator.validate,
  EntityCRUDController.getEntityById.bind(EntityCRUDController)
);

router.get('/v2/entities/:entityId([0-9]+)/attrs/:attrName()',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntityByIdAndAttrs.bind(EntityCRUDController)
);

router.get('/v2/entities/:entityId([0-9]+)/attrs/:attrName()/value',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntityByIdAndAttrsOnlyValues.bind(EntityCRUDController)
);

router.get('/v2/entities/:entityId([0-9]+)/value',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntityByIdOnlyValues.bind(EntityCRUDController)
);

//TYPES OPERATIONS:

router.get('/v2/types/:entityType',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntitiesByType.bind(EntityCRUDController)
);

router.get('/v2/types/:entityType/value',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntitiesByTypeOnlyValue.bind(EntityCRUDController)
);

router.get('/v2/types/:entityType/attrs/:attrsName',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntitiesByTypeAndAttrs.bind(EntityCRUDController)
);

router.get('/v2/types/:entityType/attrs/:attrsName/value',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntitiesByTypeAndAttrsOnlyValues.bind(EntityCRUDController)
);

//ATTRIBUTES OPERATIONS:

router.get('/v2/attrs/:attrsName',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntitiesByAttrs.bind(EntityCRUDController)
);

router.get('/v2/attrs/:attrsName/value',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntitiesByAttrsOnlyValues.bind(EntityCRUDController)
);

router.get('/v2/attrs/',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntitiesByAttrs.bind(EntityCRUDController)
);

router.get('/v2/attrs/value',
  //tokenValidator.validate,
  // headerValidator.validate,
  EntityCRUDController.getEntitiesByAttrsOnlyValues.bind(EntityCRUDController)
);



//*******REQUEST*******

// router.post( '/entity',
//   EntityCRUDController.createEntry.bind(EntityCRUDController)
// );


// router.delete('/v2/types/:entityType',
//   tokenValidator.validate,
//   // headerValidator.validate,
//   typesHandlerController.deleteTypeHandler.bind(typesHandlerController)
// );


// router.post('/notify',
//   tokenValidator.validate,
//   headerValidator.validate,
//   transactionHandlerController.transactionResolve.bind(transactionHandlerController)
// );

module.exports = router;