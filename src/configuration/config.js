const ENV = process.env;

const DB_NAME = ENV.DB_NAME || 'canis_major';
const DB_HOST = ENV.DB_HOST || 'localhost';
const DB_PORT = ENV.DB_PORT || '3306';
const DB_DILECT = ENV.DB_DILECT || 'mysql';
const DB_USERNAME = ENV.DB_USERNAME || 'root';
const DB_PASSWORD = ENV.DB_PASSWORD || 'root';

module.exports = {
    DB_DILECT,
    DB_USERNAME,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_PASSWORD
}