'use strict';

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _notificationsController = require('../controllers/notifications-controller');

var _notificationsController2 = _interopRequireDefault(_notificationsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../auth')();
var router = _express2.default.Router();

/**
* @api {PUT} /api/notifications/:id PUT notifications
* @apiGroup notifications
*
* @apiParam (URL params) {Integer} id The selected notification id.
*
* @apiDescription Set the seen field from notifications to true.
*                 This endpoint can be used only by authenticate users.<br />
*
* @apiSuccess {Integer} id
* @apiSuccess {Integer} userId
* @apiSuccess {String} objectType
* @apiSuccess {Integer} objectId
* @apiSuccess {String} notificationType
* @apiSuccess {Boolean} seen
* @apiSuccess {Date} createdAt
* @apiSuccess {Date} updatedAt
*
* @apiSuccessExample Success-Response: /api/notifications/3
*     HTTP/1.1 200 OK
* {
*   "id": 3,
*   "userId": 1,
*   "objectType": "coach",
*   "objectId": 1,
*   "notificationType": "accepted",
*   "seen": true,
*   "createdAt": "2017-10-18T09:43:14.909Z",
*   "updatedAt": "2017-10-18T09:56:21.380Z"
* }
*/
router.put('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _notificationsController2.default.markAsSeen.bind(_notificationsController2.default));

/**
* @api {POST} /api/notifications/sendNotification POST notifications
* @apiGroup notifications
*
*
* @apiDescription send push notification to user
* @apiParam (JSON) {String} token
* @apiParam (JSON) {String} title
* @apiParam (JSON) {String} message
*
* @apiParamExample {JSON} Request-Example:
* {
* 	"token":"dsdssds",
* 	"title":"Lorem ipsum...",
* 	"message":"Lorem ipsum..."
* }
* @apiSuccess {String} status
*
* @apiSuccessExample Success-Response: /api/notifications/3
*     HTTP/1.1 200 OK
* {
*   "status": "dsdasdad",
* }
*/

router.post('/sendNotification', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _notificationsController2.default.createFireBaseNotification.bind(_notificationsController2.default));

module.exports = router;