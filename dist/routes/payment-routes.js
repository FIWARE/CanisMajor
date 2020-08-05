'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _paymentController = require('../controllers/payment-controller');

var _paymentController2 = _interopRequireDefault(_paymentController);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/payments/client-token GET generate client token
* @apiGroup payments
*
* @apiDescription Generate a client token used to add payment method.
*/
router.get('/client-token', _authenticate2.default.moveTokenFromQueryParamsToHeader, auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _paymentController2.default.generateToken.bind(_paymentController2.default));

module.exports = router;