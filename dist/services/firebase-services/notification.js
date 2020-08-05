"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var admin = require("firebase-admin");
var config = require("../../config/coachingapp-b851e-firebase-adminsdk-ign4h-b8fef2cdbb.json");
var serviceAccount = config;
var firebasedb = require('../../config/config.json').firebasedb;

var firebaseNotification = function () {
    function firebaseNotification() {
        _classCallCheck(this, firebaseNotification);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: firebasedb
        });
    }
    /**
     * send a notification to th device
     * @param  {String} title    notification title
     * @param  {String} message     message to be send
     * @param  {String} firebaseToken    firebase token of the device
     */


    _createClass(firebaseNotification, [{
        key: "sendMessage",
        value: function sendMessage(title, message, firebaseToken) {
            var payload = {
                notification: {
                    title: title,
                    body: message
                }
            };
            admin.messaging().sendToDevice(firebaseToken, payload);
        }
    }]);

    return firebaseNotification;
}();

exports.default = new firebaseNotification();