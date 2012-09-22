var http = require('http');
var http = require('http');

var router = new director.http.Router();

var server = http.createServer(router.dispatch(req, res));

server.listen(9990);
