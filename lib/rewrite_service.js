var rewrite = require('./rewrite')
var rewriter = rewrite.rewriter;
var vdsdetectors = rewrite.vdsdetectors;
var wimdetectors = rewrite.wimdetectors;
var highwaydetectors = rewrite.highway_detectors;


// services for displaying the vdsdata/tracking couchdb
// all of these are pass through, in that they pass long query
// arguments to couchdb

exports.couchdb_rewrite_service = function db(app){
    app.get('/db/wim/:id/:attachment?'
           ,rewriter);
    app.get('/db/wimdetectors'
           ,wimdetectors);
    app.get('/db/vds/:id/:attachment?'
           ,rewriter);
    app.get('/db/vdsdetectors'
           ,vdsdetectors);
    app.get('/db/highwaydetectors'
           ,highwaydetectors);
}
