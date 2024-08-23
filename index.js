const express = require('express');
const app = express();
const winston = require('winston');
require('./startup/logging')();
require('./startup/rautes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT
app.listen(port, () => {
   // winston.info('name:',process.env.NAME);
    winston.info(`${port} - portni eshitishni boshladim...`);
})