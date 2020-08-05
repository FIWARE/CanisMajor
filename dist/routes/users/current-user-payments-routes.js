'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _currentUserPaymentsController = require('../../controllers/users/current-user-payments-controller');

var _currentUserPaymentsController2 = _interopRequireDefault(_currentUserPaymentsController);

var _pagination = require('../../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../../auth')();
var router = _express2.default.Router();

/**
* @api {POST} /api/users/current/payments/add-card POST add card
* @apiGroup current user payments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Add payment method to user, attach card. <br />
*                 This endpoint can be used only by authenticated users<br />
*
* @apiParam (JSON) {String} clientToken The freshly generated client token.
*
* @apiParamExample {JSON} Request-Example:
*  {
*    "clientToken": "{{ACTUAL_TOKEN}}"
*  }
*
* @apiSuccessExample Success-Response: /api/users/current/payments/add-card
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
*   "customerId": null,
*   "paymentMethodToken": null,
*   "isAdmin": true,
*   "isBanned": false,
*   "createdAt": "2017-10-17T12:59:40.479Z",
*   "updatedAt": "2017-10-17T12:59:40.479Z",
*   "coach": {
*       "id": 1,
*       "hourlyRate": 45
*   }
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 400 Bad Request
* {
*   "success": false,
*   "message": ""
* }
*
*/
router.post('/add-card', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _currentUserPaymentsController2.default.createBraintreeCustomer.bind(_currentUserPaymentsController2.default));

/**
* @api {DELETE} /api/users/current/payments/delete-card DELETE delete card
* @apiGroup current user payments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Delete card from current user. <br />
*                 This endpoint can be used only by authenticated users<br />
*
* @apiParam (JSON) {String} clientToken The freshly generated client token.
*
* @apiParamExample {JSON} Request-Example:
*  {
*    "clientToken": "{{ACTUAL_TOKEN}}"
*  }
*
* @apiSuccessExample Success-Response: /api/users/current/payments/delete-card
*     HTTP/1.1 200 OK
* {
*   "success": true,
*   "message": "deleted_successfully"
* }
*/
router.delete('/delete-card', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _currentUserPaymentsController2.default.deleteBraintreeCardEntry.bind(_currentUserPaymentsController2.default));

/**
* @api {GET} /api/users/current/payments/card-details GET card details
* @apiGroup current user payments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Get current user card details <br />
*                 This endpoint can be used only by authenticated users<br />
*
* @apiSuccessExample Success-Response: /api/users/current/payments/delete-card
*     HTTP/1.1 200 OK
* {
*  "cardType": "Visa",
*  "expirationDate": "12/2021",
*  "last4": "1111"
* }
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response: if no card is attached
*     HTTP/1.1 400 Bad Request
* {
*   "success": false,
*   "message": "bad_request"
* }
*/
router.get('/card-details', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _currentUserPaymentsController2.default.creditCardDetails.bind(_currentUserPaymentsController2.default));

/**
* @api {GET} /api/users/current/payments/ GET payments
* @apiGroup current user payments
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Get current user payment history <br />
*                 This endpoint can be used only by authenticated users<br />
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} paymentStatus The status of the payment.
*
* @apiSuccessExample Success-Response: /api/users/current/payments/
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 1,
*   "records": [
*     {
*       "id": 1,
*       "appointmentId": 3,
*       "paymentValue": "123.00",
*       "paymentStatus": "2017-09-20 11:00:00",
*       "transactionId": "k5w48z88",
*       "createdAt": "2017-11-14T10:06:56.596Z",
*       "updatedAt": "2017-11-14T10:06:56.596Z",
*       "appointment": {
*         "id": 3,
*         "coachId": 1,
*         "userId": 2,
*         "dateTime": "2014-08-20T12:00:00.000Z",
*         "status": "pending",
*         "coachNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*         "userNotes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*         "feedback": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*         "rating": 4,
*         "hourlyRate": 50,
*         "createdAt": "2017-11-14T10:06:56.386Z",
*         "updatedAt": "2017-11-14T10:06:56.386Z",
*         "coach": {
*           "id": 1,
*           "userId": 1,
*           "categoryId": 2,
*           "specialityId": 3,
*           "mission": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*           "hourlyRate": 50,
*           "rating": "4.20",
*           "status": "approved",
*           "createdAt": "2017-11-14T10:06:56.340Z",
*           "updatedAt": "2017-11-14T10:06:56.340Z",
*           "user": {
*             "id": 1,
*             "name": "Brian Tracey",
*             "profilePicture": "https://cdn.pixabay.com/photo/2015/07/20/12/57/man-852766_960_720.jpg",
*             "coverPicture": "https://i.imgur.com/UYiroysl.jpg",
*             "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
*           }
*         }
*       }
*     }
*   ]
* }
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _currentUserPaymentsController2.default.allPayments.bind(_currentUserPaymentsController2.default));

module.exports = router;