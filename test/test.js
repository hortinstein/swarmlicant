var should = require('should');

var request = require('request');
//var swarmgent = require('../index.js');
var trove_config = require('./test_configs/trove_config.json');
var curator_config = require('./test_configs/curator_config.json');

describe("swarmlicant tests: curator", function() {
	var swarmgent = require('../index.js');
	before(function(done) { //timeout function to allow for droplet init
		console.log('\ntest timeout to allow curator creation\n');
		this.timeout(2000);
		setTimeout(done, 1010);
	});

	it('should be able to recieve the curator configuration file', function(done) {
		request.post({
			json: true,
			url: 'http://0.0.0.0:8080/init'
		}, function(e, r, o) {
			o.status.should.equal("ok");
			o.type.should.equal("curator");
			done();
		}).form(curator_config);

	});

	it('should be able to ping the server', function(done) {
		request('http://0.0.0.0:8080/ping', function(e, r, o) {
			o.should.equal("\"pong\"");
			done();
		});
	});

})

describe("swarmlicant tests: trove", function() {
	var swarmgent = require('../index.js');
	before(function(done) { //timeout function to allow for droplet init
		console.log('\ntest timeout to allow trove creation\n');
		this.timeout(2000);
		setTimeout(done, 1010);
	});

	it('should be able to recieve the trove configuration file', function(done) {
		request.post({
			json: true,
			url: 'http://0.0.0.0:8080/init'
		}, function(e, r, o) {
			o.status.should.equal("ok");
			o.type.should.equal("trove");
			done();
		}).form(trove_config);

	});

	it('should be able to ping the server', function(done) {
		request('http://0.0.0.0:8080/ping', function(e, r, o) {
			o.should.equal('\"pong\"');
			done();
		});
	});

	it('should be able to request the server log', function(done) {
		this.timeout(5000);
		request('http://0.0.0.0:8080/log', function(e, r, o) {
			done();
		});
	});

})