'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @api {GET} / GET status
* @apiGroup status
*
* @apiDescription Retrieves a simple message.
*                 This endpoint doesn't need authentification.
*
* @apiSuccessExample Success-Response: /
*     HTTP/1.1 200 OK
* {
*   success: true,
*   message: "index_page"
* }
*
*/
router.get('/', function (req, res, next) {
  res.jsonp({
    success: true,
    message: 'index_page'
  });
});

module.exports = router;