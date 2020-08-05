"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UploadControllers = function () {
  function UploadControllers() {
    _classCallCheck(this, UploadControllers);
  }

  _createClass(UploadControllers, [{
    key: "uploadFile",
    value: function uploadFile(req, res, next) {
      if (req.files < 1) {
        var err = new Error();
        err.status = 422;
        err.message = "select_file_for_upload";

        throw err;
      }

      res.jsonp({
        "URL": req.files[0].location
      });
    }
  }]);

  return UploadControllers;
}();

exports.default = new UploadControllers();