#!/usr/bin/env node

const http = require('http');
const config = require('../configuration/config');
const http_code = process.env.HEALTHCHECK_CODE || 200;

const options = {
  host: 'localhost',
  port: process.env.CM_PORT || config.CM_PORT,
  timeout: 2000,
  method: 'GET',
  path: process.env.HEALTHCHECK_PATH || '/version'
};

const request = http.request(options, (result) => {
  // eslint-disable-next-line no-console
  console.info(`Performed health check, result ${result.statusCode}`);
  if (result.statusCode === http_code) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error(`An error occurred while performing health check, error: ${err}`);
  process.exit(1);
});

request.end();
