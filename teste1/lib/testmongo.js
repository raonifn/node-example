var mongodb = require('mongodb');
var sys = require('sys');
var mongo = {host: '127.0.0.1', port: 27017, dbname: 'dev', collection: 'sessions', reapInterval: 60 * 1000};


var generate_mongo_url = function(obj){
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'test');

  if(obj.username && obj.password){
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
  else{
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);

sys.puts(mongourl);


var connect = function(callback) {
    mongodb.connect(mongourl, callback);
}

var collect = function(callback) {
    connect(function(err, conn) {
        conn.collection('ips', callback);
    });
}

collect(function(err, coll){
    /* Simple object to insert: ip address and date */
    var object_to_insert = { 'ip': '123.123', 'ts': new Date() };

    /* Insert the object then print in response */
    /* Note the _id has been created */
    coll.insert( object_to_insert, {safe:true}, function(err){
        sys.puts('done');
   });
});

collect(function(err, coll){
    coll.find({}, {limit:10, sort:[['_id','desc']]}, function(err, cursor){
        cursor.toArray(function(err, items){
            for(i=0; i<items.length;i++){
                sys.puts(JSON.stringify(items[i]) + "\n");
            }
         });
     });
});

