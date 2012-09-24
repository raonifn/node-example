var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var dbName = process.env['MONGO_NODE_DRIVER_DB'] != null ? process.env['MONGO_NODE_DRIVER_DB'] : 'dev';
var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

console.log('Connecting to ' + host + ':' + port + '/' + dbName);
var db = new Db(dbName, new Server(host, port, {}), {native_parser:true});

var connect = function(callback) {
  db.open(callback);
};


var collect = function(collection, callback) {
  connect(function(err, conn) {
    if (err) {
        throw err;
    }
    conn.collection(collection, callback);
  });
});

exports.connect = connect;   
exports.collect = collect;   

