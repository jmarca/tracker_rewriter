// test the db path

/* global require console process describe it */

var should = require('should')

var async = require('async')
var _ = require('underscore')
var request = require('request')
var superagent = require('superagent')
var http = require('http')

var db_service = require('../lib/rewrite_service').couchdb_rewrite_service
var express = require('express')

var env = process.env;
var testhost = env.TEST_HOST || '127.0.0.1'
var testport = env.TEST_PORT || 3000


var app,server

before(
    function(done){
        app = express()
        db_service(app)
        server=http
               .createServer(app)
               .listen(testport,done)

    })
after(function(done){
    server.close(done)
})

var qs = require('querystring')

describe('/db detectors',function(){
    describe('/db/wimdetectors',function(){
        it('should return a list of wim detectors'
          ,function(done){
               var query = {startkey:'wim.0'
                           ,endkey:'wim.Z'
                           //,limit:5
                           };

               request({'url':'http://'+ testhost +':'+testport+'/db/wimdetectors?'
                             +qs.stringify(query)
                       ,'headers':{'accept':'application/json'}
                       ,'followRedirect':true}
                      ,function(e,r,b){
                           if(e) return done(e)
                           r.statusCode.should.equal(200)
                           should.exist(b)
                           var c = JSON.parse(b)
                           c.should.have.property('rows')
                           c.rows.should.have.length(220)
                           _.each(c.rows
                                 ,function(row){
                                      row.should.have.property('id')
                                      row.should.have.property('key')
                                      row.should.have.property('value')
                                      row.value.should.have.property('rev')
                                      row.id.should.match(/^wim\.\d+/)
                                  })
                           return done()
                       })
           })
    })
    describe('/db/vdsdetectors',function(){
        it('should return a list of vds detectors'
          ,function(done){
               var query = {startkey:'0'
                           ,endkey:99999999
                           //,limit:5
                           };

               request({'url':'http://'+ testhost +':'+testport+'/db/vdsdetectors?'
                             +qs.stringify(query)
                       ,'headers':{'accept':'application/json'}
                       ,'followRedirect':true}
                      ,function(e,r,b){
                           if(e) return done(e)
                           r.statusCode.should.equal(200)
                           should.exist(b)
                           var c = JSON.parse(b)
                           c.should.have.property('rows')
                           c.rows.should.have.length(7236)
                           //console.log(c.rows.length)
                           _.each(c.rows
                                 ,function(row){
                                      row.should.have.property('id')
                                      row.id.should.match(/^\d{6,7}/)
                                      row.should.have.property('key')
                                      row.should.have.property('value',null)

                                  })
                           return done()
                       })
           })
    })
    describe('/db/highwaydetectors',function(){
        it('should list highway detectors, mixing vds and wim, mainline only'
          ,function(done){

        superagent
        .get('http://'+ testhost +':'+testport+'/db/highwaydetectors')
        .send({'startkey':JSON.stringify([12])
              ,'endkey':JSON.stringify([12,"Z"])
              ,'reduce':false})
        .set('Accept', 'application/json')
        .end(function(res){
            res.ok.should.be.true
            var c = res.body
            c.should.have.property('rows')
            c .rows.should.have.length(958)
            // console.log(c.rows.length)
            _.each(c.rows
                  ,function(row){
                       row.should.have.property('id')
                       row.id.should.match(/^\d{6,7}/)
                       row.should.have.property('key')
                       row.should.have.property('value')

                   })
                return done()
        })
           })
    })

})


describe('/db/ specifics',function(){

    describe('/db/wim/:id', function() {
    })
})