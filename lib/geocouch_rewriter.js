/* global require exports JSON process */
var  parseUrl = require('url').parse;
var  formatUrl = require('url').format;
var  sys = require('sys');

var superagent =require('superagent')

var _ = require('lodash')
var geom_utils = require('geom_utils')
var toQuery = require('couchdb_toQuery')

/**
 * GeoCouch proxy server.
 *
 * Options:
 *
 *   - `db`       the database to connect to.  required
 *   - `ddoc`     the design doc to access
 *   - `geoview`  the geo couch spatial view to query in the ddoc.
 *   - `host`     defaults to 127.0.0.1
 *   - `port`     defaults to 5984
 *   - `user`     optional
 *   - `pass`     optional
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */


function ensureDesignId(id) {
    if (!id || id.match(/^_design\//)) { return id; }
    return '_design/' + id;
}

var env = process.env
var chost = env.COUCHDB_HOST || '127.0.0.1'
var cport = env.COUCHDB_PORT || 5984



function call_geocouch(to,req,res,next){

    superagent.get(to)
    .set('content-type','application/json')
    .set('accept','application/json')
    .set('Connection', 'keep-alive')
    .end(function(err,rs){
        if (err){
            return next(new Error(err));
        }
        var data = {"type":"FeatureCollection",
                    "features":[]};
        var rows = rs.body.rows
        _.each(rows
              ,function(row){
                   var stamp = row.value;
                   var feat = { "type": "Feature"
                              ,"geometry": {'type':row.type
                                           ,'geometry':row.geometry}
                              ,"properties": {'id':row.id
                                             ,'stamp':stamp}
                              }
                   data.features.push(feat);
               })
            res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
        return null
    })
}

function geoservice(options){

    var couch = 'http://'+chost+':'+cport
    var db = options.db
    var ddoc = options.ddoc
    var view = options.view

    if(!db || !ddoc || !view){
        throw new Error('All of db, ddoc, and view must be specified in the options object')
    }
    var to = [couch,db, ensureDesignId(ddoc), '_spatial', view].join('/')
    var allowed_query_params = ['bbox','limit']
    return function(req,res,next){
        var url = to
        var qk = _.keys(req.query)
        var ok_keys = _.intersection(qk,allowed_query_params)

        if(ok_keys){
            var query={}
            _.each(ok_keys
                  ,function(k){
                       query[k]=req.query[k]
                       return null
                   });
            url += '?'+ toQuery(query)
        }
        return call_geocouch(url,req,res,next)
    }
}
function geoservice_xyz(options){

    var couch = 'http://'+chost+':'+cport
    var db = options.db
    var ddoc = options.ddoc
    var view = options.view

    if(!db || !ddoc || !view){
        throw new Error('All of db, ddoc, and view must be specified in the options object')
    }
    var to = [couch,db, ensureDesignId(ddoc), '_spatial', view].join('/')

    return function(req,res,next){
        var bbox = geom_utils.bbox_from_xyz({row: req.param('row')
                                            ,column: req.param('column')
                                            ,zoom: req.param('zoom')})
        var url = to +'?'+ 'bbox='+bbox
        //console.log(url)
        return call_geocouch(url,req,res,next)
    }
}

function geoservices(app) {
    app.get('/hv/:zoom/:column/:row.json',geoservice_xyz({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'hv'}))

    app.get('/ml/:zoom/:column/:row.json'
           ,geoservice_xyz({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'ml'}))

    app.get('/cd/:zoom/:column/:row.json',geoservice_xyz({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'cd'}))

    app.get('/ff/:zoom/:column/:row.json',geoservice_xyz({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'ff'}))

    app.get('/fr/:zoom/:column/:row.json',geoservice_xyz({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'fr'}))

    app.get('/or/:zoom/:column/:row.json',geoservice_xyz({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'or'}))

    // now with bbox expected, not zoom,col,row

    app.get('/hv',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'hv'}))

    app.get('/ml',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'ml'}))

    app.get('/cd',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'cd'}))

    app.get('/ff',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'ff'}))

    app.get('/fr',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'fr'}))

    app.get('/or',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'or'}))


};
exports.geoservice = geoservice
exports.geoservices=geoservices
