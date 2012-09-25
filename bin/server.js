var http = require('http');
var director = require('director');
var mongo = require('../lib/mongodb');

var count = function(name, route) {
  console.info('count ' + name);
  mongo.count(name, function(err, value) {    
    if (err) {
        throw err;
    }
    route.res.writeHeader(200, { 'Content-Type': 'text/plain'});
    route.res.end(JSON.stringify({entity: name, count: value}));
  });
};

var router = new director.http.Router();

router.get('/', function() {
    this.res.writeHeader(200, { 'Content-Type': 'text/plain'});
    this.res.end(JSON.stringify({status: 'online'}));
});

router.get('/fail', function() {
    this.res.emit('error', {err:'erro'});
});

router.path('/entity', function() {
  this.path(/\/(\w*)/, function() {
    this.get(function(name){
        count(name, this);
    });
  }); 
});

var server = http.createServer(function(req, res) {
  res.on('error', function(err) {
      res.writeHeader(500, { 'Content-Type': 'text/plain'});
      res.end(JSON.stringify({error: err}));
  });
  router.dispatch(req, res, function (err) {
      res.writeHeader(err.status, { 'Content-Type': 'text/plain'});
      res.end(JSON.stringify(err));
  });
});

server.listen(9990);
