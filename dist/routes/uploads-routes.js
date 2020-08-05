'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _uploadsControllers = require('../controllers/uploads-controllers');

var _uploadsControllers2 = _interopRequireDefault(_uploadsControllers);

var _upload = require('../services/middlewares/upload');

var _upload2 = _interopRequireDefault(_upload);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var auth = require('../auth')();

/**
* @api {POST} /api/file-upload POST uploads
* @apiGroup uploads
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Upload a file to storage. <br />
*                 Maximum size of the selected file is limited to 3MB. <br />
*                 This endpoint can be used only by authenticated users.
*
* @apiSuccess {String} URL the uploaded file URL, string [0-256], valid URL
* @apiSuccessExample Success-Response: /api/file-upload
*     HTTP/1.1 200 OK
*{
*  "URL": "https://coach-app-api.s3.eu-central-1.amazonaws.com/user-image-uploads/4c9714ad52e2ef0da290d2a5a9a10d91454011151505740188991"
*}
*
* @apiError {String} success The status of the request.
* @apiError {String} message The message of the error.
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 422 Unprocessable Entity
*{
*  "success": false,
*  "message": "too_many_files"
*}
*/
router.post('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _upload2.default.buildUploadFileS3Middleware(), _uploadsControllers2.default.uploadFile.bind(_uploadsControllers2.default));

module.exports = router;