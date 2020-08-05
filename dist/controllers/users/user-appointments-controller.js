'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appointmentsRepository = require('../../repositories/appointments-repository');

var _appointmentsRepository2 = _interopRequireDefault(_appointmentsRepository);

var _generalErrors = require('../../services/error-services/general-errors');

var _generalErrors2 = _interopRequireDefault(_generalErrors);

var _objectFactory = require('../../services/filtering-services/object-factory');

var _objectFactory2 = _interopRequireDefault(_objectFactory);

var _paginationOptions = require('../../services/filtering-services/pagination-options');

var _paginationOptions2 = _interopRequireDefault(_paginationOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserAppointmentsController = function () {
  function UserAppointmentsController() {
    _classCallCheck(this, UserAppointmentsController);
  }

  _createClass(UserAppointmentsController, [{
    key: 'allUserAppointments',
    value: function allUserAppointments(req, res, next) {
      var options = _objectFactory2.default.queryOptions(req.query, ['status', 'state']);

      return _appointmentsRepository2.default.findAndCountAllByUserId(req.params.id, options).then(function (appointments) {
        res.jsonp(_paginationOptions2.default.findAllResponseObject(appointments, req.query));
      }).catch(function (err) {
        _generalErrors2.default.addErrStatus(err, 422);

        return next(err);
      });
    }
  }]);

  return UserAppointmentsController;
}();

exports.default = new UserAppointmentsController();