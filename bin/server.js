var http = require('http');
var

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.end('Hello'); 
});

server.listen(9990);
