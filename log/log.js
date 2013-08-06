var winston = require('winston');

var log = new(winston.Logger)({
	transports: [
		new(winston.transports.Console)(),
		new(winston.transports.File)({
			filename: './log/logs/swarmlicant.log'
		})
	]
});
log.info('swarmlicant up, logging initiated');
module.exports = log;
