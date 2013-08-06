//swarmgent//

var logs = require('./log/log.js'); //winston configuration
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
	logs.info("curator initialized");
	swarmlicant_obj = require('curator');
};

//when swarmlicant is identified as a trove 
var trove = function(config) {
	//firewall configuration could be done here
	logs.info("trove initialized");
	swarmlicant_obj = require('trove');
};

var register_handlers = function(swarmlicant_obj) {
	swarmlicant_obj.on('error', function(error) {
		logs.error(error);
	});
	swarmlicant_obj.on('log', function(log) {
		logs.info(log);
	});
	// swarmlicant_obj.on('metric',function (metric) {

	// });
}

server.post('/init', function(req, res, next) {
	logs.info('/init requested by ' + req.connection.remoteAddress );
	var config = req.body;
	start_swarmlicant(config);
	//registers the handlers for the swarmlicant objects
	register_handlers(swarmlicant_obj);
	res.send({
		status: 'ok',
		type: config.type
	});
});

server.get('/ping', function(req, res, next) {
	logs.info('pinged by ' + req.connection.remoteAddress );
	swarmlicant_obj.ping(function(e, o) {
		console.log("asdadadadad",e,o);
		res.send(o);
	});
});

server.get('/config', function(req, res, next) {
	var config = req.body;
});

server.get('/update', function(req, res, next) {
	var config = req.body;
	console.log(config);
});
server.get('/status', function(req, res, next) {
	swarmlicant_obj.status(function(e, o) {
		res.send(o);
	});

});
server.get('/log', function(req, res, next) {
	logs.info('logs requested by ' + req.connection.remoteAddress );
	logs.query({}, function(e, r) {
		if (e) {
			throw e;
		}
		res.send(r);
	});
});


var start_swarmlicant = function(config) {
	logs.info('start_swarmlicant called with for: '+ config.type);
	switch (config.type) {
		case "curator":
			curator(config);
			break;
		case "trove":
			trove(config);
			break;
	};
}
var check_config = function(callback) {
	var fs = require('fs');
	try {
		fs.exists('config.json', function(exists) {
			if (exists) {
				logs.info('previous config detected');
				fs.readFile('config.json', function(err, data) {
					logs.info(data)
					if (err) throw err;
					start_swarmlicant(data);
				});
			} else {
				logs.info('swarmlicant not configured awaiting config file');
			}

		})
	} catch (e) {
		logs.error('while trying to write swarm configuration: ' + e);
	}

}


server.listen(8080, function(e,r) {
	if (e) throw err;
	log.info('swarmlicant up, logging initiated, %s listening at %s', server.name, server.url);
});