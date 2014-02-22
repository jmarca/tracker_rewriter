/* global process require console __dirname */

// set options by environment variables
var env = process.env;
var this_service = env.SERVER_URL || 'localhost'
var this_service_port = env.SERVER_PORT || 8080;
var this_service_url = this_service_port == 80 ? "http://"+this_service+"/"
                     : "http://"+this_service+":"+this_service_port+"/";
var path = require('path')
var rootdir = path.normalize(__dirname)

var tracker = require('./.').tracker
var db_service = require('./.').couchdb_rewrite_service

var express = require('express')
var app = express()
app
    .use(express.logger('dev'))
   .use(express.errorHandler({ dumpExceptions: true, showStack: true }))
tracker(app)
db_service(app)

// listen on a port, and then the action begins!
app.listen(this_service_port,'0.0.0.0', function(e){
    if(e){
        // problems
        console.log('cannot start server')
        throw new Error(e)
    }
    console.log("server listening to "+this_service +" on port " + this_service_port);
    console.log('Current gid: ' + process.getgid());
    try {
        process.setgid(65533);
        console.log('New gid: ' + process.getgid());
    }
    catch (err) {
        console.log('Failed to set gid: ' + err);
    }
    console.log('Current uid: ' + process.getuid());
    try {
        process.setuid(65534);
        console.log('New uid: ' + process.getuid());
    }
    catch (err) {
        console.log('Failed to set uid: ' + err);
    }
})
