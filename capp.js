var connect = require('connect');
var request = require('request');
var path = require('path');
var filed = require('filed');
var rewriter = require('./lib/rewrite.js').rewriter;

var RedisStore = require('connect-redis')(connect);

var server = connect.createServer(
    connect.logger()
    ,connect.favicon(__dirname + '/public/favicon.ico')
    ,connect.bodyParser()
    ,connect.cookieParser()
    ,connect.session({ store: new RedisStore   //RedisStore or MemoryStore
                       , secret: '2pz.sdfv354t' })
    ,connect.router(vds)
    ,connect.router(wim)
    ,connect.router(files)
    ,connect.errorHandler({ dumpExceptions: true, showStack: true })
);

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
    app.get('/'
            ,connect.static(__dirname+"/attachments")
           );
    app.get(/\/(css|js)\/.*/
            ,connect.static(__dirname+"/attachments")
           );

}

function wim(app){
    app.get('/db/wim/:id/:attachment?'
           ,rewriter);
}
function vds(app){
    app.get('/db/vds/:id/:attachment?'
           ,rewriter);
}

server.listen(3001);
console.log('Connect server listening on port 3001');
console.log('Current gid: ' + process.getgid());
