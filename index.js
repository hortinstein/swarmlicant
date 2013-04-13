//swarmgent//

log = require('./log/log.js'); //winston configuration

var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser({
	mapParams: false
}));

//when swarmlicant is identified as a curator 
var curator = function(config) {
	log.info("curator initialized");
}

//when swarmlicant is identified as a trove 
var trove = function(config) {
	log.info("trove initialized");
}

server.post('/init', function(req, res, next) {
	var config = req.body;
	switch (config.type) {
		case "curator":
			curator(config);
			break;
		case "trove":
			trove(config);
			break;
	};
	res.send({
		status: 'ok',
		type: config.type
	});
});

server.get('/ping', function(req, res, next) {
	res.send('pong');
});

server.get('/config', function(req, res, next) {
	config = req.body;

});

server.get('/update', function(req, res, next) {
	config = req.body;
	console.log(config);
});
server.get('/status', function(req, res, next) {
	
});
server.get('/log', function(req, res, next) {
});
server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});