var winston = require('winston');
winston.add(winston.transports.File, { filename: './log/logs/somefile.log' });
winston.info('node up, logging initiated');
module.exports = winston;