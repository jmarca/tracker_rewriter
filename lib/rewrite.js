/* global require exports console JSON process */

//var request = require('request');
var superagent = require('superagent')
var _ = require('lodash');

var env = process.env
var cuser = env.COUCHDB_USER
var cpass = env.COUCHDB_PASS
var chost = env.COUCHDB_HOST || '127.0.0.1'
var cport = env.COUCHDB_PORT || 5984

var couch = 'http://'+chost+':'+cport

var toQuery = require('couchdb_toQuery')

exports.rewriter = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/'+req.params.id;
    if(req.params.attachment !== undefined){
        to += '/'+req.params.attachment;
    }
    superagent.get(to)
    .parse(make_piper(res))
    .end()
    //request(to).pipe(res);
    return null
}

function make_piper(resp){
    return function nullparser(r, fn){
        r.pipe(resp)
        r.on('end', function(a,b){
            resp.end()
            fn(a,b)
        })
    }
}


exports.wimdetectors = function(req,res,next){
    res.setHeader("Content-Type", "application/json");
    var to = couch + '/vdsdata%2ftracking/_all_docs';
    var query = req.query
    if(query)
        to += "?" + toQuery(query)
    //console.log('pipe wimdetectors '+ to)
    superagent.get(to)
    .parse(make_piper(res))
    .end()
    return null
}
exports.vdsdetectors = function(req,res,next){
    res.setHeader("Content-Type", "application/json");
    var to = couch + '/vdsdata%2ftracking/_design/vdsml/_view/mainline';
    // fix up startkey, endkey, key to be numbers
    // because for VDS detectors, they have to be numerical
    var query = req.query
    _.each(query,function(v,k){
        if (['key', 'startkey', 'endkey'].indexOf(k) != -1) {
            query[k]=+v
        }
        return null
    });
    if(query)
        to += "?" + toQuery(query)
    //console.log('pipe vdsdetectors '+ to)
    superagent.get(to)
    .parse(make_piper(res))
    .end()
    return null
}
exports.highway_detectors = function(req,res,next){
    res.setHeader("Content-Type", "application/json");
    var to = couch + '/vdsdata%2ftracking/_design/alignment/_view/district_highway_ml'
    var query = req.query
    if(query){
        _.each(query,function(v,k){
            query[k]=JSON.parse(v);
        })
        //console.log(query);
        to += "?" + toQuery(query)
    }
    console.log(to);
    superagent.get(to)
    .parse(make_piper(res))
    .end()
    //request(to).pipe(res);
    return null
}
