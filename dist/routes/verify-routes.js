'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _emailVerficationController = require('../controllers/email-verfication-controller');

var _emailVerficationController2 = _interopRequireDefault(_emailVerficationController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _emailVerficationController2.default.verify.bind(_emailVerficationController2.default));

module.exports = router;