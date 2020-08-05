'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sendEmailController = require('../controllers/send-email-controller');

var _sendEmailController2 = _interopRequireDefault(_sendEmailController);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../auth')();
var router = _express2.default.Router();

/**
* @api {POST} /api/send-email POST send email
* @apiGroup send email
*
* @apiDescription Request User Registration.
*
* @apiParam (JSON) {String} subject
* @apiParam (JSON) {String} message
*
* @apiParamExample {JSON} Request-Example:
* {
* 	"subject":"nice mail",
* 	"message":"Lorem ipsum..."
* }
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* {
*   "success": "true",
*   "message": "email_sent_successfully"
* }
*
* @apiError {JSON} error-Object An object with the problematic properties and validation errors for them.
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "subject": "",
*   "message": ""
* }
*/
router.post('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _sendEmailController2.default.sendEmail.bind(_sendEmailController2.default));

module.exports = router;