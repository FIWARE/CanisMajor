import { Sequelize } from 'sequelize';
import { DB_DILECT, DB_USERNAME, DB_NAME, DB_HOST, DB_PORT, DB_PASSWORD } from './configuration/config';
import { exec } from 'child_process';
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
                Sequelize.TimeoutError
                ],
            max: 5
        }
    },
);

const DBCreate = (success, error) => {
    exec('npm run create',  (err, stdout, stderr) => {
        if (err) {
            error(err);
        }
        success(stdout);
    });
}

const DBMigrate = (success, error) => {
    exec('npm run migrate',  (err, stdout, stderr) => {
        if (err) {
            error(err);
        }
        success(stdout);
    });
}

const connect = () => {
    DBCreate((success) => {
        console.log('DBCreate success :' + success);
        DBMigrate((success) => {
            console.log('DBMigrate success :' + success);
            sequelize.authenticate().then(() => {
                console.log('connected to db');
                
            }).catch(() => {
                console.error('Unable to connect to the database');
                setTimeout(authenticate, 5000);
            });
        }, (err) => {
            console.error('DBMigrate err :' + err);
        });
    }, (err) => {
        console.error('DBCreate err :' + err);
    })
}

connect();

module.exports = sequelize;