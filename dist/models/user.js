'use strict';

var _cryptPassword = require('../services/crypt-services/crypt-password');

var _cryptPassword2 = _interopRequireDefault(_cryptPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var user = null;
  user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: {
        args: true,
        msg: "value_already_used"
      },
      validate: {
        len: {
          args: [1, 64],
          msg: "value_outside_range"
        },
        notEmpty: {
          args: true,
          msg: "value_not_empty"
        },
        isValidUsername: function isValidUsername(value) {
          var re = /^[a-zA-Z0-9_.-]*$/;
          if (!re.test(value)) {
            throw new Error('invalid_field');
          };
        }
      }
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: true,
      validate: {
        len: {
          args: [1, 64],
          msg: "value_outside_range"
        },
        notEmpty: {
          args: true,
          msg: "value_not_empty"
        },
        isValidName: function isValidName(value) {
          var re = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,50}$/;
          if (!re.test(value)) {
            throw new Error('invalid_field');
          };
        }
      }
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: true,
      validate: {
        len: {
          args: [1, 64],
          msg: "value_outside_range"
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING(64),
      field: 'email_address',
      unique: {
        args: true,
        msg: "value_already_used"
      },
      allowNull: false,
      validate: {
        len: {
          args: [1, 64],
          msg: "value_outside_range"
        },
        notEmpty: {
          args: true,
          msg: "value_not_empty"
        },
        isEmail: {
          args: true,
          msg: "invalid_field"
        }
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      validate: {
        len: {
          args: [6, 64],
          msg: "value_outside_range"
        }
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [1, 1024],
          msg: "value_outside_range"
        }
      }
    },
    goals: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [1, 1024],
          msg: "value_outside_range"
        }
      }
    },
    profilePicture: {
      type: DataTypes.STRING(512),
      field: 'profile_picture',
      defaultValue: null,
      allowNull: true,
      validate: {
        isUrl: {
          args: true,
          msg: "invalid_field"
        },
        len: {
          args: [1, 512],
          msg: "value_outside_range"
        }
      }
    },
    coverPicture: {
      type: DataTypes.STRING(512),
      field: 'cover_picture',
      defaultValue: null,
      allowNull: true,
      validate: {
        isUrl: {
          args: true,
          msg: "invalid_field"
        },
        len: {
          args: [1, 512],
          msg: "value_outside_range"
        }
      }
    },
    braintreeCustomerId: {
      type: DataTypes.STRING,
      field: "braintree_customer_id",
      allowNull: true
    },
    braintreePaymentMethodToken: {
      type: DataTypes.STRING,
      field: "braintree_payment_method_token",
      allowNull: true
    },
    isAdmin: {
      field: 'is_admin',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isBanned: {
      field: 'is_banned',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isDeleted: {
      field: 'is_deleted',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    facebookId: {
      type: DataTypes.STRING,
      field: 'facebook_id',
      allowNull: true,
      defaultValue: null,
      unique: {
        args: true,
        msg: "value_already_used"
      }
    },
    instagramId: {
      type: DataTypes.STRING,
      field: 'instagram_id',
      allowNull: true,
      defaultValue: null,
      unique: {
        args: true,
        msg: "value_already_used"
      }
    },
    linkedinId: {
      type: DataTypes.STRING,
      field: 'linkedin_id',
      allowNull: true,
      defaultValue: null,
      unique: {
        args: true,
        msg: "value_already_used"
      }
    },
    firebaseToken: {
      type: DataTypes.STRING,
      field: 'firebase_token',
      allowNull: true,
      defaultValue: null,
      unique: {
        args: true,
        msg: "value_already_used"
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'isVerified'
    },
    isAuthor: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'isAuthor'
    }
  }, {
    tableName: 'users',
    validate: {
      passwordNeeded: function passwordNeeded() {
        if (this.id) {
          return; //don't validate on update.
        }

        if (!this.linkedinId && !this.facebookId && !this.instagramId && !this.password) {
          throw new Error('');
        }
      }
    },
    hooks: {
      beforeValidate: function beforeValidate(user) {
        if (user.emailAddress) {
          user.emailAddress = user.emailAddress.toLowerCase();
        }
      },
      beforeUpdate: function beforeUpdate(user) {
        if (user.password) {
          user.password = (0, _cryptPassword2.default)(user.password);
        }
      },
      beforeCreate: function beforeCreate(user) {
        if (user.password) {
          user.password = (0, _cryptPassword2.default)(user.password);
        }
      }
    }
  });

  user.options.sensitiveFields = ['password', 'facebookId', 'instagramId', 'linkedinId', 'braintreeCustomerId', 'braintreePaymentMethodToken'];
  user.options.publicFields = ['id', 'name', 'profilePicture', 'coverPicture', 'about', 'firebaseToken'];

  user.associate = function (models) {
    user.hasMany(models.appointment, { onDelete: "cascade" });
    user.hasMany(models.notification, { onDelete: "cascade" });
    user.hasMany(models.channel, { onDelete: "cascade" });
    user.hasOne(models.coach, { onDelete: "cascade" });
    user.hasOne(models.userSetting, { onDelete: "cascade" });
    user.hasOne(models.VerificationToken, { as: 'verificationtoken', foreignKey: 'userId', foreignKeyConstraint: true });
  };
  return user;
};