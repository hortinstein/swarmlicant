var winston = require('winston');

var mylog = new(winston.Logger)({
	transports: [
		new(winston.transports.Console)(),
		new(winston.transports.File)({
			filename: './log/logs/swarmlicant.log'
		})
	]
});
mylog.info('swarmlicant up, logging initiated');
module.exports = mylog;
