const express = require('express');
const app = express();
const winston = require('winston');
require('./startup/logging')();
require('./startup/rautes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT
const server = app.listen(port, () => {
   // winston.info('name:',process.env.NAME);
    winston.info(`${port} - portni eshitishni boshladim...`);
});

module.exports = server;