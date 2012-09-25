var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var dbName = process.env['MONGO_NODE_DRIVER_DB'] != null ? process.env['MONGO_NODE_DRIVER_DB'] : 'dev';
var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

console.log('Connecting to ' + host + ':' + port + '/' + dbName);
var db = new Db(dbName, new Server(host, port, {auto_reconnect: true, poolSize: 5}), {native_parser:false });

var connect = function(callback) {
  db.open(function(err, conn) {
    try {
      console.info('calling callback');
      callback(err, conn);
      console.info('done');
    } finally {
      db.close();
    }
  });
};


var collect = function(collection, callback) {
  connect(function(err, conn) {
    if (err) {
        callback(err);
        return;
    }
    conn.collection(collection, callback);
  });
};

var count = function(collname, callback, filter) {
   collect(collname, function(err, collection) {
     if (err) {
        callback(err);
        return;
     }
     if (!filter) {
        filter = {};
     }
     collection.count(filter, callback);
   });
}

exports.connect = connect;   
exports.collect = collect;   
exports.count = count;
