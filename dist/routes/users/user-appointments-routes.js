'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _pagination = require('../../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

var _userAppointmentsController = require('../../controllers/users/user-appointments-controller');

var _userAppointmentsController2 = _interopRequireDefault(_userAppointmentsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/users/:id/appointments GET user appointments
* @apiGroup user appointments
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Retrieves the current user appointments. <br />
*                 This endpoint can be used only by authenticated user for self and by admins.
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
* @apiParam (Query String) {String} status The status of the appointment(pending, cancelled, accepted)
* @apiParam (Query String) {String} state The state of the accepted appointments(upcoming(running appointments or appointments from the future) and finished(appointments from the past))
*
* @apiSuccess {Integer} pageNumber The number of the curent page (starts from 0).
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
* @apiSuccess {Date} updatedAt
* @apiSuccess {Date} createdAt
*
* @apiSuccessExample Success-Response
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 1,
*   "records": [
*     {
*       "id": 2,
*       "coachId": 2,
*       "userId": 1,
*       "dateTime": "2014-08-20T12:30:00.000Z",
*       "status": "pending",
*       "coachNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "userNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "rating": 3,
*       "createdAt": "2017-09-21T11:17:14.720Z",
*       "updatedAt": "2017-09-21T11:17:14.720Z"
*     }
*   ]
* }
*
*/
router.get('/:id([0-9]+)/appointments', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdminOrSelf, _pagination2.default.middleware, _userAppointmentsController2.default.allUserAppointments.bind(_userAppointmentsController2.default));

module.exports = router;