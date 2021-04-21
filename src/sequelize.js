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
        omitNull: false,
        retry: {
            match: [
                Sequelize.ConnectionError,
                Sequelize.ConnectionTimedOutError,
                Sequelize.TimeoutError,
                /Deadlock/i,
                'SQLITE_BUSY'],
            max: 3
        }
    },
);

const authenticate = () => {
    sequelize.authenticate().then(() => {
        console.error('connected to db');
    }).catch(() => {
        console.error('Unable to connect to the database');
        setTimeout(authenticate, 5000);
    });
}
authenticate();

module.exports = sequelize;