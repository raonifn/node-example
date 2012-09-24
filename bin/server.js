var http = require('http');
var director = require('director');

var showAuthor = function() {
    this.res.writeHeader(200, { 'Content-Type': 'text/plain'});
    this.res.end('showAuthor');
}

var onAuthor = function() {
    console.info('onAuthor');
}


var showCover = function() {
    this.res.writeHeader(200, { 'Content-Type': 'text/plain'});
    this.res.end('showCover');
}

var showPicture = function() {
    this.res.writeHeader(200, { 'Content-Type': 'text/plain'});
    this.res.end('showPicture');
}

var routes = {
  '/authors': {
    get: showAuthor,
    '/books': { on: [showCover] },
    '/bios': { on: [showPicture] }
  }
};

var router = new director.http.Router();
router.path('/entity', function() {
    this.path(/\/(.*)/, function() {
        this.get(function(val) {
            this.res.writeHeader(200, { 'Content-Type': 'text/plain'});
            this.res.end(val);
        });
    });
    this.get(showAuthor);
});

var server = http.createServer(function(req, res) {
    router.dispatch(req, res);
});

server.listen(9990);
