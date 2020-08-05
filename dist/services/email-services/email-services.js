'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _notification = require('../firebase-services/notification');

var _notification2 = _interopRequireDefault(_notification);

var _coachesRepository = require('../../repositories/coaches-repository');

var _coachesRepository2 = _interopRequireDefault(_coachesRepository);

var _usersRepository = require('../../repositories/users-repository');

var _usersRepository2 = _interopRequireDefault(_usersRepository);

var _templatesRepository = require('../../repositories/templates-repository');

var _templatesRepository2 = _interopRequireDefault(_templatesRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require(_appRootPath2.default + '/src/config/config.json');
var emailSubjects = require(_appRootPath2.default + '/src/config/email.json');
var notifications = require(_appRootPath2.default + '/src/config/notifications.json');

var EmailServices = function () {
  function EmailServices() {
    _classCallCheck(this, EmailServices);

    this.templateRoots = {
      register: _appRootPath2.default + '/src/services/email-services/templates/register.pug',
      passwordReset: _appRootPath2.default + '/src/services/email-services/templates/reset-password.pug',
      notifications: _appRootPath2.default + '/src/services/email-services/templates/notifications/'
    };
  }

  _createClass(EmailServices, [{
    key: '_getNodemailerObject',
    value: function _getNodemailerObject() {
      return {
        port: config.email.port,
        service: config.email.service,
        auth: {
          user: config.email.userConfig.user,
          pass: config.email.userConfig.password
        }
      };
    }
  }, {
    key: 'createTemplateVariableObject',
    value: function createTemplateVariableObject(user, updatedObject, token, baseUrl) {
      var templateVariables = {};
      if (user) {
        templateVariables.clientName = user.name == null ? user.username : user.name;
        templateVariables.user = {
          username: user.username
        };
      }

      if (updatedObject) {
        templateVariables.coachName = updatedObject.coachName;
        templateVariables.formattedDate = (0, _moment2.default)(updatedObject.dateTime).format('Do of MMMM YYYY, h:mm:ss a');
        templateVariables.time = (0, _moment2.default)(updatedObject.dateTime).format('h:mm:ss a');
        templateVariables.date = (0, _moment2.default)(updatedObject.dateTime).format('Do of MMMM YYYY');
        if (updatedObject.feedback) {
          templateVariables.ratingStars = updatedObject.rating;
          templateVariables.ratingComment = updatedObject.feedback;
        }
      }

      if (token) {
        templateVariables.token = token;
      }

      if (baseUrl) {
        templateVariables.baseUrl = baseUrl;
      }

      return Promise.resolve(templateVariables);
    }
  }, {
    key: '_isValidEmail',
    value: function _isValidEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }, {
    key: '_getMailOptions',
    value: function _getMailOptions(mailObject) {
      return {
        from: config.email.emailAddresses.sender,
        to: mailObject.emailTo ? mailObject.emailTo : config.email.emailAddresses.receiver,
        subject: mailObject.subject ? mailObject.subject : emailSubjects.subjects[mailObject.emailType],
        html: mailObject.emailContent ? mailObject.emailContent : mailObject.message
      };
    }
  }, {
    key: 'emailSender',
    value: function emailSender(mailObject) {
      var transporter = _nodemailer2.default.createTransport(this._getNodemailerObject());
      var mailOptions = this._getMailOptions(mailObject);
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('[ERROR]: ', error);
        }
      });
      transporter.close();

      return Promise.resolve(null);
    }
  }, {
    key: 'sendEmailToAdmin',
    value: function sendEmailToAdmin(mailObject) {
      return this.emailSender(mailObject);
    }
  }, {
    key: 'emailVerficiation',
    value: function emailVerficiation(homeUrl, email, token) {
      var _this = this;

      var templateVariables;
      var mailObject = {};
      var baseUrl = homeUrl + '/verification?token=' + token + '&email=' + email;
      return this.createTemplateVariableObject(null, null, null, baseUrl).then(function (tempVariables) {
        console.log('tempVariables' + JSON.stringify(tempVariables));
        templateVariables = tempVariables;
        return _templatesRepository2.default.findOneByType(notifications.emailVerification);
      }).then(function (template) {
        if (template) {
          console.log('template is: ' + JSON.stringify(template.template));
          console.log('templateVariables is: ' + JSON.stringify(templateVariables));
          mailObject.emailContent = _pug2.default.render(template.template, templateVariables);
          console.log('templateVariables fedfdf is: ' + JSON.stringify(_pug2.default.render(template.template, templateVariables)));
          mailObject.subject = template.subject;
        }
        // console.log("mailObject"+ JSON.stringify(mailObject));
        mailObject.emailTo = email;
        mailObject.emailType = "emailVerficiation";

        return _this.emailSender(mailObject);
      });
    }
  }, {
    key: 'sendRegisterMail',
    value: function sendRegisterMail(user) {
      var _this2 = this;

      var templateVariables;
      var mailObject = {};
      return this.createTemplateVariableObject(user, null, null, null).then(function (tempVariables) {
        console.log('tempVariables' + JSON.stringify(tempVariables));
        templateVariables = tempVariables;
        return _templatesRepository2.default.findOneByType(notifications.register);
      }).then(function (template) {
        if (template) {
          console.log('template is: ' + JSON.stringify(template.template));
          console.log('templateVariables is: ' + JSON.stringify(templateVariables));
          mailObject.emailContent = _pug2.default.render(template.template, templateVariables);
          console.log('templateVariables fedfdf is: ' + JSON.stringify(_pug2.default.render(template.template, templateVariables)));
          mailObject.subject = template.subject;
        }
        mailObject.emailTo = user.emailAddress;
        mailObject.emailType = "register";

        return _this2.emailSender(mailObject);
      });
    }
  }, {
    key: 'sendResetPasswordEmail',
    value: function sendResetPasswordEmail(user, token, baseUrl) {
      var _this3 = this;

      var templateVariables;
      var mailObject = {};

      return this.createTemplateVariableObject(user, null, token, baseUrl).then(function (tempVariables) {
        templateVariables = tempVariables;

        return _templatesRepository2.default.findOneByType(notifications.resetPassword);
      }).then(function (template) {
        if (template) {
          mailObject.emailContent = _pug2.default.render(template.template, templateVariables);
          mailObject.subject = template.subject;
        }
        mailObject.emailTo = user.emailAddress;
        mailObject.emailType = "resetPassword";

        return _this3.emailSender(mailObject);
      });
    }
  }, {
    key: 'sendNotificationEmail',
    value: function sendNotificationEmail(user, updatedObject, notification) {
      var _this4 = this;

      var notificationType = _lodash2.default.findKey(notifications.notificationTypes, function (keyValue) {
        return keyValue == notification.notificationType;
      });
      var templateType = _util2.default.format('%s-email', notifications.notificationTypes[notificationType]);
      var templateVariables;
      var mailObject = {};

      return _coachesRepository2.default.findOneById(updatedObject.coachId).then(function (coach) {
        if (coach) {
          updatedObject.coachName = coach.user.name;
        }
        if (notification.notificationType === notifications.notificationTypes.appointmentFeedback) {
          return _usersRepository2.default.findOneById(updatedObject.userId).then(function (userObject) {
            return _this4.createTemplateVariableObject(userObject, updatedObject, null, null);
          });
        }

        return _this4.createTemplateVariableObject(user, updatedObject, null, null);
      }).then(function (tempVariables) {
        templateVariables = tempVariables;

        return _templatesRepository2.default.findOneByType(templateType);
      }).then(function (template) {
        if (template) {
          mailObject.emailContent = _pug2.default.render(template.template, templateVariables);
          mailObject.subject = template.subject;
        }
        mailObject.emailTo = user.emailAddress;
        mailObject.emailType = notificationType;

        //firebase notification
        if (user.firebaseToken != null) {
          var notify = template.subject.replace('<p>', '');
          notify.replace('</p>', '');
          _notification2.default.sendMessage(notify, _pug2.default.render(template.template, templateVariables), user.firebaseToken);
        }
        return _this4.emailSender(mailObject);
      });
    }
  }]);

  return EmailServices;
}();

exports.default = new EmailServices();