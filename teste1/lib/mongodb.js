var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var Mongo = function(host, port, dbName) {
   host = host != null ? host : 'localhost';
   port = port != null ? port : Connection.DEFAULT_PORT;
   dbName = dbName != null ? dbName : 'dev'; 
   this.db = new Db(dbName, new Server(host, port, {auto_reconnect: true, poolSize: 5}), {native_parser:false });
}

Mongo.prototype.connect = function(callback) {
  this.db.open(function(err, db) {
    if (err) {
        return callback(err);
    }
    this.db = db;
    callback(null);
  });
};

Mongo.prototype.close = function(callback) {
  this.db.close(callback);
};

Mongo.prototype.insert = function(collname, element, callback) {
    this.db.collection(collname, function(err, collection) {
        if (err) {
            return callback(err);
        }
        collection.insert(element, callback);
    });
}

Mongo.prototype.count = function(collname, callback, filter) {
   this.db.collection(collname, function(err, collection) {
     if (err) {
        callback(err);
        return;
     }
     collection.count(callback);
   });
}

exports.Mongo = Mongo;
