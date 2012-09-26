var http = require('http');
var director = require('director');
var Mongo = require('../lib/mongodb').Mongo;

var dbName = process.env['MONGO_NODE_DRIVER_DB'];
var host = process.env['MONGO_NODE_DRIVER_HOST'];
var port = process.env['MONGO_NODE_DRIVER_PORT'];

var mongo = new Mongo(host, port, dbName);

var count = function(name, route) {
  mongo.count(name, function(err, count) {
    if (err) {
        route.res.emit('error', err);
        return;
    }
    route.res.writeHeader(200, { 'Content-Type': 'text/plain'});
    route.res.end(JSON.stringify({entity: name, count: count}));
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

mongo.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }

    server.on('close', function() {
        mongo.close(function(err) {
            if (err) {
                console.info('error closing mongo', err);
                return;
            }
            console.info('mongo closed');
        });
    });

    server.listen(9990);
});
