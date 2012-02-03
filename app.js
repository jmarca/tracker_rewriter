var tako = require('tako')
  , http = require('http')
  , path = require('path')
  , rewriter = require('rewriter');


var t = tako()

var couch = "http://localhost:5984"
  , rewrites = [
      {from:"/", to:'index.html'}
    , {from:"/api/couch", to: couch + "/"}
    , {from:"/api/couch/*", to: couch + "/*"}
    , {from:"/api", to: couch + "/vdsdata%2ftracking"}
    , {from:"/api/*", to: couch + "/vdsdata%2ftracking/*"}
    , {from:"/db/vds/:id", to: couch + "/vdsdata%2ftracking/:id"}
    , {from:"/db/wim/:id", to: couch + "/vdsdata%2ftracking/wim.:id"}
    ]
  ;

rewriter(t, rewrites)

t.listen(function(handler) {
  return http.createServer(handler)
}, 9999)