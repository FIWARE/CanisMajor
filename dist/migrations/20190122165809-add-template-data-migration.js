'use strict';

var moment = require('moment');
var util = require('util');

var myDateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
var templates = require('./json-data/templates.json');
var insertTemplate = "INSERT INTO \"templates\" (\"id\", \"type\", \"template\", \"subject\", \"created_at\", \"updated_at\") VALUES (DEFAULT, '%s', '%s', '%s', '%s', '%s')";

module.exports = {
  up: function up(queryInterface) {
    var query = util.format(insertTemplate, 'appointment-approved-email', templates['appointment-approved-email'], 'Appointment approved notification', myDateNow, myDateNow);

    return queryInterface.sequelize.query(query).then(function () {
      query = util.format(insertTemplate, 'appointment-cancelled-email', templates['appointment-cancelled-email'], 'Appointment cancelled notification', myDateNow, myDateNow);

      return queryInterface.sequelize.query(query);
    }).then(function () {
      query = util.format(insertTemplate, 'appointment-created-email', templates['appointment-created-email'], 'Appointment created notification', myDateNow, myDateNow);

      return queryInterface.sequelize.query(query);
    }).then(function () {
      query = util.format(insertTemplate, 'appointment-request-email', templates['appointment-request-email'], 'Appointment request notification', myDateNow, myDateNow);

      return queryInterface.sequelize.query(query);
    }).then(function () {
      query = util.format(insertTemplate, 'coach-request-approved-email', templates['coach-request-approved-email'], 'Coach request approved notification', myDateNow, myDateNow);

      return queryInterface.sequelize.query(query);
    }).then(function () {
      query = util.format(insertTemplate, 'register-email', templates['register-email'], 'Register approved notification', myDateNow, myDateNow);

      return queryInterface.sequelize.query(query);
    }).then(function () {
      query = util.format(insertTemplate, 'resest-password-email', templates['resest-password-email'], 'Reset password', myDateNow, myDateNow);

      return queryInterface.sequelize.query(query);
    }).then(function () {
      query = util.format(insertTemplate, 'appointment-feedback-email', templates['appointment-feedback-email'], 'Rating related notification', myDateNow, myDateNow);

      return queryInterface.sequelize.query(query);
    });
  },

  down: function down(queryInterface) {
    return queryInterface.sequelize.query("DELETE FROM templates WHERE type = 'appointment-feedback-email';").then(function () {
      return queryInterface.sequelize.query("DELETE FROM templates WHERE type = 'resest-password-email';");
    }).then(function () {
      return queryInterface.sequelize.query("DELETE FROM templates WHERE type = 'register-email';");
    }).then(function () {
      return queryInterface.sequelize.query("DELETE FROM templates WHERE type = 'coach-request-approved-email';");
    }).then(function () {
      return queryInterface.sequelize.query("DELETE FROM templates WHERE type = 'appointment-request-email';");
    }).then(function () {
      return queryInterface.sequelize.query("DELETE FROM templates WHERE type = 'appointment-created-email';");
    }).then(function () {
      return queryInterface.sequelize.query("DELETE FROM templates WHERE type = 'appointment-cancelled-email';");
    }).then(function () {
      return queryInterface.sequelize.query("DELETE FROM templates WHERE type = 'appointment-approved-email';");
    });
  }
};