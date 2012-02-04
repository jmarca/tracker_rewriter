var tako = require('tako')
  , http = require('http')
  , path = require('path')
  , _ = require('underscore')
  , rewriter = require('rewriter');


var t = tako()

var couch = "http://localhost:5984";
var rewrites = [
    {from:'/', to:'index.html'}
               , {from:"/api/couch", to: couch + "/"}
               , {from:"/api/couch/*", to: couch + "/*"}
               , {from:"/api", to: couch + "/vdsdata%2ftracking"}
               , {from:"/api/*", to: couch + "/vdsdata%2ftracking/*"}
               , {from:"/db/vds/:id", to: couch + "/vdsdata%2ftracking/:id"}
               , {from:"/db/wim/:id", to: couch + "/vdsdata%2ftracking/:id"}
               , {from:"/db/wim/:id/:attachment", to: couch + "/vdsdata%2ftracking/:id/:attachment"}
]
;

rewriter(t, rewrites, {attachments:  path.resolve(__dirname, 'attachments')
                      });
//, js: path.resolve(__dirname,'js') })
t.listen(function(handler) {
  return http.createServer(handler)
}, 9999)
