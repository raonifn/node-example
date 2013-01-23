var http = require('http'),
	fs = require('fs'),
	sys = require('sys'),
	wsServer = require('ws').Server;

var server = http.createServer(function(request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/html'
	});

	var rs = fs.createReadStream(__dirname + '/template.html');
	sys.pump(rs, response);
});

var clients = [];


var wss = new wsServer({port: 8080});
wss.on('connection', function(ws) {
	clients.push(ws);
    
    ws.on('message', function(message) {
        clients.forEach(function(client) {
        	client.send(message);
        });
    });

    ws.on('close', function() {
    	var pos = clients.indexOf(ws);
    	if (pos >= 0) {
    		clients.splice(pos, 1);
    	}
    });
    
    ws.send('Welcome to my server!');
});
server.listen(4000);