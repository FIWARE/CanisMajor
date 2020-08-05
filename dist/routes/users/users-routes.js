'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _usersController = require('../../controllers/users/users-controller');

var _usersController2 = _interopRequireDefault(_usersController);

var _authenticate = require('../../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _pagination = require('../../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/users GET users
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiGroup users
*
* @apiDescription Retrieves a list of all users. <br />
*                 This endpoint can be used only by administrators.
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
* @apiParam (Query String) {Integer} id The id of the user(you can use multiple ids eg: id=1&id=5);
*
* @apiSuccess {Integer} pageNumber The number of the curent page (starts from 0).
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id]
* @apiSuccess {String} records[name]
* @apiSuccess {String} records[username]
* @apiSuccess {String} records[title]
* @apiSuccess {String} records[emailAddress]
* @apiSuccess {String} records[about]
* @apiSuccess {String} records[goals]
* @apiSuccess {Boolean} records[isAdmin] true for admin
* @apiSuccess {Boolean} records[isBanned]
* @apiSuccess {Boolean} records[isDeleted]
* @apiSuccess {String} records[coverPicture]
* @apiSuccess {String} records[profilePicture]
* @apiSuccess {Date} records[updatedAt]
* @apiSuccess {Date} records[createdAt]
*
* @apiSuccessExample Success-Response: /api/users
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 2,
*   "records": [
*     {
*       "id": 1,
*       "username": "briannn",
*       "name": "Brian Tracey",
*       "title": "qwerty",
*       "emailAddress": "brian_tracey+10@gmail.com",
*       "about": "Smile, it's free.",
*       "goals": "Make money, more money...",
*       "profilePicture": null,
*       "coverPicture": null,
*       "isAdmin": true,
*       "isBanned": false,
*       "isDeleted": false,
*       "createdAt": "2017-09-14T14:22:46.203Z",
*       "updatedAt": "2017-09-14T14:22:46.203Z"
*     },
*     {
*       "id": 2,
*       "username": "popello",
*       "name": "Pop Alexaandru",
*       "title": "Lord",
*       "emailAddress": "paopica_alex+10@gmail.com",
*       "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "goals": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "profilePicture": "http://media2.intoday.in/indiatoday/images/stories/the-lord-of-the-rings-story_647_042916112735.jpg",
*       "coverPicture": "http://www.thehappymovie.com/images/get-involved-billboard.png",
*       "isAdmin": false,
*       "isBanned": false,
*       "isDeleted": false,
*       "createdAt": "2017-09-14T14:26:56.376Z",
*       "updatedAt": "2017-09-14T14:26:56.376Z"
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/users/1?perPage=1&page=1
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 1,
*   "pageSize": 1,
*   "totalRecordCount": 2,
*   "records": [
*     {
*       "id": 2,
*       "username": "popello",
*       "name": "Pop Alexaandru",
*       "title": "Lord",
*       "emailAddress": "paopica_alex+10@gmail.com",
*       "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "goals": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "profilePicture": "http://media2.intoday.in/indiatoday/images/stories/the-lord-of-the-rings-story_647_042916112735.jpg",
*       "coverPicture": "http://www.thehappymovie.com/images/get-involved-billboard.png",
*       "isAdmin": false,
*       "isBanned": false,
*       "isDeleted": false,
*       "createdAt": "2017-09-14T14:26:56.376Z",
*       "updatedAt": "2017-09-14T14:26:56.376Z"
*     }
*   ]
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 403 Forbidden
* {
*  "success": false,
*  "message": "access_forbidden"
* }
*
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _pagination2.default.middleware, _usersController2.default.allEntries.bind(_usersController2.default));

/**
* @api {GET} /api/users/:id GET user
* @apiGroup users
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Retrieves a specific user. <br />
*                 This endpoint can be used only by administrators or an authenticated user to get full informations. <br />
*                 Regular users get only public informations (name, profile and cover pictures)<br />
*                 <a href="#api-users_current-GetApiUsersCurrent">Response is similar as here, only diffrence is that coach is attached too.</a>
*
* @apiParam (URL params) {Integer} id The selected user id.
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
router.get('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _usersController2.default.oneSpecifiedUser.bind(_usersController2.default));

/**
* @api {GET} /api/users/:id/notifications GET notifications
* @apiGroup users
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Retrieves a specific user's notifications. <br />
*                 This endpoint can be used only by administrators or authenticated user to get all notifications. <br />
*
* @apiParam (URL params) {Integer} id The selected user id.
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} objectType The objectType of the notification.
* @apiParam (Query String) {String} notificationType The notificationType of the notification.
* @apiParam (Query String) {Boolean} seen The seen status of the notification.
*
* @apiSuccess {Integer} pageNumber The number of the curent page (starts from 0).
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id]
* @apiSuccess {Integer} records[userId]
* @apiSuccess {String} records[objectType]
* @apiSuccess {Integer} records[objectId]
* @apiSuccess {String} records[notificationType]
* @apiSuccess {Boolean} records[seen]
* @apiSuccess {Date} records[updatedAt]
* @apiSuccess {Date} records[createdAt]
*
* @apiSuccessExample Success-Response: /api/users/1/notifications
*     HTTP/1.1 200 OK
*
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 3,
*   "records": [
*     {
*       "id": 5,
*       "userId": 1,
*       "objectType": "appointment",
*       "objectId": 4,
*       "notificationType": "cancelled",
*       "seen": true,
*       "createdAt": "2017-10-18T09:32:44.299Z",
*       "updatedAt": "2017-10-18T09:32:44.299Z"
*     },
*     {
*       "id": 3,
*       "userId": 1,
*       "objectType": "coach",
*       "objectId": 1,
*       "notificationType": "accepted",
*       "seen": true,
*       "createdAt": "2017-10-18T09:32:44.287Z",
*       "updatedAt": "2017-10-18T09:33:04.905Z"
*     },
*     {
*       "id": 1,
*       "userId": 1,
*       "objectType": "appointment",
*       "objectId": 1,
*       "notificationType": "accepted",
*       "seen": true,
*       "createdAt": "2017-10-18T09:32:44.275Z",
*       "updatedAt": "2017-10-18T09:32:44.275Z"
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/users/1/notifications?notificationType=coach_request_accepted
*     HTTP/1.1 200 OK
*
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 1,
*   "records": [
*     {
*       "id": 3,
*       "userId": 1,
*       "objectType": "coach",
*       "objectId": 1,
*       "notificationType": "coach_request_accepted",
*       "seen": false,
*       "createdAt": "2017-10-18T09:43:14.909Z",
*       "updatedAt": "2017-10-18T09:43:14.909Z"
*     }
*   ]
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 403 Forbidden
* {
*  "success": false,
*  "message": "access_forbidden"
* }
*
*/
router.get('/:id([0-9]+)/notifications', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelf, _pagination2.default.middleware, _usersController2.default.allNotifications.bind(_usersController2.default));

/**
* @api {PUT} /api/users/:id PUT update user
* @apiGroup users
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
* @apiParam (JSON) {Boolean} [isAdmin] true for admin
* @apiParam (JSON) {Boolean} [isBanned] false by default
* @apiParam (JSON) {String} [profilePicture] [0-512], default null, valid URL
* @apiParam (JSON) {String} [coverPicture] [0-512], default null, valid URL
*
* @apiParamExample {JSON} Request-Example:
* {
*   "username": "brian",
*   "name": "Brian Tracey Jr.",
*   "title": "Speaker",
*   "isAdmin": true,
*   "isBanned": false,
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
* @apiErrorExample Error-Response
*     HTTP/1.1 403 Forbidden
* {
*   "success": false,
*   "message": "access_forbidden"
* }
*
*/
router.put('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _usersController2.default.updateUser.bind(_usersController2.default));

/**
* @api {POST} /api/users/:id/coach POST create coach
* @apiGroup users
*
* @apiDescription Request User Registration.
*
* @apiParam (JSON) {Integer} [specialityId]
* @apiParam (JSON) {Integer} [categoryId]
* @apiParam (JSON) {String} mission string[1-1024]
* @apiParam (JSON) {Integer} hourlyRate integer[1-200]
*
* @apiParamExample {JSON} Request-Example:
* {
*   "specialityId": 3,
*   "categoryId": 4,
*   "mission": "Lorem ipsum dolor sit amasdasdet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "hourlyRate": 150,
*   "timeZone": "Europe/Bucharest"
* }
*
* @apiSuccess {Object} user The details of the user who requested to became a coach.
* @apiSuccess {Integer} coach[id]
* @apiSuccess {Integer} coach[userId]
* @apiSuccess {Integer} coach[categoryId]
* @apiSuccess {Integer} coach[specialityId]
* @apiSuccess {String} coach[mission]
* @apiSuccess {Integer} coach[hourlyRate]
* @apiSuccess {Date} coach[updatedAt]
* @apiSuccess {Date} coach[createdAt]
* @apiSuccess {Object} coachWorkHours
* @apiSuccess {String} coachWorkHours[id]
* @apiSuccess {String} coachWorkHours[coachId]
* @apiSuccess {String} coachWorkHours[morningSessionStart]
* @apiSuccess {String} coachWorkHours[morningSessionEnd]
* @apiSuccess {Boolean} coachWorkHours[afternoonSessionStart]
* @apiSuccess {String} coachWorkHours[afternoonSessionEnd]
* @apiSuccess {String} coachWorkHours[acceptOutsideWorkingHours]
* @apiSuccess {String} coachWorkHours[timeZone]
* @apiSuccess {Date} coachWorkHours[updatedAt]
* @apiSuccess {Date} coachWorkHours[createdAt]
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* {
*   "id": 4,
*   "username": "Esther",
*   "name": "Esther Hicksis",
*   "title": "Duchess",
*   "emailAddress": "esther+10@gmail.com",
*   "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "goals": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "profilePicture": "https://imgur.com/a/ZuPRv",
*   "coverPicture": "http://www.thehappymovie.com/images/get-involved-billboard.png",
*   "isAdmin": false,
*   "isBanned": false,
*   "isDeleted": false,
*   "createdAt": "2017-10-10T12:07:02.453Z",
*   "updatedAt": "2017-10-10T12:07:02.453Z",
*   "coach": {
*     "rating": null,
*     "status": "pending",
*     "id": 5,
*     "userId": 4,
*     "categoryId": null,
*     "specialityId": null,
*     "mission": "tralala",
*     "hourlyRate": 50,
*     "updatedAt": "2017-10-10T16:16:21.470Z",
*     "createdAt": "2017-10-10T16:16:21.470Z",
*     "coachWorkHours": {
*       "morningSessionStart": 9,
*       "morningSessionEnd": 12,
*       "afternoonSessionStart": 14,
*       "afternoonSessionEnd": 18,
*       "acceptOutsideWorkingHours": true,
*       "timeZone": "Europe/Bucharest",
*       "id": 5,
*       "coachId": 5,
*       "updatedAt": "2017-10-10T16:16:21.483Z",
*       "createdAt": "2017-10-10T16:16:21.483Z"
*     }
*   }
* }
*
* @apiError {JSON} error-Object An object with the problematic properties and validation errors for them.
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "message": "user_is_coach",
*   "success": false
* }
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "hourlyRate": ""
* }
*/
router.post('/:id([0-9]+)/coach', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelf, _usersController2.default.createCoach.bind(_usersController2.default));

module.exports = router;