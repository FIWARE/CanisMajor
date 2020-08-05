'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userSettingsController = require('../../controllers/users/user-settings-controller');

var _userSettingsController2 = _interopRequireDefault(_userSettingsController);

var _authenticate = require('../../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/users/:id/settings GET user-settings
* @apiGroup user-settings
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Retrieves a specific user settings. <br />
*                 This endpoint can be used only authenticated users.
*
* @apiParam (URL params) {Integer} id The selected user id.
*
* @apiSuccess {Integer} id
* @apiSuccess {Integer} userId
* @apiSuccess {Boolean} notificationNewMessage
* @apiSuccess {Boolean} notificationAppointmentAccepted
* @apiSuccess {Boolean} notificationAppointmentCancelled
* @apiSuccess {Boolean} emailNotifications
* @apiSuccess {Boolean} emailOffers
* @apiSuccess {Boolean} calendarSync
* @apiSuccess {Date} updatedAt Date and time of last update.
* @apiSuccess {Date} createdAt Date and time of creation.
*
* @apiSuccessExample Success-Response: /api/users/2/settings
*     HTTP/1.1 200 OK
*
* {
*   "id": 2,
*   "userId": 2,
*   "notificationNewMessage": false,
*   "notificationAppointmentAccepted": false,
*   "notificationAppointmentCancelled": true,
*   "emailNotifications": true,
*   "emailOffers": true,
*   "calendarSync": false,
*   "createdAt": "2017-09-19T13:18:49.527Z",
*   "updatedAt": "2017-09-19T13:18:49.527Z"
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.get('/:id([0-9]+)/settings', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelf, _userSettingsController2.default.getUserSettings.bind(_userSettingsController2.default));

/**
* @api {PUT} /api/users/:id/settings PUT update user-settings
* @apiGroup user-settings
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request Current User Update. <br />
*                 This endpoint can be used only admins or by authenticated user to edit his settings.<br />
*                 <a href="#api-user_settings-GetApiUsersIdSettings">Response is same as here.</a>
*
* @apiParam {Boolean} notificationNewMessage
* @apiParam {Boolean} notificationAppointmentAccepted
* @apiParam {Boolean} notificationAppointmentCancelled
* @apiParam {Boolean} emailNotifications
* @apiParam {Boolean} emailOffers
* @apiParam {Boolean} calendarSync
*
* @apiParamExample {JSON} Request-Example:
* {
*   "notificationNewMessage": false,
*   "notificationAppointmentAccepted": false,
*   "notificationAppointmentCancelled": false,
*   "emailNotifications": false,
*   "emailOffers": false,
*   "calendarSync": false
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "message": "invalid input syntax for type boolean: \"adasda\"",
*   "success": false
* }
*
* @apiErrorExample Error-Response
*     HTTP/1.1 403 Forbidden
* {
*   "success": false,
*   "message": "access_forbidden"
* }
*
*/
router.put('/:id([0-9]+)/settings', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelf, _userSettingsController2.default.updateUserSettings.bind(_userSettingsController2.default));

/**
* @api {POST} /api/users/:id/settings POST create user-settings
* @apiGroup user-settings
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request Current User Update. <br />
*                 This endpoint can be used only admins or by authenticated user to edit his settings.<br />
*                 <a href="#api-user_settings-GetApiUsersIdSettings">Response is same as here.</a>
*
*
* @apiParamExample {JSON} Request-Example:
* {
*   "notificationNewMessage": false,
*   "notificationAppointmentAccepted": false,
*   "notificationAppointmentCancelled": false,
*   "emailNotifications": false,
*   "emailOffers": false,
*   "calendarSync": false
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "message": "invalid input syntax for type boolean: \"adasda\"",
*   "success": false
* }
*
* @apiErrorExample Error-Response
*     HTTP/1.1 403 Forbidden
* {
*   "success": false,
*   "message": "access_forbidden"
* }
*
*/
router.post('/:id([0-9]+)/settings', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelf, _userSettingsController2.default.createUserSettings.bind(_userSettingsController2.default));

module.exports = router;