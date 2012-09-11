var rewriter =  require('./lib/rewrite')
exports.wimdetectors = rewriter.wimdetectors
exports.vdsdetectors = rewriter.vdsdetectors
exports.highway_detectors = rewriter.highway_detectors
exports.couchdb_rewrite_service = require('./lib/rewrite_service').couchdb_rewrite_service
var geoservices = require('./lib/geocouch_rewriter')
exports.geoservice = geoservices.geoservice
exports.geoservices = geoservices.geoservices

