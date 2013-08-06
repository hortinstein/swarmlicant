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
	log.log("trove initialized");
	swarmlicant_obj = require('trove');
};

var register_handlers = function(swarmlicant_obj) {
	swarmlicant_obj.on('error', function(error) {
		log.error(error);
	});
	swarmlicant_obj.on('log', function(log) {
		log.info(log);
	});
	// swarmlicant_obj.on('metric',function (metric) {

	// });
}

server.post('/init', function(req, res, next) {
	log.info('/init requested by' + req.connection.remoteAddress );
	var config = req.body;
	start_swarmlicant(config);
	//registers the handlers for the swarmlicant objects
	register_handlers(swarmlicant_obj);
	res.send({
		asd: 'asda',
		status: 'ok',
		type: config.type
	});
});

server.get('/ping', function(req, res, next) {
	swarmlicant_obj.ping(function(e, o) {
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
	console.log('sasdfasfkjasdjkfasklj;')
	log.info('logs requested by ' + req.connection.remoteAddress );
	log.query({}, function(e, r) {
		if (e) {
			throw e;
		}
		res.send(r);
	});
});


var start_swarmlicant = function(config) {
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
				log.info('previous config detected');
				fs.readFile('config.json', function(err, data) {
					log.info(data)
					if (err) throw err;
					start_swarmlicant(data);
				});
			} else {
				log.info('swarmlicant not configured awaiting config file');
			}

		})
	} catch (e) {
		log.error('while trying to write swarm configuration: ' + e);
	}

}


server.listen(8080, function() {
	log.info(server.name + " listening at " + server.url);
});