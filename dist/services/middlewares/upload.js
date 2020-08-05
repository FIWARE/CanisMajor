'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerImager = require('multer-imager');

var _multerImager2 = _interopRequireDefault(_multerImager);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require(_appRootPath2.default + '/src/config/config.json');

var UploadFileMiddlewareBuilder = function () {
  function UploadFileMiddlewareBuilder() {
    _classCallCheck(this, UploadFileMiddlewareBuilder);

    this.buildUploadFileS3Middleware = this.buildUploadFileS3Middleware.bind(this);
  }

  _createClass(UploadFileMiddlewareBuilder, [{
    key: '_getKey',
    value: function _getKey(req, file, callback) {
      //generate an unique filename.
      var fileName = _crypto2.default.randomBytes(20).toString('hex') + Date.now() + _path2.default.extname(file.originalname);
      var filePath = 'user-image-uploads/' + fileName;

      callback(null, filePath);
    }
  }, {
    key: '_getLimits',
    value: function _getLimits(fileSizeInMb) {
      return {
        fieldNameSize: 1000,
        files: 1,
        fileSize: fileSizeInMb * 1024 * 1024
      };
    }
  }, {
    key: '_getImagerWithS3UploadOptions',
    value: function _getImagerWithS3UploadOptions() {
      return (0, _multerImager2.default)({
        dirname: 'user-image-uploads',
        bucket: config.s3.bucketName,
        secretAccessKey: config.s3.userConfig.secretAccessKey,
        accessKeyId: config.s3.userConfig.accessKeyId,
        region: 'us-east-1',
        signatureVersion: 'v4',
        gm: { // [Optional]: define graphicsmagick options
          width: 856, // doc: http://aheckmann.github.io/gm/docs.html#resize
          height: null
        },
        key: this._getKey
      });
    }
  }, {
    key: 'buildUploadFileS3Middleware',
    value: function buildUploadFileS3Middleware() {
      var upload = (0, _multer2.default)({
        storage: this._getImagerWithS3UploadOptions(),
        putSingleFilesInArray: true,
        limits: this._getLimits(10)
      });

      return upload.any();
    }
  }]);

  return UploadFileMiddlewareBuilder;
}();

exports.default = new UploadFileMiddlewareBuilder();