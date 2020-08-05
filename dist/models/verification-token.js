'use strict';

module.exports = function (sequelize, DataTypes) {
    var VerificationToken = sequelize.define('VerificationToken', {
        userId: DataTypes.STRING,
        token: DataTypes.STRING
    }, {
        classMethods: {
            associate: function associate(models) {
                verificationtoken.belongsTo(models.User, {
                    as: "user",
                    foreignKey: "userId",
                    foreignKeyConstraint: true
                });
            }
        }
    });
    return VerificationToken;
};