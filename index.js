nanode 	= require("./nanode_lib/nanode.js");
curator = require("./curator_lib/curator.js");

//swarmgent//

var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));
server.post('/init', function (req, res, next) {
	config = req.body;
	console.log(config);
});

server.listen(8080, function() {
  //console.log('%s listening at %s', server.name, server.url);\
});