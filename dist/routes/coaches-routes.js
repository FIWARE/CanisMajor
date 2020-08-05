'use strict';

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _coachesController = require('../controllers/coaches-controller');

var _coachesController2 = _interopRequireDefault(_coachesController);

var _pagination = require('../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/coaches GET coaches
* @apiGroup coaches
*
* @apiDescription Retrieves a list of all coaches.
*
* @apiParam (Query String) {Integer} label  If filter is needed, the needed categories label.
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {Integer} CategoryId Query string parameter for the category Id.
* @apiParam (Query String) {Integer} SpecialityId Query string parameter for the speciality Id.
* @apiParam (Query String) {Integer} id The id of the coach(you can use multiple ids eg: id=1&id=5);
* @apiParam (Query String) {String} search Search After the inputed string.
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
*
* @apiSuccess {Integer} pageNumber The number of the curent page.
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id]
* @apiSuccess {Integer} records[userId]
* @apiSuccess {Integer} records[categoryId]
* @apiSuccess {Integer} records[specialityId]
* @apiSuccess {String} records[mission]
* @apiSuccess {Integer} records[hourlyRate]
* @apiSuccess {Decimal} records[rating]
* @apiSuccess {Array[]} records[user]
* @apiSuccess {Array[]} records[speciality]
* @apiSuccess {Array[]} records[category]
* @apiSuccess {String} records[status] allowed values: 'pending', 'approved'
* @apiSuccess {Date} records[updatedAt]
* @apiSuccess {Date} records[createdAt]
*
* @apiSuccessExample Success-Response: /api/coaches
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 2,
*   "records": [
*     {
*       "id": 1,
*       "userId": 1,
*       "categoryId": 2,
*       "specialityId": 3,
*       "mission": "aaaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "hourlyRate": 50,
*       "rating": "4.20",
*       "status": "approved",
*       "createdAt": "2017-09-15T12:33:12.197Z",
*       "updatedAt": "2017-09-15T12:33:12.197Z",
*       "user": {
*         "id": 1,
*         "username": "briannn",
*         "name": "Brian Tracey",
*         "title": "qwerty",
*         "emailAddress": "brian_tracey+10@gmail.com",
*         "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*         "goals": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*         "profilePicture": "http://media2.intoday.in/indiatoday/images/stories/the-lord-of-the-rings-story_647_042916112735.jpg",
*         "coverPicture": "http://www.thehappymovie.com/images/get-involved-billboard.png",
*         "isAdmin": true,
*         "createdAt": "2017-09-15T12:33:12.008Z",
*         "updatedAt": "2017-09-15T12:33:12.008Z"
*       },
*       "speciality": {
*         "id": 3,
*         "label": "Education",
*         "imageUrl": null,
*         "createdAt": "2017-09-15T12:33:12.002Z",
*         "updatedAt": "2017-09-15T12:33:12.002Z"
*       },
*       "category": {
*         "id": 2,
*         "label": "Business Coaching",
*         "createdAt": "2017-09-15T12:33:11.945Z",
*         "updatedAt": "2017-09-15T12:33:11.945Z"
*       }
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/coaches?search=ipsum&perPage=1&page=0&categoryId=2
*     HTTP/1.1 200 OK
*
*
* @apiSuccessExample Success-Response: /api/coaches?search=ipsum&perPage=2&page=0&sort=-rating
*     HTTP/1.1 200 OK
*
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _coachesController2.default.allEntries.bind(_coachesController2.default));

/**
* @api {GET} /api/coaches/:id GET coach
* @apiGroup coaches
*
* @apiDescription Retrieves a specific coach. <br />
*                 This endpoint need authentication.
*
* @apiParam (URL params) {Integer} id The selected coach id.
*
* @apiSuccess {Integer} id
* @apiSuccess {Integer} userId
* @apiSuccess {Integer} categoryId
* @apiSuccess {Integer} specialityId
* @apiSuccess {String} mission
* @apiSuccess {Integer} hourlyRate
* @apiSuccess {Decimal} rating
* @apiSuccess {String} status
* @apiSuccess {Object} user
* @apiSuccess {Object} speciality
* @apiSuccess {Object} category
*
* @apiSuccessExample Success-Response: /api/coaches/1
*     HTTP/1.1 200 OK
*
* {
*   "id": 1,
*   "userId": 1,
*   "categoryId": 2,
*   "specialityId": 3,
*   "mission": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "hourlyRate": 50,
*   "rating": "4.20",
*   "status": "approved",
*   "createdAt": "2017-11-02T12:51:00.876Z",
*   "updatedAt": "2017-11-02T12:51:00.876Z",
*   "user": {
*     "id": 1,
*     "username": "briannn",
*     "name": "Brian Tracey",
*     "title": "Knight",
*     "emailAddress": "brian_tracey+10@gmail.com",
*     "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*     "goals": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*     "profilePicture": "https://cdn.pixabay.com/photo/2015/07/20/12/57/man-852766_960_720.jpg",
*     "coverPicture": "https://i.imgur.com/UYiroysl.jpg",
*     "isAdmin": true,
*     "isBanned": false,
*     "isDeleted": false,
*     "createdAt": "2017-11-02T12:50:59.941Z",
*     "updatedAt": "2017-11-02T12:50:59.941Z"
*   },
*   "speciality": {
*     "id": 3,
*     "label": "Education",
*     "imageUrl": "https://i.imgur.com/2nCt3Sbl.jpg",
*     "createdAt": "2017-11-02T12:50:59.934Z",
*     "updatedAt": "2017-11-02T12:50:59.934Z"
*   },
*   "category": {
*     "id": 2,
*     "label": "Business Coaching",
*     "createdAt": "2017-11-02T12:50:59.868Z",
*     "updatedAt": "2017-11-02T12:50:59.868Z"
*   }
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response: /api/coaches/111
*     HTTP/1.1 404 Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.get('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _coachesController2.default.oneSpecifiedEntry.bind(_coachesController2.default));

/**
* @api {PUT} /api/coaches/:id PUT update coach
* @apiGroup coaches
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request Current Coach Update. <br />
*                 This endpoint can be used only by authenticated coach or admin to edit his profile information.<br />
*                 <a href="#api-coaches-GetApiCoachesId">Response is same as here.</a>
*
* @apiParam (JSON) {Integer} [categoryId]
* @apiParam (JSON) {Integer} [specialityId]
* @apiParam (JSON) {String} [mission] string[1-1024]
* @apiParam (JSON) {Integer} [hourlyRate] integer[1-9999]
*
* @apiParamExample {JSON} Request-Example:
* {
*   "categoryId": "1",
*   "specialityId": "2",
*   "mission": "Lorem ipsum...",
*   "hourlyRate": 20,
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
router.put('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelfCoach, _coachesController2.default.updateCoach.bind(_coachesController2.default));

/**
* @api {GET} /api/coaches/id/feedback GET feedbacks
* @apiGroup coaches
*
* @apiDescription Retrieves a list of all feedbacks for a coach.
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
*
* @apiSuccess {Integer} pageNumber The number of the curent page.
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[feedback]
* @apiSuccess {Integer} records[rating]
*
* @apiSuccessExample Success-Response: /api/coaches/id/feedback
*     HTTP/1.1 200 OK
*
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 1,
*   "records": [
*     {
*       "rating": 3,
*       "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/coaches/id/feedback?perPage=1&page=1
*     HTTP/1.1 200 OK
*
* @apiSuccessExample Success-Response: /api/coaches/id/feedback?perPage=1&page=1?sort=-rating
*     HTTP/1.1 200 OK
*
*/
router.get('/:id([0-9]+)/feedback', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _coachesController2.default.allFeedbacks.bind(_coachesController2.default));

/**
* @api {GET} /api/coaches/:id/settings GET coach work hours
* @apiGroup coaches settings
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Retrieves a specific coach settings. <br />
*                 This endpoint can be used only by authenticated users.
*
* @apiParam (URL params) {Integer} id The selected user id.
*
* @apiSuccess {Integer} id
* @apiSuccess {Integer} coachId
* @apiSuccess {Integer} morningSessionStart
* @apiSuccess {Integer} morningSessionEnd
* @apiSuccess {Integer} afternoonSessionStart
* @apiSuccess {Integer} afternoonSessionEnd
* @apiSuccess {Boolean} acceptOutsideWorkingHours
* @apiSuccess {Date} updatedAt Date and time of last update.
* @apiSuccess {Date} createdAt Date and time of creation.
*
* @apiSuccessExample Success-Response: /api/coaches/2/settings
*     HTTP/1.1 200 OK
*
* {
*   "id": 2,
*   "coachId": 2,
*   "morningSessionStart": 8,
*   "morningSessionEnd": 12,
*   "afternoonSessionStart": 18,
*   "afternoonSessionEnd": 20,
*   "acceptOutsideWorkingHours": false,
*   "createdAt": "2017-09-19T15:54:22.031Z",
*   "updatedAt": "2017-09-19T15:54:22.031Z"
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
router.get('/:id([0-9]+)/settings', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelfCoach, _coachesController2.default.getCoachSettings.bind(_coachesController2.default));

/**
* @api {PUT} /api/coaches/:id/settings PUT update coach-work-hours
* @apiGroup coaches settings
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request Current User Update. <br />
*                 This endpoint can be used only admins or by authenticated coaches to edit settings.<br />
*                 <a href="#api-coaches_settings-GetApiCoachesIdSettings">Response is same as here.</a>
*
* @apiParam {Integer} morningSessionStart
* @apiParam {Integer} morningSessionEnd
* @apiParam {Integer} afternoonSessionStart
* @apiParam {Integer} afternoonSessionEnd
* @apiParam {Integer} acceptOutsideWorkingHours
*
* @apiParamExample {JSON} Request-Example:
* {
*   "id": 2,
*   "coachId": 2,
*   "morningSessionStart": 11,
*   "morningSessionEnd": 11,
*   "afternoonSessionStart": 22,
*   "afternoonSessionEnd": 1,
*   "acceptOutsideWorkingHours": false,
*   "createdAt": "2017-09-19T15:54:22.031Z",
*   "updatedAt": "2017-09-19T16:23:34.690Z"
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
*     HTTP/1.1 404 Page Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.put('/:id([0-9]+)/settings', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelfCoach, _coachesController2.default.updateCoachSettings.bind(_coachesController2.default));

/**
* @api {GET} /api/coaches/:id/appointments GET coach appointments
* @apiGroup coach appointments
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Retrieves the current coach appointments. <br />
*                 This endpoint can be used only by authenticated coach for self and by admins.<br />
*                 <a href="#api-user_appointments-GetApiUsersIdAppointments">Response is same as here.</a>
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
*
*/
router.get('/:id([0-9]+)/appointments', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelfCoach, _pagination2.default.middleware, _coachesController2.default.allCoachAppointments.bind(_coachesController2.default));

/**
* @api {GET} /api/coaches/:id/availability GET coach availability
* @apiGroup coach appointments
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Retrieves the selected coach availability. <br />
*                 This endpoint can be used only by authenticated users and by admins.
*
* @apiParam (Query String) {Integer} date The date for the availability request (eg: 2014-09-23)
* @apiParam (Query String) {String} timezone The name of the timezone(eg: America/Denver).
*

* @apiSuccess {Hour} startingHour
* @apiSuccess {Hour} endingHour
* @apiSuccess {Boolean} available
* @apiSuccess {Boolean} outsideWorkHour
*
* @apiSuccessExample Success-Response: /api/coaches/1/availability?date=2014-08-20&timezone=America/Denver
*     HTTP/1.1 200 OK
* [
*   {
*     "startingHour": "00:00",
*     "endingHour": "01:00",
*     "available": false,
*     "outsideWorkHour": true
*   },
*   {
*     "startingHour": "01:00",
*     "endingHour": "02:00",
*     "available": false,
*     "outsideWorkHour": true
*   },
*
*             .
*             .
*             .
*
*   {
*     "startingHour": "22:00",
*     "endingHour": "23:00",
*     "available": false,
*     "outsideWorkHour": true
*   },
*   {
*     "startingHour": "23:00",
*     "endingHour": "00:00",
*     "available": false,
*     "outsideWorkHour": true
*   }
* ]
*
* @apiErrorExample Error-Response
*     HTTP/1.1 404 Page Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
* @apiErrorExample Error-Response
*     HTTP/1.1 400 Bad Request
* {
*   "success": false,
*   "message": "query_param_missing"
* }
*
* @apiErrorExample Error-Response
*     HTTP/1.1 400 Bad Request
* {
*   "success": false,
*   "message": "invalid_date_format"
* }
*/
router.get('/:id([0-9]+)/availability', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _coachesController2.default.coachAvailability.bind(_coachesController2.default));

module.exports = router;