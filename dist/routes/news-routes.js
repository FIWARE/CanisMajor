'use strict';

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _newsController = require('../controllers/news-controller');

var _newsController2 = _interopRequireDefault(_newsController);

var _pagination = require('../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/news GET categories
* @apiGroup news
*
* @apiDescription Retrieves a list of all news.
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-title,id (sorting DESC by title and when we have multiple entries with the same title, sort them ASC by id)
*
* @apiSuccess {Integer} pageNumber The number of the curent page.
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id] The id of the category.
* @apiSuccess {String} records[title] The label of the category.
* @apiSuccess {String} records[sub_title] The label of the category.
* @apiSuccess {String} records[body] The label of the category.
* @apiSuccess {Array[String]} tags[] The label of the category.
* @apiSuccess {Integer} records[userId] The label of the category.
* @apiSuccess {Date} records[updatedAt] Date and time of last update.
* @apiSuccess {Date} records[createdAt] Date and time of creation.
*
* @apiSuccessExample Success-Response: /api/news
*     HTTP/1.1 200 OK
*   {
*       "pageNumber": 0,
*       "pageSize": 25,
*       "totalRecordCount": 1,
*       "records": [
*           {
*               "id": 1,
*               "title": "demo post",
*               "sub_title": "demo post sub_title",
*               "body": "this is demo post",
*               "tags": [
*                   "test",
*                   "demo",
*                   "random"
*               ],
*               "userId": 1,
*               "createdAt": "2020-07-07T13:46:20.649Z",
*               "updatedAt": "2020-07-07T13:46:20.649Z"
*           }
*       ]
*   }
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _newsController2.default.allEntries.bind(_newsController2.default));

/**
* @api {GET} /api/news/:id GET news
* @apiGroup news
*
* @apiDescription Retrieves a choosen news.
*
* @apiSuccess {Integer} id
* @apiSuccess {String} title
* @apiSuccess {String} sub_title
* @apiSuccess {String} body
* @apiSuccess {Array} tags
* @apiSuccess {Integer} userId
* @apiSuccess {Date} updatedAt
* @apiSuccess {Date} createdAt
*
* @apiSuccessExample Success-Response: /api/news/1
*     HTTP/1.1 200 OK
*   {
*       "id": 1,
*       "title": "demo post",
*       "sub_title": "demo post sub_title",
*       "body": "this is demo post",
*       "tags": [
*           "test",
*           "demo",
*           "random"
*       ],
*       "userId": 1
*       "createdAt": "2020-07-07T13:46:20.649Z",
*       "updatedAt": "2020-07-07T13:46:20.649Z"
*   }
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
*/
router.get('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _newsController2.default.oneSpecifiedEntry.bind(_newsController2.default));

/**
* @api {PUT} /api/news/:id PUT template
* @apiGroup templates
*
* @apiParam (URL params) {Integer} id The selected news id.
*
* @apiDescription Update a specified news
*
* @apiParam (JSON) {String} title [1-128], not null
* @apiParam (JSON) {String} sub_title [1-32768], not null
* @apiParam (JSON) {Text} body, not null
* @apiParam (JSON) {Integer} userId, not null
* @apiParam (JSON) {Array} tags, not null
*
* @apiParamExample {JSON} Request-Example:
*   {
*       "title": "demo post",
*       "sub_title": "demo post sub_title",
*       "body": "this is demo post",
*       "tags": ["test", "demo","random"],
*       "userId": 1
*   }
*
*/
router.put('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _newsController2.default.updateEntry.bind(_newsController2.default));

/**
* @api {POST} /api/news POST news
* @apiGroup news
*
* @apiDescription Create a news.
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-categories-GetApiCategoriesId">Response is same as here.</a>
*
* @apiParam {String} label
*
* @apiParamExample {JSON} Request-Example:
*   {
*       "title": "demo post",
*       "sub_title": "demo post sub_title",
*       "body": "this is demo post",
*       "tags": ["test", "demo","random"],
*       "userId": 1
*   }
*
*/
router.post('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _newsController2.default.createEntry.bind(_newsController2.default));

/**
* @api {DELETE} /api/news/:id DELETE news
* @apiGroup news
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Delete a news.
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-categories-GetApiCategoriesId">Response is same as here.</a>
*
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 403 Forbidden
* {
*   "success": false,
*   "message": "access_forbidden"
* }
*
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
* {
*   "success": false,
*   "message": "page_not_found"
* }
*/
router.delete('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _newsController2.default.deleteEntry.bind(_newsController2.default));

module.exports = router;