'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('VerificationTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: { model: "users", key: "id" }
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function () {
      //   console.log('created VerificationToken table');
      //   return queryInterface.sequelize.query(`
      //   CREATE FUNCTION expire_table_delete_old_rows() RETURNS trigger
      //   LANGUAGE plpgsql
      //   AS $$
      //   BEGIN
      //    DELETE FROM VerificationTokens WHERE createdAt < NOW() - INTERVAL '1 day';
      //   RETURN NEW;
      //   END;
      //  $$;

      // CREATE TRIGGER expire_table_delete_old_rows_trigger
      //   AFTER INSERT ON VerificationTokens
      // EXECUTE PROCEDURE expire_table_delete_old_rows();`)
    }).then(function () {
      console.log('expireToken event created');
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('VerificationTokens').then(function () {
      console.log('VericationTokens table dropped');
      return queryInterface.sequelize.query('DROP EVENT IF EXISTS  expireToken');
    }).then(function () {
      console.log('expireToken event dropped');
    });
  }
};