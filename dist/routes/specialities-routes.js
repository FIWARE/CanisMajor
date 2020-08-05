'use strict';

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _specialitiesController = require('../controllers/specialities-controller');

var _specialitiesController2 = _interopRequireDefault(_specialitiesController);

var _pagination = require('../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/specialities GET specialities
* @apiGroup specialities
*
* @apiDescription Retrieves a list of all specialities.
*
* @apiParam (Query String) {Integer} label  If filter is needed, the needed specialities label.
* @apiParam (Query String) {Integer} id The id of the speciality(you can use multiple ids eg: id=1&id=5);
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
*
* @apiSuccess {Integer} pageNumber The number of the curent page.
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id] The id of the speciality.
* @apiSuccess {String} records[label] The label of the speciality.
* @apiSuccess {String} records[imageUrl] The url of the image for the speciality.
* @apiSuccess {Date} records[updatedAt] Date and time of last update.
* @apiSuccess {Date} records[createdAt] Date and time of creation.
*
* @apiSuccessExample Success-Response: /api/specialities
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 3,
*   "records": [
*     {
*       "id": 1,
*       "label": "Fitness",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T11:00:05.816Z",
*       "updatedAt": "2017-09-15T11:00:05.816Z"
*     },
*     {
*       "id": 2,
*       "label": "Leadership",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T11:00:05.821Z",
*       "updatedAt": "2017-09-15T11:00:05.821Z"
*     },
*     {
*       "id": 3,
*       "label": "Education",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T11:00:05.827Z",
*       "updatedAt": "2017-09-15T11:00:05.827Z"
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/specialities?label=Education
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 1,
*   "records": [
*     {
*       "id": 3,
*       "label": "Education",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T11:00:05.827Z",
*       "updatedAt": "2017-09-15T11:00:05.827Z"
*     }
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/specialities?perPage=2&page=0&sort=-id
*     HTTP/1.1 200 OK
*
* {
*   "pageNumber": 0,
*   "pageSize": 2,
*   "totalRecordCount": 3,
*   "records": [
*     {
*       "id": 3,
*       "label": "Education",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T11:00:05.827Z",
*       "updatedAt": "2017-09-15T11:00:05.827Z"
*     },
*     {
*       "id": 2,
*       "label": "Leadership",
*       "imageUrl": null,
*       "createdAt": "2017-09-15T11:00:05.821Z",
*       "updatedAt": "2017-09-15T11:00:05.821Z"
*     }
*   ]
* }
*
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _specialitiesController2.default.allEntries.bind(_specialitiesController2.default));

/**
* @api {GET} /api/specialities/:id GET speciality
* @apiGroup specialities
*
* @apiDescription Retrieves a choosen speciality.
*
* @apiSuccess {Integer} id
* @apiSuccess {String} label
* @apiSuccess {String} imageUrl
* @apiSuccess {Date} updatedAt
* @apiSuccess {Date} createdAt
*
* @apiSuccessExample Success-Response: /api/specialities/1
*     HTTP/1.1 200 OK
* {
*  "id": 1,
*  "label": "Education",
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
router.get('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _specialitiesController2.default.oneSpecifiedEntry.bind(_specialitiesController2.default));

/**
* @api {PUT} /api/specialities/:id PUT speciality
* @apiGroup specialities
*
* @apiParam (URL params) {Integer} id The selected speciality id.
*
* @apiDescription Update a specified speciality
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-specialities-GetApiSpecialitiesId">Response is same as here.</a>
*
* @apiParam (JSON) {String} [label] [1-128], not null
* @apiParam (JSON) {String} [imageUrl] valid URL
*
* @apiParamExample {JSON} Request-Example:
* {
*   "label": 'Lorem ipsum...',
*   "imageUrl": null
* }
*
*/
router.put('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _specialitiesController2.default.updateEntry.bind(_specialitiesController2.default));

/**
* @api {POST} /api/specialities POST speciality
* @apiGroup specialities
*
* @apiDescription Create a speciality.
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-specialities-GetApiSpecialitiesId">Response is same as here.</a>
*
* @apiParam (JSON) {String} label [1-128], not null
* @apiParam (JSON) {String} [imageUrl] valid URL
*
* @apiParamExample {JSON} Request-Example:
* {
*   "label": 'Lorem ipsum...',
*   "imageUrl": null
* }
*
* @apiParamExample {JSON} Request-Example:
* {
*   "label": 'Lorem ipsum...',
*   "imageUrl": null
* }
*
*/
router.post('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _specialitiesController2.default.createEntry.bind(_specialitiesController2.default));

/**
* @api {DELETE} /api/specialities/:id DELETE speciality
* @apiGroup specialities
*
* @apiHeader {String} Authorization The authentication token
*
* @apiHeaderExample {json} Header-Example:
* {
*  "Authorization": "JWT {token}"
* }
*
* @apiDescription Delete a speciality.
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-specialities-GetApiSpecialitiesId">Response is same as here.</a>
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
router.delete('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _specialitiesController2.default.deleteEntry.bind(_specialitiesController2.default));

module.exports = router;