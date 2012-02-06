var request = require('request');
var _ = require('underscore');
var querystring = require('querystring');

var couch = "http://127.0.0.1:5984";
exports.rewriter = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/'+req.params.id;
    if(req.params.attachment !== undefined){
        to += '/'+req.params.attachment;
    }
    console.log(to)
    request(to).pipe(res);
}
exports.detectors = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/_all_docs';
    var query = _.extend({}, rewrite.query)
    if (req.query) _.extend(query, req.query)
    if (req.route.params) to = resolveSymbols(to, req.route.params, query)
    if (query.key) query.key = JSON.stringify(query.key)
    if (query.startkey) query.startkey = JSON.stringify(query.startkey)
    if (query.endkey) query.endkey = JSON.stringify(query.endkey)
    if (_.keys(query).length) to += "?" + querystring.stringify(query)
    console.log(to)
    request(to).pipe(res);
}
