//swarmgent//

var log = require('./log/log.js'); //winston configuration
var config = '';
var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser({
	mapParams: false
}));

var swarmlicant_obj = '';

//when swarmlicant is identified as a curator 
var curator = function(config) {
	//firewall configuration could be done here
	log.info("curator initialized");
    swarmlicant_obj = require('curator');
};

//when swarmlicant is identified as a trove 
var trove = function(config) {
	//firewall configuration could be done here
	log.info("trove initialized");
    swarmlicant_obj = require('trove');
};

var register_handlers = function(swarmlicant_obj){
    swarmlicant_obj.on('error',function (error) {
        
    });
    swarmlicant_obj.on('log',function (error) {
        
    });
    swarmlicant_obj.on('metric',function (error) {
        
    });
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
    register_handlers(swarmlicant_obj);
	res.send({
		status: 'ok',
		type: config.type
	});
});

server.post('/config', function(req, res, next) {
	//validation should be used here
	var config = req.body;
	switch (config.type) {
		case "curator":
			curator(config);
			break;
		case "trove":
			trove(config);
			break;
	}
	res.send({
		status: 'ok',
		type: config.type
	});
});

server.get('/ping', function(req, res, next) {
	res.send('pong');
});

server.get('/config', function(req, res, next) {
	var config = req.body;

});

server.get('/update', function(req, res, next) {
	var config = req.body;
	console.log(config);
});
server.get('/status', function(req, res, next) {
	res.send('this should display uptime info, type, load, versions etc');

});
server.get('/log', function(req, res, next) {});
server.listen(8080, function() {
	log.info(server.name + " listening at " + server.url);
});