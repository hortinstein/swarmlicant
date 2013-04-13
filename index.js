//swarmgent//

var restify = require('restify');
var server = restify.createServer();
//server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.bodyParser());
server.post('/init', function (req, res, next) {
    console.log(req.params);
	var config = req.body;
	console.log(config);
    res.send('ok')
});


server.get('/ping', function (req, res, next) {
    res.send('pong');
});

server.get('/config', function (req, res, next) {
    //config = req.body;
	//console.log(config);
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});