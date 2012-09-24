var http = require('http');
var director = require('director');
var mongo = require('../lib/mongodb');

var collect = function(name) {
  mongo.collect(name, function(err, collection) {    
    collection.count({}, function(err, value) {
      this.res.writeHeader(200, { 'Content-Type': 'text/plain'});
      this.res.end(JSON.stringify({entity: name, count: value}));
    });
  });
};

var router = new director.http.Router();
router.path('/entity', function() {
  this.path(/\/(.*)/, function() {
    this.get(collect);
  }); 
});

var server = http.createServer(function(req, res) {
  try {
    router.dispatch(req, res);
  } catch (err) {
    this.res.writeHeader(500, { 'Content-Type': 'text/plain'});
    this.res.end(JSON.stringify({error: err}));
  }
});

server.listen(9990);
