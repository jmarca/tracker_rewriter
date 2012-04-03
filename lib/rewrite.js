var request = require('request');
var _ = require('underscore');
var querystring = require('querystring');

var couch = "http://127.0.0.1:5984";

var request_defaults = { 'method' : 'GET'
                       ,'headers' : {'content-type': 'application/json'
                                    ,'accept':'application/json'
                                    }
                       };

request = request.defaults(request_defaults);

exports.rewriter = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/'+req.params.id;
    if(req.params.attachment !== undefined){
        to += '/'+req.params.attachment;
    }
    request(to).pipe(res);
}

// make sure that strings are strings, numbers are numbers when JSON encoding
function brutal_hack(v){
    if(! isNaN(v) ){
        return +v;
    }else{
        return v;
    }
}
// Encode only key, startkey and endkey as JSON
var toQuery = function(query) {
        var q={};
        _.each(query,function(v,k){
            if (['key', 'startkey', 'endkey'].indexOf(k) != -1) {
                // keys can be arrays or strings
                var vmap;
                if(_.isArray(v)){
                    vmap = _.map(v,function(value){ return brutal_hack(value); });
                }else{
                    vmap = brutal_hack(v);
                }
                q[k] = JSON.stringify(vmap);
            } else {
                q[k] = String(v);
            }
        });
        console.log(q);
        return querystring.stringify(q);
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
exports.highway_detectors = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/_design/alignment/_view/district_highway_ml'
    var query = req.query
    if(query){
        _.each(query,function(v,k){
            query[k]=JSON.parse(v);
        })
        console.log(query);
        to += "?" + toQuery(query)
    }
    console.log(to);
    request(to).pipe(res);
}
