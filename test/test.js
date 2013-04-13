var should = require('should');

var request = require('request');
var swarmgent = require('../index.js');

it('should be able to ping the server', function (done) {
  request('http://127.8.202.129:8080/ping', function (e,r,o){
    o.should.equal("\"pong\"");
    done();
  });
});

it('should be able to recieve the curator configuration file', function (done) {
    var config = require('./test_configs/curator_config.json');
  request.post('http://127.8.202.129:8080/init',config,function(e,r,o){
    o.should.equal("\"ok\"");
    done();
  });
  
});
