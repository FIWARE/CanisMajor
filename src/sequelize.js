import { Sequelize } from 'sequelize';
import { DB_DILECT, DB_USERNAME, DB_NAME, DB_HOST, DB_PORT, DB_PASSWORD } from './configuration/config';
// create a connection
const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DILECT,
        omitNull: false
    }
);

sequelize.authenticate().then(() => {
    console.error('connected to db');
}).catch(() => {
    console.error('Unable to connect to the database');
    // terminate the program
    process.exit(1);
});
module.exports = sequelize;