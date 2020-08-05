'use strict';

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _categoriesController = require('../controllers/categories-controller');

var _categoriesController2 = _interopRequireDefault(_categoriesController);

var _pagination = require('../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/categories GET categories
* @apiGroup categories
*
* @apiDescription Retrieves a list of all categories.
*
* @apiParam (Query String) {Integer} label  If filter is needed, the needed categories label.
* @apiParam (Query String) {Integer} id The id of the category(you can use multiple ids eg: id=1&id=5);
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
*
* @apiSuccess {Integer} pageNumber The number of the curent page.
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id] The id of the category.
* @apiSuccess {String} records[label] The label of the category.
* @apiSuccess {String} records[imageUrl] The url of the image for the category.
* @apiSuccess {Date} records[updatedAt] Date and time of last update.
* @apiSuccess {Date} records[createdAt] Date and time of creation.
*
* @apiSuccessExample Success-Response: /api/categories
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 4,
*   "records": [
*     {
*       "id": 1,
*       "label": "Executive and Leadership Coaching",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T10:28:51.249Z",
*       "updatedAt": "2017-09-15T10:28:51.249Z"
*     },
*     {
*       "id": 2,
*       "label": "Business Coaching",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T10:28:51.260Z",
*       "updatedAt": "2017-09-15T10:28:51.260Z"
*     },
*     {
*       "id": 3,
*       "label": "Skills Coaching",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T10:28:51.266Z",
*       "updatedAt": "2017-09-15T10:28:51.266Z"
*     },
*     {
*       "id": 4,
*       "label": "Career Coaching",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T10:28:51.272Z",
*       "updatedAt": "2017-09-15T10:28:51.272Z"
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/categories?label=Career Coaching
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 1,
*   "records": [
*     {
*       "id": 4,
*       "label": "Career Coaching",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T10:28:51.272Z",
*       "updatedAt": "2017-09-15T10:28:51.272Z"
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/categories?perPage=3&page=2&sort=-label
*     HTTP/1.1 200 OK
*
* {
*   "pageNumber": 2,
*   "pageSize": 3,
*   "totalRecordCount": 9,
*   "records": [
*     {
*       "id": 7,
*       "label": "Creativity, Relationship and Spiritual Coaching",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T10:28:51.288Z",
*       "updatedAt": "2017-09-15T10:28:51.288Z"
*     },
*     {
*       "id": 4,
*       "label": "Career Coaching",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T10:28:51.272Z",
*       "updatedAt": "2017-09-15T10:28:51.272Z"
*     },
*     {
*       "id": 2,
*       "label": "Business Coaching",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T10:28:51.260Z",
*       "updatedAt": "2017-09-15T10:28:51.260Z"
*     }
*   ]
* }
*
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _categoriesController2.default.allEntries.bind(_categoriesController2.default));

/**
* @api {GET} /api/categories/:id GET category
* @apiGroup categories
*
* @apiDescription Retrieves a choosen category.
*
* @apiSuccess {Integer} id
* @apiSuccess {String} label
* @apiSuccess {String} imageUrl
* @apiSuccess {Date} updatedAt
* @apiSuccess {Date} createdAt
*
* @apiSuccessExample Success-Response: /api/categories/1
*     HTTP/1.1 200 OK
* {
*  "id": 1,
*  "label": "Executive and Leadership Coaching",
*  "imageUrl": null,
*  "createdAt": "2017-09-15T10:28:51.249Z",
*  "updatedAt": "2017-09-15T10:28:51.249Z"
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
*/
router.get('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _categoriesController2.default.oneSpecifiedEntry.bind(_categoriesController2.default));

/**
* @api {PUT} /api/categories/:id PUT category
* @apiGroup categories
*
* @apiParam (URL params) {Integer} id The selected category id.
*
* @apiDescription Update a specified category
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-categories-GetApiCategoriesId">Response is same as here.</a>
*
* @apiParam (JSON) {String} label [1-128], not null
*
* @apiParamExample {JSON} Request-Example:
* {
*   "label": 'Lorem ipsum...',
*   "imageUrl": null
* }
*
*/
router.put('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _categoriesController2.default.updateEntry.bind(_categoriesController2.default));

/**
* @api {POST} /api/categories POST category
* @apiGroup categories
*
* @apiDescription Create a category.
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-categories-GetApiCategoriesId">Response is same as here.</a>
*
* @apiParam {String} label
*
* @apiParamExample {JSON} Request-Example:
* {
*   "label": 'Lorem ipsum...',
* }
*
*/
router.post('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _categoriesController2.default.createEntry.bind(_categoriesController2.default));

/**
* @api {DELETE} /api/categories/:id DELETE category
* @apiGroup categories
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Delete a category.
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
router.delete('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _categoriesController2.default.deleteEntry.bind(_categoriesController2.default));

module.exports = router;