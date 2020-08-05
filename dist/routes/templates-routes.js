'use strict';

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../services/middlewares/authenticate.js');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _templatesController = require('../controllers/templates-controller');

var _templatesController2 = _interopRequireDefault(_templatesController);

var _pagination = require('../services/middlewares/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../auth')();
var router = _express2.default.Router();

/**
* @api {GET} /api/templates GET categories
* @apiGroup templates
*
* @apiDescription Retrieves a list of all templates.
*
* @apiParam (Query String) {Integer} page Query string parameter for the page number (default is 0).
* @apiParam (Query String) {Integer} perPage Query string parameter for the number of elements per page (default is 25).
* @apiParam (Query String) {String} sort  If filter is needed, the sorting column priority (- in front means sort DESC, {nothing} in front means sort ASC). eg: sort=-name,id (sorting DESC by name and when we have multiple entries with the same name, sort them ASC by id)
*
* @apiSuccess {Integer} pageNumber The number of the curent page.
* @apiSuccess {Integer} pageSize The number of elements per page.
* @apiSuccess {Integer} totalRecordCount The total number of elements.
* @apiSuccess {Array[]} records[] An array of objects with the needed elements.
* @apiSuccess {Integer} records[id] The id of the category.
* @apiSuccess {String} records[type] The label of the category.
* @apiSuccess {String} records[template] The label of the category.
* @apiSuccess {String} records[subject] The label of the category.
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
*       "id": 98,
*       "type": "appointment-approved-email",
*       "template": "doctype html\nhtml(lang='en')\n  head\n    meta(charset='utf-8')\n    meta(content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0', name='viewport')\n    meta(name='viewport', content='width=device-width')\n  body\n    h2 Dear #{clientName}\n    h3 #{coachName} on the #{date} at #{time} has been CONFIRMED.\n      br\n      |#{coachName} looks forward to meeting with you!\n      br\n      |If there is anything we can help you with, please don’t hesitate to contact our customer support representatives at support@thenlightnapp.com.\n      br\n      br\n      |Sunny Regards,\n      br\n      |Your nLIGHTn™ Team\n      br\n    img(src='https://i.imgur.com/gU6ucgH.png')\n    br\n    br\n    h4 © Malak Consulting GmbH 2018\u2028nLIGHTn™ is a trademark of Malak Consulting GmbH.  The information in this document is the property of Malak Consulting GmbH and may not be copied, communicated to a third party, or used for any purpose other than that for which it is supplied, without the express written consent of Malak Consulting GmbH.",
*       "createdAt": "2019-01-22T14:21:35.867Z",
*       "updatedAt": "2019-01-22T14:21:35.867Z"
*     },
*     {
*       "id": 99,
*       "type": "appointment-cancelled-email",
*       "template": "doctype html\nhtml(lang='en')\n  head\n    meta(charset='utf-8')\n    meta(content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0', name='viewport')\n    meta(name='viewport', content='width=device-width')\n  body\n    h2\n      p Your appointment on the #{ formattedDate } was cancelled. Enjoy and have nice day!",
*       "createdAt": "2019-01-22T14:21:35.883Z",
*       "updatedAt": "2019-01-22T14:21:35.883Z"
*     },
*     {
*       "id": 100,
*       "type": "appointment-created-email",
*       "template": "doctype html\nhtml(lang='en')\n  head\n    meta(charset='utf-8')\n    meta(content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0', name='viewport')\n    meta(name='viewport', content='width=device-width')\n  body\n    h3 Dear #{clientName}\n    h4\n      |We have received your booking request for an appointment with #{coachName} on the #{date} at #{time}.\n      |You will be contacted (via email and on the app) within the next 24-48 hours to confirm your appointment.\n      |If there is anything we can help you with, please don’t hesitate to contact our customer support representatives at support@thenlightnapp.com. \n      |\n      |Sunny Regards,\n      |Your nLIGHTn™ Team\n      |\n      img(src=require(\"https://i.imgur.com/gU6ucgH.png\"))\n      |\n    h5 © Malak Consulting GmbH 2018\u2028nLIGHTn™ is a trademark of Malak Consulting GmbH.  The information in this document is the property of Malak Consulting GmbH and may not be copied, communicated to a third party, or used for any purpose other than that for which it is supplied, without the express written consent of Malak Consulting GmbH.",
*       "createdAt": "2019-01-22T14:21:35.888Z",
*       "updatedAt": "2019-01-22T14:21:35.888Z"
*     },
*   ]
* }
*
* @apiSuccessExample Success-Response: /api/templates?type=appointment-approved-email
*     HTTP/1.1 200 OK
* {
*   "pageNumber": 0,
*   "pageSize": 25,
*   "totalRecordCount": 1,
*   "records": [
*     {
*       "id": 98,
*       "type": "appointment-approved-email",
*       "template": "doctype html\nhtml(lang='en')\n  head\n    meta(charset='utf-8')\n    meta(content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0', name='viewport')\n    meta(name='viewport', content='width=device-width')\n  body\n    h2 Dear #{clientName}\n    h3 #{coachName} on the #{date} at #{time} has been CONFIRMED.\n      br\n      |#{coachName} looks forward to meeting with you!\n      br\n      |If there is anything we can help you with, please don’t hesitate to contact our customer support representatives at support@thenlightnapp.com.\n      br\n      br\n      |Sunny Regards,\n      br\n      |Your nLIGHTn™ Team\n      br\n    img(src='https://i.imgur.com/gU6ucgH.png')\n    br\n    br\n    h4 © Malak Consulting GmbH 2018\u2028nLIGHTn™ is a trademark of Malak Consulting GmbH.  The information in this document is the property of Malak Consulting GmbH and may not be copied, communicated to a third party, or used for any purpose other than that for which it is supplied, without the express written consent of Malak Consulting GmbH.",
*       "createdAt": "2019-01-22T14:21:35.867Z",
*       "updatedAt": "2019-01-22T14:21:35.867Z"
*     }
*   ]
* }
*
*/
router.get('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _pagination2.default.middleware, _templatesController2.default.allEntries.bind(_templatesController2.default));

/**
* @api {GET} /api/templates/:id GET template
* @apiGroup templates
*
* @apiDescription Retrieves a choosen template.
*
* @apiSuccess {Integer} id
* @apiSuccess {String} type
* @apiSuccess {String} template
* @apiSuccess {String} subject
* @apiSuccess {Date} updatedAt
* @apiSuccess {Date} createdAt
*
* @apiSuccessExample Success-Response: /api/templates/1
*     HTTP/1.1 200 OK
* {
*   "id": 1,
*   "type": "appointment-approved-email",
*   "template": "doctype html\nhtml(lang='en')\n  head\n    meta(charset='utf-8')\n    meta(content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0', name='viewport')\n    meta(name='viewport', content='width=device-width')\n  body\n    h2 Dear #{clientName}\n    h3 #{coachName} on the #{date} at #{time} has been CONFIRMED.\n      br\n      |#{coachName} looks forward to meeting with you!\n      br\n      |If there is anything we can help you with, please don’t hesitate to contact our customer support representatives at support@thenlightnapp.com.\n      br\n      br\n      |Sunny Regards,\n      br\n      |Your nLIGHTn™ Team\n      br\n    img(src='https://i.imgur.com/gU6ucgH.png')\n    br\n    br\n    h4 © Malak Consulting GmbH 2018\u2028nLIGHTn™ is a trademark of Malak Consulting GmbH.  The information in this document is the property of Malak Consulting GmbH and may not be copied, communicated to a third party, or used for any purpose other than that for which it is supplied, without the express written consent of Malak Consulting GmbH.",
*   "createdAt": "2019-01-22T14:21:35.867Z",
*   "updatedAt": "2019-01-22T14:21:35.867Z"
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
router.get('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _templatesController2.default.oneSpecifiedEntry.bind(_templatesController2.default));

/**
* @api {PUT} /api/templates/:id PUT template
* @apiGroup templates
*
* @apiParam (URL params) {Integer} id The selected category id.
*
* @apiDescription Update a specified template
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-templates-GetApiCategoriesId">Response is same as here.</a>
*
* @apiParam (JSON) {String} type [1-128], not null
* @apiParam (JSON) {String} template [1-32768], not null
* @apiParam (JSON) {String} subject [1-128], not null
*
* @apiParamExample {JSON} Request-Example:
* {
*   "type": 'notification-email'
*   "template": 'pug-template'
*   "subject": 'Some random subject'
* }
*
*/
router.put('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _templatesController2.default.updateEntry.bind(_templatesController2.default));

/**
* @api {POST} /api/templates POST template
* @apiGroup templates
*
* @apiDescription Create a template.
*                 This endpoint can be used only by administrators.<br />
*                 <a href="#api-categories-GetApiCategoriesId">Response is same as here.</a>
*
* @apiParam {String} label
*
* @apiParamExample {JSON} Request-Example:
* {
*   "type": 'notification-email'
*   "template": 'pug-template'
*   "subject": 'Some random subject'
* }
*
*/
router.post('/', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _templatesController2.default.createEntry.bind(_templatesController2.default));

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
router.delete('/:id([0-9]+)', auth.authenticate(), _authenticate2.default.attachAuthUserToRequest, _authenticate2.default.isAdmin, _templatesController2.default.deleteEntry.bind(_templatesController2.default));

module.exports = router;