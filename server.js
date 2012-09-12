var director = require('director');
var http = require('http');

var router = new director.http.Router();

router.post(/.*/, function() {
    var self = this;
    
    var data = self.req.body;

    self.res.writeHead(200, {'Content-Type': 'text/plain'});
    self.res.end(data);
});

router.get(/.*/, function() {
    var self = this;

    self.res.writeHead(200, {'Content-Type': 'text/plain'});
    self.res.end("Hello World - Test 2");
});


var server = http.createServer(function (req, res) {
    router.dispatch(req, res);
});

server.listen(1337, '127.0.0.1');
