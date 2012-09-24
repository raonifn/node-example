var http = require('http');
var director = require('director');

var routes = {
  '/authors': {
    on: showAuthor,
    '/books': { on: [showCover, showDescription] },
    '/bios': { on: [showPicture, showBiography] }
  }
};

var router = new director.http.Router(routes);

var server = http.createServer(router.dispatch(req, res));

server.listen(9990);
