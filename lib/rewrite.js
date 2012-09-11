/* global require exports console JSON process */

var request = require('request');
var _ = require('lodash');

var env = process.env
var cuser = env.COUCHDB_USER
var cpass = env.COUCHDB_PASS
var chost = env.COUCHDB_HOST || '127.0.0.1'
var cport = env.COUCHDB_PORT || 5984

var couch = 'http://'+chost+':'+cport

var jar = request.jar()
var request_defaults = {'method' : 'GET'
                       ,'jar':jar
                       ,'headers' : {'content-type': 'application/json'
                                    ,'accept':'application/json'
                                    }
                       }

request = request.defaults(request_defaults);
var toQuery = require('geom_utils').toQuery

exports.rewriter = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/'+req.params.id;
    if(req.params.attachment !== undefined){
        to += '/'+req.params.attachment;
    }
    request(to).pipe(res);
}

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
        //console.log(query);
        to += "?" + toQuery(query)
    }
    //console.log(to);
    request(to).pipe(res);
}
