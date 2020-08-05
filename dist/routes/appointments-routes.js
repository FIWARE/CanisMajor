'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _appointmentsController = require('../controllers/appointments-controller');

var _appointmentsController2 = _interopRequireDefault(_appointmentsController);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _pagination = require('../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var auth = require('../auth')();

/**
* @api {POST} /api/appointments POST appointments
* @apiGroup appointments
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Create an appointment. <br />
*                 This endpoint can be used only by authenticated users.
*
* @apiParam {Integer} timezone Valid timezone name (eg: America/Denver)
* @apiParam {Integer} coachId
* @apiParam {Integer} userId
* @apiParam {Integer} dateTime Valid date-time with 0 minutes, 0 seconds ('YYYY-MM-DD HH:mm');
*
* @apiParamExample {JSON} Request-Example:
* {
*   "timezone": "America/Denver",
*   "coachId": 1,
*   "userId": 2,
*   "dateTime": "2017-11-04 12:00:00"
* }
*
* @apiSuccess {Integer} id
* @apiSuccess {Integer} coachId
* @apiSuccess {Integer} userId
* @apiSuccess {Date} dateTime
* @apiSuccess {String} status
* @apiSuccess {String} coachNotes
* @apiSuccess {String} userNotes
* @apiSuccess {String} feedback
* @apiSuccess {Integer} rating
* @apiSuccess {Integer} hourlyRate
* @apiSuccess {Date} coachWorkHours[updatedAt]
* @apiSuccess {Date} coachWorkHours[createdAt]
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* {
*   "coachNotes": null,
*   "userNotes": null,
*   "feedback": null,
*   "rating": null,
*   "id": 6,
*   "coachId": 1,
*   "userId": 2,
*   "dateTime": "2014-08-20T20:00:00.000Z",
*   "status": "pending",
*   "hourlyRate": 50,
*   "updatedAt": "2017-09-26T06:33:28.888Z",
*   "createdAt": "2017-09-26T06:33:28.888Z"
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "message": "wrong_time_format",
*   "success": false
* }
*
* @apiErrorExample Error-Response
*     HTTP/1.1 400 Bad Request
* {
*   "success": false,
*   "message": "bad_request"
* }
*/
router.post('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _appointmentsController2.default.createAppointment.bind(_appointmentsController2.default));

/**
* @api {PUT} /api/appointments/:id/cancel PUT cancel appointment
* @apiGroup appointments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request appointment cancel. <br />
*                 This endpoint can be used by admins or by authenticated coaches or users who create the appointment.<br />
*                 <a href="#api-appointments-PostApiAppointments">Response is same as here.</a>
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 404 Page Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.put('/:id([0-9]+)/cancel', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _appointmentsController2.default.cancelAppointment.bind(_appointmentsController2.default));

/**
* @api {PUT} /api/appointments/:id/accept PUT accept appointment
* @apiGroup appointments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request appointment accept. <br />
*                 This endpoint can be used by admins or by authenticated coaches from the appointment.<br />
*                 <a href="#api-appointments-PostApiAppointments">Response is same as here.</a>
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 404 Page Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.put('/:id([0-9]+)/accept', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _appointmentsController2.default.acceptAppointment.bind(_appointmentsController2.default));

/**
* @api {PUT} /api/appointments/:id/end PUT end appointment
* @apiGroup appointments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Request meeting end. <br />
*                 This endpoint can be used by admins or by users who create the appointment.<br />
*                 <a href="#api-appointments-PostApiAppointments">Response is same as here.</a>
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 404 Page Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.put('/:id([0-9]+)/end', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _appointmentsController2.default.endAppointment.bind(_appointmentsController2.default));

/**
* @api {PUT} /api/appointments/:id/notes PUT appointment notes
* @apiGroup appointments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Add appointment notes. <br />
*                 This endpoint can be used by admins or by authenticated coaches or users for their appointments.<br />
*                 <a href="#api-appointments-PostApiAppointments">Response is same as here.</a>
*
* @apiParam {String} notes Coach or user notes for an accepted appointment
*
* @apiParamExample {JSON} Request-Example:
* {
*   "notes": "Lorem ipsum..."
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 404 Page Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.put('/:id([0-9]+)/notes', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _appointmentsController2.default.addNotes.bind(_appointmentsController2.default));

/**
* @api {PUT} /api/appointments/:id/feedback PUT appointment feedback
* @apiGroup appointments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Add appointment notes. <br />
*                 This endpoint can be used by admins or by authenticated users for their on going/finished appointments.<br />
*                 <a href="#api-appointments-PostApiAppointments">Response is same as here.</a>
*
* @apiParam {String} [feedback]
* @apiParam {String} rating
*
* @apiParamExample {JSON} Request-Example:
* {
*   "feedback": "Lorem ipsum...",
*   "rating": 4
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 404 Page Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.put('/:id([0-9]+)/feedback', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _appointmentsController2.default.addFeedback.bind(_appointmentsController2.default));

/**
* @api {GET} /api/appointments GET appointments
* @apiGroup appointments
*
* @apiDescription Retrieves a list of all appointments.
*
* @apiParam (Query String) {Integer} status  If filter is needed, the needed appointments status.
* @apiParam (Query String) {Integer} userId  If filter is needed, the needed appointments userId.
* @apiParam (Query String) {Integer} coachId  If filter is needed, the needed appointments coachId.
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
*
* @apiSuccess {Integer} pageNumber The number of the curent page.
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id]
* @apiSuccess {Integer} records[coachId]
* @apiSuccess {Integer} records[userId]
* @apiSuccess {Date} records[dateTime]
* @apiSuccess {String} records[status]
* @apiSuccess {String} records[coachNotes]
* @apiSuccess {String} records[userNotes]
* @apiSuccess {String} records[feedback]
* @apiSuccess {Integer} records[rating]
* @apiSuccess {Date} records[updatedAt]
* @apiSuccess {Date} records[createdAt]
*
* @apiSuccessExample Success-Response: /api/appointments
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 2,
*   "records": [
*     {
*       "id": 1,
*       "coachId": 1,
*       "userId": 2,
*       "dateTime": "2014-08-20T08:00:00.000Z",
*       "status": "pending",
*       "coachNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "userNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "rating": 4,
*       "createdAt": "2017-10-02T09:43:39.565Z",
*       "updatedAt": "2017-10-02T09:43:39.565Z"
*     },
*     {
*       "id": 2,
*       "coachId": 1,
*       "userId": 2,
*       "dateTime": "2014-08-20T14:00:00.000Z",
*       "status": "pending",
*       "coachNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "userNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "rating": 4,
*       "createdAt": "2017-10-02T09:43:39.571Z",
*       "updatedAt": "2017-10-02T09:43:39.571Z"
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/appointments?status=pending
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 2,
*   "records": [
*     {
*       "id": 1,
*       "coachId": 1,
*       "userId": 2,
*       "dateTime": "2014-08-20T08:00:00.000Z",
*       "status": "pending",
*       "coachNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "userNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "rating": 4,
*       "createdAt": "2017-10-02T09:43:39.565Z",
*       "updatedAt": "2017-10-02T09:43:39.565Z"
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/appointments?perPage=1&page=2&sort=-status
*     HTTP/1.1 200 OK
*
* {
*   "pageNumber": 2,
*   "pageSize": 1,
*   "totalRecordCount": 6,
*   "records": [
*     {
*       "id": 3,
*       "coachId": 1,
*       "userId": 2,
*       "dateTime": "2014-08-20T12:00:00.000Z",
*       "status": "pending",
*       "coachNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "userNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "rating": 4,
*       "createdAt": "2017-10-02T09:43:39.576Z",
*       "updatedAt": "2017-10-02T09:43:39.576Z"
*     }
*   ]
* }
*
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _pagination2.default.middleware, _appointmentsController2.default.allEntries.bind(_appointmentsController2.default));

/**
* @api {GET} /api/appointments/:id GET appointment
* @apiGroup appointments
*
* @apiDescription Retrieves a specified appointment.
*
* @apiSuccess {Integer} id
* @apiSuccess {Integer} coachId
* @apiSuccess {Integer} userId
* @apiSuccess {Date} dateTime
* @apiSuccess {String} status
* @apiSuccess {String} coachNotes
* @apiSuccess {String} userNotes
* @apiSuccess {String} feedback
* @apiSuccess {Integer} rating
* @apiSuccess {Date} updatedAt
* @apiSuccess {Date} createdAt
*
* @apiSuccessExample Success-Response: /api/appointments/2
*     HTTP/1.1 200 OK
*
* {
*   "id": 2,
*   "coachId": 1,
*   "userId": 2,
*   "dateTime": "2014-08-20T14:00:00.000Z",
*   "status": "pending",
*   "coachNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "userNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*   "rating": 4,
*   "createdAt": "2017-10-02T09:43:39.571Z",
*   "updatedAt": "2017-10-02T09:43:39.571Z"
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
router.get('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _appointmentsController2.default.oneSpecifiedAppointment.bind(_appointmentsController2.default));

/**
* @api {PUT} /api/appointments/:id PUT appointment
* @apiGroup appointments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Edit appointments. <br />
*                 This endpoint can be used by admins<br />
*                 <a href="#api-appointments-GetApiAppointmentsId">Response is same as here.</a>
*
* @apiParam {String} rating
* @apiParam {String} status
* @apiParam {String} coachNotes
* @apiParam {String} userNotes
* @apiParam {String} feedback
* @apiParam {String} rating
*
* @apiParamExample {JSON} Request-Example:
* {
*   "dateTime": "2014-08-20T14:00:00.000Z",
*   "status": "accepted",
*   "coachNotes": "Lorem ipsum dolor sit amasdasdasdasdasd",
*   "userNotes": "Lorem ipsum dolor sit amasdasdasdasdasd",
*   "feedback": "Lorem ipsum dolor sit amasdasdasdasdasd",
*   "rating": 4
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 404 Page Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*
*/
router.put('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _authenticate2.default.attachAuthUserToRequest, _appointmentsController2.default.updateEntry.bind(_appointmentsController2.default));

module.exports = router;