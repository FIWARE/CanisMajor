'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _errorParser = require('./services/error-services/error-parser.js');

var _errorParser2 = _interopRequireDefault(_errorParser);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _preAppointmentNotification = require('./services/cronjob-services/preAppointmentNotification');

var _preAppointmentNotification2 = _interopRequireDefault(_preAppointmentNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import appRoot from 'app-root-path';
var index = require('./routes/index');

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.options('*', (0, _cors2.default)());

var usersRoutes = require('./routes/users/users-routes');
var authUsersRoutes = require('./routes/users/authenticate-user-routes');
var currentUserRoutes = require('./routes/users/current-user-routes');
var userSettingRoutes = require('./routes/users/user-settings-routes');
var userAppointmentsRoutes = require('./routes/users/user-appointments-routes');
var appointmentsRoutes = require('./routes/appointments-routes');
var categoriesRoutes = require('./routes/categories-routes');
var specialitiesRoutes = require('./routes/specialities-routes');
var coachesRoutes = require('./routes/coaches-routes');
var sendEmailRoutes = require('./routes/send-email-routes');
var uploadsRoutes = require('./routes/uploads-routes');
var notificationsRoutes = require('./routes/notifications-routes');
var paymentRoutes = require('./routes/payment-routes');
var currentPaymentRoutes = require('./routes/users/current-user-payments-routes');
var templatesRoutes = require('./routes/templates-routes');
var verfiyEmailRoutes = require('./routes/verify-routes');
var newsRoutes = require('./routes/news-routes');

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/doc', _express2.default.static(_path2.default.join(__dirname, '../apidoc')));
app.use('/public', _express2.default.static(_path2.default.join(__dirname, '../public')));
app.use((0, _cookieParser2.default)());

app.use('/api/users', usersRoutes);
app.use('/api/users', authUsersRoutes);
app.use('/api/users', userSettingRoutes);
app.use('/api/users', userAppointmentsRoutes);
app.use('/api/users/current', currentUserRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/specialities', specialitiesRoutes);
app.use('/api/coaches', coachesRoutes);
app.use('/api/send-email', sendEmailRoutes);
app.use('/api/file-upload', uploadsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users/current/payments', currentPaymentRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/verification', verfiyEmailRoutes);
app.use('/api/news', newsRoutes);

app.use('/', index);

app.set('views', _path2.default.join(__dirname, '..', 'braintree', 'views'));
app.set('view engine', 'pug');
app.use(_express2.default.static('./braintree/public'));
app.use(_express2.default.static('./node_modules/bootstrap'));
app.use(_express2.default.static('./node_modules/jquery'));

//cron jobs
_preAppointmentNotification2.default.init();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  var errorMessage = err;

  // password reset request page with bad token
  if (err.message === "Signature verification failed") {
    res.render('./reset-password.pug', {
      message: 'token_error'
    });
  };

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status == 403) {
    errorMessage = {
      "success": false,
      "message": "access_forbidden"
    };
  }

  if (err.status == 422) {
    errorMessage = _errorParser2.default.sequelizeErrorParser(err);
  }

  if (err.code && err.storageErrors) {
    errorMessage = _errorParser2.default.multerErrorParser(err);
    err.status = errorMessage.status;
  }

  if (err.status == 404) {
    errorMessage = {
      "success": false,
      "message": "page_not_found"
    };
  }

  if (err.status == 401) {
    errorMessage = {
      "success": false,
      "message": err.message ? err.message : 'Unauthorized'
    };
  }

  if (err.status == 400) {
    errorMessage = {
      "success": false,
      "message": err.message ? err.message : 'bad_request',
      "processorResponseCode": err.processorResponseCode ? err.processorResponseCode : undefined
    };
  }

  if (err.status == 500) {
    errorMessage = {
      "success": false,
      "message": err.message ? err.message : 'internal_server_error'
    };
  }

  // render the error page
  res.status(err.status || 500);
  if (err && !err.status) {
    res.jsonp({ success: false });
  } else {
    if (!isNaN(errorMessage.status)) {
      delete errorMessage.status;
    }

    res.jsonp(errorMessage);
  }
});
module.exports = app;