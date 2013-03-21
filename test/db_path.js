// test the db path

/* global require console process describe it */

var should = require('should')

var async = require('async')
var _ = require('lodash')
var superagent = require('superagent')
var http = require('http')

var db_service = require('../.').couchdb_rewrite_service
var express = require('express')

var env = process.env;
var testhost = env.TEST_HOST || '127.0.0.1'
var testport = env.TEST_PORT || 3000
testport += 1

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

describe('/db detectors',function(){
    describe('/db/wimdetectors',function(){
        it('should return a list of wim detectors'
          ,function(done){
               var query = {startkey:'wim.0'
                           ,endkey:'wim.Z'
                           //,limit:5
                           };

               superagent
               .get('http://'+ testhost +':'+testport+'/db/wimdetectors')
               .query(query)
               .set('accept','application/json')
               .set('followRedirect',true)
               .end(function(err,res){
                   if(err) return done(err)
                   res.ok.should.be.true
                   should.exist(res.body)
                   var c = res.body
                   c.should.have.property('rows')
                   c.rows.should.have.length(231)
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
        it('should return a list of 500 vds detectors'
          ,function(done){
               var query = {startkey:'0'
                           ,endkey:99999999
                            ,limit:500
                           };

               superagent('http://'+ testhost +':'+testport+'/db/vdsdetectors')
               .query(query)
               .set('accept','application/json')
               .set('followRedirect',true)
               .end(function(err,res){
                   if(err) return done(err)
                   res.ok.should.be.true
                   should.exist(res.body)
                   var c = res.body
                   c.should.have.property('rows')
                   c.rows.should.have.length(500)
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
    describe('/db/vdsdetectors',function(){
        it('should return a list of all vds detectors'
          ,function(done){
               var query = {startkey:'0'
                           ,endkey:99999999
                            //,limit:500
                           };

               superagent('http://'+ testhost +':'+testport+'/db/vdsdetectors')
               .query(query)
               .set('accept','application/json')
               .set('followRedirect',true)
               .end(function(err,res){
                   if(err) return done(err)
                   res.ok.should.be.true
                   should.exist(res.body)
                   var c = res.body
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
        .query({'startkey':JSON.stringify([12])
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
