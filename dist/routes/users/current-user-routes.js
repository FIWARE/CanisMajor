'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _currentUserController = require('../../controllers/users/current-user-controller');

var _currentUserController2 = _interopRequireDefault(_currentUserController);

var _pagination = require('../../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

var _usersController = require('../../controllers/users/users-controller');

var _usersController2 = _interopRequireDefault(_usersController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/users/current GET current user
* @apiGroup users current
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Retrieves the current user. <br />
*                 This endpoint can be used only by authenticated users.
*
* @apiSuccess {Integer} id
* @apiSuccess {String} name
* @apiSuccess {String} username
* @apiSuccess {String} title
* @apiSuccess {String} emailAddress
* @apiSuccess {String} about
* @apiSuccess {String} goals
* @apiSuccess {Boolean} isAdmin
* @apiSuccess {Boolean} isBanned
* @apiSuccess {Boolean} isDeleted
* @apiSuccess {String} coverPicture
* @apiSuccess {String} profilePicture
* @apiSuccess {Object} user[coach]
* @apiSuccess {Object} user[coach][category]
* @apiSuccess {Object} user[coach][speciality]
* @apiSuccess {Date} updatedAt
* @apiSuccess {Date} createdAt
* @apiSuccess {Object} coach
*
* @apiSuccessExample Success-Response
*     HTTP/1.1 200 OK
* {
*   "id": 1,
*   "username": "briannn",
*   "name": "Brian Tracey",
*   "title": "Knight",
*   "emailAddress": "brian_tracey+10@gmail.com",
*   "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "goals": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "profilePicture": "https://cdn.pixabay.com/photo/2015/07/20/12/57/man-852766_960_720.jpg",
*   "coverPicture": "https://i.imgur.com/UYiroysl.jpg",
*   "isAdmin": true,
*   "isBanned": false,
*   "isDeleted": false,
*   "createdAt": "2017-11-06T13:20:16.985Z",
*   "updatedAt": "2017-11-06T13:20:16.985Z",
*   "coach": {
*     "id": 1,
*     "userId": 1,
*     "categoryId": 2,
*     "specialityId": 3,
*     "mission": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*     "hourlyRate": 50,
*     "rating": "4.20",
*     "status": "approved",
*     "createdAt": "2017-11-06T13:20:17.949Z",
*     "updatedAt": "2017-11-06T13:20:17.949Z",
*     "speciality": {
*       "id": 3,
*       "label": "Education",
*       "imageUrl": "https://i.imgur.com/2nCt3Sbl.jpg",
*       "createdAt": "2017-11-06T13:20:16.977Z",
*       "updatedAt": "2017-11-06T13:20:16.977Z"
*     },
*     "category": {
*       "id": 2,
*       "label": "Business Coaching",
*       "imageUrl": "https://i.imgur.com/2nCt3Sbl.jpg",
*       "createdAt": "2017-11-06T13:20:16.900Z",
*       "updatedAt": "2017-11-06T13:20:16.900Z"
*     }
*   }
* }
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _currentUserController2.default.currentUser.bind(_currentUserController2.default));

/**
* @api {POST} /api/users/current POST update current user
* @apiGroup users current
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request Current User Update. <br />
*                 This endpoint can be used only by authenticated user to edit his profile information.<br />
*                 <a href="#api-users_current-GetApiUsersCurrent">Response is same as here.</a>
*
* @apiParam (JSON) {String} [username] string[1-64], not null, only letters, numbers, _(underscore), .(dot) and -(dash) are allowed.
* @apiParam (JSON) {String} [name] string[1-64], not null, only letters, numbers, _(underscore), .(dot), (space) and -(dash) are allowed.
* @apiParam (JSON) {String} [emailAddress] string[1-64], email, not null
* @apiParam (JSON) {String} [title] string[1-64], not null
* @apiParam (JSON) {String} [about] [1-1024], not null
* @apiParam (JSON) {String} [goals] [1-1024], not null
* @apiParam (JSON) {String} [profilePicture] [0-512], default null, valid URL
* @apiParam (JSON) {String} [coverPicture] [0-512], default null, valid URL
*
* @apiParamExample {JSON} Request-Example:
* {
*   "username": "brian",
*   "name": "Brian Tracey Jr.",
*   "title": "Speaker",
*   "emailAddress": "brian_tracey+12@gmail.com",
* }
*
* @apiError {JSON} error-Object An object with the problematic properties and validation errors for them.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "email": "invalid_field"
* }
*
*/
router.post('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _usersController2.default.updateUser.bind(_usersController2.default));

/**
* @api {PUT} /api/users/current/change-password PUT change password
* @apiGroup users current
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request user password change. <br />
*                 This endpoint can be used by authenticated users.
*
* @apiParam (JSON) {String} oldPassword
* @apiParam (JSON) {String} newPassword
*
* @apiParamExample {JSON} Request-Example:
*  {
*    "oldPassword": "123-old",
*    "newPassword": "123-new"
*  }
*
* @apiSuccess {Boolean} success
* @apiSuccess {String} message
*
* @apiSuccessExample Success-Response: /api/users/current/change-password
*     HTTP/1.1 200 OK
* {
*   "success": true,
*   "message": "password_changed",
* }
*
* @apiError {JSON} error-Object An object with the problematic properties and validation errors for them.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "success": false,
*   "message": "missing_record"
* }
*
* @apiErrorExample Error-Response
*     HTTP/1.1 401 Unauthorized
* {
*   "success": false,
*   "message": "wrong_old_password"
* }
*/
router.put('/change-password', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _currentUserController2.default.changeCurrentUserPassword.bind(_currentUserController2.default));

/**
* @api {POST} /api/users/current/generate-twilio-token GET generate-twilion-token
* @apiGroup users current
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Generate Twilio tokens for a specific user.<br />
*                 This endpoint can be used only by administrators or an authenticated user<br />
*
* @apiParam (JSON) {String} [roomName] video room name
*
* @apiParamExample {JSON} Request-Example:
*  {
*    "roomName": "dark_room"
*  }
*
* @apiSuccessExample Success-Response: /api/users/current/generate-twilio-token
*     HTTP/1.1 200 OK
* {
*   "twilioChatToken": "{{ACTUAL_TOKEN}}",
*   "twilioVideoToken": "{{ACTUAL_TOKEN}}"
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 400 Bad Request
* {
*   "success": false,
*   "message": "bad_request"
* }
*/
router.post('/generate-twilio-token', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _currentUserController2.default.generateTwilioTokens.bind(_currentUserController2.default));

/**
* @api {PUT} /api/users/current/channels PUT update channel
* @apiGroup users current
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Create or update channel for current user. <br />
*                 This endpoint can be used by authenticated users.
*
* @apiParam (JSON) {String} name channel name
* @apiParam (JSON) {Date} lastVisit valid date of last visit on channel
*
* @apiParamExample {JSON} Request-Example: /api/users/current/channel
* {
*  "name": "channel",
*  "lastVisit": "2017-02-19 16:47:46.136"
* }
*
* @apiSuccess {Boolean} success
* @apiSuccess {String} message
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* {
*  "lastVisit": ""
* }
*/
router.put('/channels', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _currentUserController2.default.updateUserChannel.bind(_currentUserController2.default));

/**
* @api {GET} /api/users/current/channels GET get all channels
* @apiGroup users current
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Get all channel for current user. <br />
*                 This endpoint can be used by authenticated users.
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
* @apiParam (Query String) {Integer} id The id of the channel(you can use multiple ids eg: id=1&id=5);
* @apiParam (Query String) {Integer} name The name of the channel(you can use multiple names eg: name=asdsa&name=assad);
*
* @apiSuccess {Integer} pageNumber The number of the curent page (starts from 0).
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id]
* @apiSuccess {Integer} records[userId]
* @apiSuccess {String} records[name]
* @apiSuccess {Date} records[lastVisit]
* @apiSuccess {Date} records[updatedAt]
* @apiSuccess {Date} records[createdAt]
*
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 2,
*   "records": [
*     {
*       "id": 2,
*       "userId": 1,
*       "name": "pocpoc",
*       "lastVisit": "2017-10-19T13:47:46.136Z",
*       "createdAt": "2017-10-19T13:47:48.747Z",
*       "updatedAt": "2017-10-19T14:05:23.479Z"
*     },
*     {
*       "id": 3,
*       "userId": 1,
*       "name": "a",
*       "lastVisit": "2017-02-19T14:47:46.136Z",
*       "createdAt": "2017-10-19T14:05:40.411Z",
*       "updatedAt": "2017-10-19T14:06:05.830Z"
*     }
*   ]
* }
*/
router.get('/channels', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _currentUserController2.default.allChannels.bind(_currentUserController2.default));

/**
* @api {PUT} /api/users/current/delete PUT set user to deleted
* @apiGroup users current
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Set user deleted
*
* @apiSuccess {Boolean} success
* @apiSuccess {String} message
*
* @apiSuccessExample Success-Response: /api/users/current/delete
*     HTTP/1.1 200 OK
* {
*   "success": true,
*   "message": "user_deleted",
* }
*
*/
router.put('/delete', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _currentUserController2.default.setUserToDeleted.bind(_currentUserController2.default));

module.exports = router;