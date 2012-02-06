var connect = require('connect');
var request = require('request');
var path = require('path');
var filed = require('filed');


//var RedisStore = require('connect-redis')(connect);

var server = connect.createServer(
    connect.logger()
//    ,connect.favicon(__dirname + '/public/favicon.ico')
//    ,connect.bodyParser()
//    ,connect.cookieParser()
//    ,connect.session({ store: new RedisStore   //RedisStore or MemoryStore
//                       , secret: '2pz.sdfv354t' })
    ,connect.router(user)
    ,connect.router(files)
    ,connect.errorHandler({ dumpExceptions: true, showStack: true })
);

var _ = require('underscore');


var couch = "http://localhost:5984";
// var rewrites = [
//     {from:'/', to:'index.html'}
//                , {from:"/api/couch", to: couch + "/"}
//                , {from:"/api/couch/*", to: couch + "/*"}
//                , {from:"/api", to: couch + "/vdsdata%2ftracking"}
//                , {from:"/api/*", to: couch + "/vdsdata%2ftracking/*"}
//                , {from:"/db/vds/:id", to: couch + "/vdsdata%2ftracking/:id"}
//                , {from:"/db/wim/:id", to: couch + "/vdsdata%2ftracking/:id"}
//                , {from:"/db/wim/:id/:attachment", to: couch + "/vdsdata%2ftracking/:id/:attachment"}
// ]
// ;

function files(app) {
    app.get('/index.html'
            ,connect.static(__dirname+"/attachments")
           );
    app.get(/\/(css|js)\/.*/
            ,connect.static(__dirname+"/attachments")
           );

}

function user(app){
    app.get('/db/wim/:id/:attachment?'
           ,function(req,res,next){
                var to = couch + '/vdsdata%2ftracking/'+req.params.id;
                if(req.params.attachment !== undefined){
                    to += '/'+req.params.attachment;
                }
                console.log(to);
                request(to).pipe(res);
            });
}

server.listen(80);
console.log('Connect server listening on port 80 on service /banner');
//server.listen(3000);
console.log('Current gid: ' + process.getgid());
try {
    process.setgid(65533);
    console.log('New gid: ' + process.getgid());
}
catch (err) {
    console.log('Failed to set gid: ' + err);
    throw(err);
}
console.log('Current uid: ' + process.getuid());
try {
    process.setuid(65534);
    console.log('New uid: ' + process.getuid());
}
catch (err) {
    console.log('Failed to set uid: ' + err);
    throw(err);
}
