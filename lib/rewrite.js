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

// Encode only key, startkey and endkey as JSON
var toQuery = function(query) {
  for (var k in query) {
    if (['key', 'startkey', 'endkey'].indexOf(k) != -1) {
        if(! isNaN(query[k]) ) query[k] -= 0.0;
        query[k] = JSON.stringify(query[k]);
    } else {
      query[k] = String(query[k]);
    }
  }
  return querystring.stringify(query);
};

exports.wimdetectors = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/_all_docs';
    var query = req.query
    if(query)
        to += "?" + toQuery(query)
    request(to).pipe(res);
}
exports.vdsdetectors = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/_design/vdsml/_view/mainline';
    var query = req.query
    if(query)
        to += "?" + toQuery(query)
    request(to).pipe(res);
}
