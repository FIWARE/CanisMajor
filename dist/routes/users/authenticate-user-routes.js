'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticateUserController = require('../../controllers/users/authenticate-user-controller');

var _authenticateUserController2 = _interopRequireDefault(_authenticateUserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @api {POST} /api/users POST register user
* @apiGroup users
*
* @apiDescription Request User Registration.
*
* @apiParam (JSON) {String} username string[1-64], not null, only letters, numbers, _(underscore), .(dot) and -(dash) are allowed.
* @apiParam (JSON) {String} name string[1-64], not null, only letters, numbers, _(underscore), .(dot), (space) and -(dash) are allowed.
* @apiParam (JSON) {String} emailAddress string[1-64], email, not null
* @apiParam (JSON) {String} [password] [6-64], optional with social media login.
* @apiParam (JSON) {String} title string[1-64], not null
* @apiParam (JSON) {String} about [1-1024], not null
* @apiParam (JSON) {String} goals [1-1024], not null
* @apiParam (JSON) {String} [instagramAccessToken] [1-255], not null
* @apiParam (JSON) {String} [facebookAccessToken] [1-255], not null
* @apiParam (JSON) {String} [linkedinAccessToken] [1-255], not null
* @apiParam (JSON) {String} [firebaseToken] [1-255], not null
* @apiParam (JSON) {String} [profilePicture] [0-512], default null, valid URL
* @apiParam (JSON) {String} [coverPicture] [0-512], default null, valid URL
*
* @apiParamExample {JSON} Request-Example:
* {
* 	"username":"briannn",
* 	"name":"Brian Tracey",
* 	"title":"qwerty",
* 	"emailAddress":"brian_tracey+10@gmail.com",
* 	"password": "tralala",
* 	"about": "Smile, it's free.",
* 	"goals": "Make money, more money..."
* }
*
* @apiParamExample {JSON} Request-Example:
* {
* 	"username":"briannn",
* 	"name":"Brian Tracey",
* 	"title":"qwerty",
* 	"emailAddress":"brian_tracey+10@gmail.com",
* 	"about": "Smile, it's free.",
* 	"goals": "Make money, more money..."
* 	"facebookAccessToken": "ACTUAL_TOKEN",
* }
*
* @apiSuccess {String} success
* @apiSuccess {String} token
* @apiSuccess {Object} user
* @apiSuccess {Integer} user[id]
* @apiSuccess {String} user[name]
* @apiSuccess {String} user[username]
* @apiSuccess {String} user[title]
* @apiSuccess {String} user[emailAddress]
* @apiSuccess {String} user[about]
* @apiSuccess {String} user[goals]
* @apiSuccess {Boolean} user[isAdmin]
* @apiSuccess {String} user[coverPicture]
* @apiSuccess {String} user[profilePicture]
* @apiSuccess {Date} user[updatedAt]
* @apiSuccess {Date} user[createdAt]
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* {
*   "success": true,
*   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwaXJlRGF0ZSI6MTUwNzk3MjI3ODEzOH0.XpBQhCcOLPz1frbR9-If_gQevfcxQYIrcHpdy6-_FQE",
*   "user": {
*     "profilePicture": null,
*     "coverPicture": null,
*     "isAdmin": false,
*     "isBanned": false,
*     "isDeleted": false,
*     "id": 1,
*     "name": "Brian Tracey",
*     "username": "briannn",
*     "title": "qwerty",
*     "emailAddress": "brian_tracey+10@gmail.com",
*     "about": "Smile, it's free.",
*     "goals": "Make money, more money...",
*     "updatedAt": "2017-09-14T09:11:17.983Z",
*     "createdAt": "2017-09-14T09:11:17.983Z"
*   }
* }
*
* @apiError {JSON} error-Object An object with the problematic properties and validation errors for them.
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "username": "value_already_used"
* }
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
* {
*   "username": "value_outside_range",
*   "email": "invalid_field"
* }
*/
router.post('/', _authenticateUserController2.default.registerUser.bind(_authenticateUserController2.default));

/**
* @api {POST} /api/users/login POST password
* @apiGroup users authenticate
*
* @apiDescription Request User Authentication.
*
* @apiParam (JSON) {String} username Username of the user who wants to authenticate.
* @apiParam (JSON) {String} password Password of the user who wants to authenticate.
*
* @apiParamExample {JSON} Request-Example:
* {
*  "username": "briannn",
*  "password": "tralala"
* }
*
* @apiSuccess {String} success
* @apiSuccess {String} token
* @apiSuccess {String} twilioChatToken
* @apiSuccess {String} twilioVideoToken
* @apiSuccess {Object} user
* @apiSuccess {Integer} user[id]
* @apiSuccess {String} user[name]
* @apiSuccess {String} user[username]
* @apiSuccess {String} user[title]
* @apiSuccess {String} user[emailAddress]
* @apiSuccess {String} user[about]
* @apiSuccess {String} user[goals]
* @apiSuccess {Boolean} user[isAdmin] true for admin
* @apiSuccess {Boolean} user[isBanned] false by default
* @apiSuccess {Boolean} user[isDeleted] false by default
* @apiSuccess {String} user[coverPicture]
* @apiSuccess {String} user[profilePicture]
* @apiSuccess {Object} user[coach]
* @apiSuccess {Object} user[coach][category]
* @apiSuccess {Object} user[coach][speciality]
* @apiSuccess {Date} user[updatedAt]
* @apiSuccess {Date} user[createdAt]
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* {
*   "success": true,
*   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwaXJlRGF0ZSI6MTUxMjU2NzUwMjExNX0._B8HnFqIbco_jlG3uEKXA_NdVuo_UbVRppPWIX1V9Gk",
*   "twilioChatToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzFiZDUwOTIxYjA0YjMzYzgyM2ZjMTBkNmY4ZWQ5MDViLTE1MDk5NzU1MDIiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJicmlhbl90cmFjZXkrMTBAZ21haWwuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTZDQ2YWQzOWE1YTFhNDIzNTkwMzBmMDkwMDVjMzBlODciLCJlbmRwb2ludF9pZCI6IkNvYWNoaW5nQXBwOmJyaWFuX3RyYWNleSsxMEBnbWFpbC5jb20ifX0sImlhdCI6MTUwOTk3NTUwMiwiZXhwIjoxNTA5OTc5MTAyLCJpc3MiOiJTSzFiZDUwOTIxYjA0YjMzYzgyM2ZjMTBkNmY4ZWQ5MDViIiwic3ViIjoiQUNjMmMwYzljMjhiYjAyMTc1MTA2ODliYzFjNDBmNjUzNyJ9.5AbKhPsF5lCM1D_UUXm_bZ3c6ZodcHlY4wld52Bf24M",
*   "twilioVideoToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzFiZDUwOTIxYjA0YjMzYzgyM2ZjMTBkNmY4ZWQ5MDViLTE1MDk5NzU1MDIiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyIiwidmlkZW8iOnt9fSwiaWF0IjoxNTA5OTc1NTAyLCJleHAiOjE1MDk5NzkxMDIsImlzcyI6IlNLMWJkNTA5MjFiMDRiMzNjODIzZmMxMGQ2ZjhlZDkwNWIiLCJzdWIiOiJBQ2MyYzBjOWMyOGJiMDIxNzUxMDY4OWJjMWM0MGY2NTM3In0.rRLS2UkYC_zNzZIl-ufBMkBVEB_xL5VP7Hxo8uhk3GE",
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
*     "createdAt": "2017-11-06T13:20:16.985Z",
*     "updatedAt": "2017-11-06T13:20:16.985Z",
*     "coach": {
*       "id": 1,
*       "userId": 1,
*       "categoryId": 2,
*       "specialityId": 3,
*       "mission": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
*       "hourlyRate": 50,
*       "rating": "4.20",
*       "status": "approved",
*       "createdAt": "2017-11-06T13:20:17.949Z",
*       "updatedAt": "2017-11-06T13:20:17.949Z",
*       "speciality": {
*         "id": 3,
*         "label": "Education",
*         "imageUrl": "https://i.imgur.com/2nCt3Sbl.jpg",
*         "createdAt": "2017-11-06T13:20:16.977Z",
*         "updatedAt": "2017-11-06T13:20:16.977Z"
*       },
*       "category": {
*         "id": 2,
*         "label": "Business Coaching",
*       "imageUrl": "https://i.imgur.com/2nCt3Sbl.jpg",
*         "createdAt": "2017-11-06T13:20:16.900Z",
*         "updatedAt": "2017-11-06T13:20:16.900Z"
*       }
*     }
*   }
* }
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample Error-Response
*     HTTP/1.1 401 Unauthorized
* {
*  "success": false,
*  "message": "authentication_failed"
* }
*
*/
router.post('/login', _authenticateUserController2.default.authenticateUser.bind(_authenticateUserController2.default));

/**
* @api {POST} /api/users/login/facebook POST facebook
* @apiGroup users authenticate
*
* @apiDescription Request User Authentication.<br />
*                 <a href="#api-users_authenticate-PostApiUsersLogin">Response is same as here.</a>
*
* @apiParam (JSON) {String} token User authentication token generated by facebook.
*
* @apiParamExample {JSON} Request-Example:
* {
*  "token": "actual_token"
* }
*
*/
router.post('/login/facebook', _authenticateUserController2.default.facebookAuthenticate.bind(_authenticateUserController2.default));

/**
* @api {POST} /api/users/login/instagram POST instagram
* @apiGroup users authenticate
*
* @apiDescription Request User Authentication.<br />
*                 <a href="#api-users_authenticate-PostApiUsersLogin">Response is same as here.</a>
*
* @apiParam (JSON) {String} token User authentication token generated by instagram.
*
* @apiParamExample {JSON} Request-Example:
* {
*  "token": "actual_token"
* }
*
*/
router.post('/login/instagram', _authenticateUserController2.default.instagramAuthenticate.bind(_authenticateUserController2.default));

/**
* @api {POST} /api/users/login/linkedin POST linkedin
* @apiGroup users authenticate
*
* @apiDescription Request User Authentication.<br />
*                 <a href="#api-users_authenticate-PostApiUsersLogin">Response is same as here.</a>
*
* @apiParam (JSON) {String} token User authentication token generated by linkedin.
*
* @apiParamExample {JSON} Request-Example:
* {
*  "token": "actual_token"
* }
*
*/
router.post('/login/linkedin', _authenticateUserController2.default.linkedinAuthenticate.bind(_authenticateUserController2.default));

/**
* @api {POST} /api/users/reset-password POST reset password
* @apiGroup users
*
* @apiDescription Request Password Reset.
*
* @apiParam (JSON) {String} emailAddress Email of the user who wants to reset password.
*
* @apiParamExample {JSON} Request-Example:
* {
*  "emailAddress": "brian_tracey+10@gmail.com"
* }
*
* @apiSuccess {String} success The status of the request.
* @apiSuccess {String} message The message for success.
*
* @apiSuccessExample Success-Response: /api/users/reset-password
*     HTTP/1.1 200 OK
* {
*  "success": true,
*  "message": "password_reseted_successfully"
* }
*
*/
router.post('/reset-password', _authenticateUserController2.default.sendPasswordResetEmail.bind(_authenticateUserController2.default));

/**
This endpoint has a dedicated web page for password reset.
*/
router.get('/reset-password/:token', _authenticateUserController2.default.resetPasswordForm.bind(_authenticateUserController2.default));

/**
This endpoint has a dedicated web page for password reset.
*/
router.post('/reset-password/:token', _authenticateUserController2.default.resetPassword.bind(_authenticateUserController2.default));

module.exports = router;