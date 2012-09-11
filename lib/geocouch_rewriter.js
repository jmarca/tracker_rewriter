/* global require exports JSON process */
var  parseUrl = require('url').parse;
var  formatUrl = require('url').format;
var  sys = require('sys');

var request = require('request')
var superagent =require('superagent')
var toQuery = require('./utils').toQuery
var _ = require('lodash')

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
var cuser = env.COUCHDB_USER
var cpass = env.COUCHDB_PASS
var chost = env.COUCHDB_HOST || '127.0.0.1'
var cport = env.COUCHDB_PORT || 5984


// var jar = request.jar()
// var request_defaults = {'method' : 'GET'
//                        ,'jar':jar
//                        ,'headers' : {'content-type': 'application/json'
//                                     ,'accept':'application/json'
//                                     }
//                        }

// request = request.defaults(request_defaults);




 function geoservice(options){

    var couch = 'http://'+chost+':'+cport
    var db = options.db
    var ddoc = options.ddoc
    var view = options.view

    if(!db || !ddoc || !view){
        throw new Error('All of db, ddoc, and view must be specified in the options object')
    }
    var to = [couch,db, ensureDesignId(ddoc), '_spatial', view].join('/')

    return function(req,res,next){
        var query = req.query
        if(query)
            to += '?'+toQuery(query)
     console.log(to)
        superagent.get(to)
        .set('content-type','application/json')
        .set('accept','application/json')
        .set('Connection', 'keep-alive')
        .end(function(err,rs){
            if (err){
                console.log('borked')
                console.log(err)
                console.log(rs.body)
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
}

function geoservices(app) {
    app.get('/hv',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'hv'}))

    app.get('/ml',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'ml'}))

    app.get('/cd',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'cd'}))

    app.get('/ff',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'ff'}))

    app.get('/fr',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'fr'}))

    app.get('/or',geoservice({'db':'vdsdata%2ftracking','ddoc':'vdstype','view':'or'}))

};
exports.geoservice = geoservice
exports.geoservices=geoservices
