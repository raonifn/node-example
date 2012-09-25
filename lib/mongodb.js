var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var dbName = process.env['MONGO_NODE_DRIVER_DB'] != null ? process.env['MONGO_NODE_DRIVER_DB'] : 'dev';
var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

console.log('Connecting to ' + host + ':' + port + '/' + dbName);
//var db = new Db(dbName, new Server(host, port, {auto_reconnect: true, poolSize: 5}), {native_parser:false });
var db = new Db(dbName, new Server(host, port, {}), {native_parser:false });

var connect = function(callback) {
  db.open(function(err, conn) {
    try {
      callback(err, conn);
    } finally {
      db.close();
    }
  });
};


var collection = function(collection, callback) {
  connect(function(err, conn) {
    if (err) {
        callback(err);
        return;
    }
    conn.collection(collection, callback);
  });
};

var count = function(collname, callback, filter) {
   collection(collname, function(err, collection) {
     if (err) {
        callback(err);
        return;
     }
     console.info('lets count', collname, filter);
     collection.insert({a:1}, function(err) {
     console.info('inserted' );
     collection.count(function(err, value) {
        console.info('counted', value, err);
        if (err) {
            callback(err);
            return;
        }
        callback(null, value);
     });});
   });
}

exports.connection = connection;
exports.collect = collect;   
exports.count = count;
