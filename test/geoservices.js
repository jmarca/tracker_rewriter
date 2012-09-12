// test the db path

/* global require console process describe it */

var should = require('should')

var async = require('async')
var _ = require('lodash')
var superagent = require('superagent')
var http = require('http')

var geo_services = require('../.').geoservices
var express = require('express')

var env = process.env;
var testhost = env.TEST_HOST || '127.0.0.1'
var testport = env.TEST_PORT || 3000

var app,server

var z = 10
var c = 176
var r = 409

before(
    function(done){
        app = express()
        geo_services(app)
        server=http
               .createServer(app)
               .listen(testport,done)

    })
after(function(done){
    server.close(done)
})

var qs = require('querystring')

describe('/ml detectors',function(){
    it('should return a list of mainline detectors in a bbox'
      ,function(done){
           var query = {bbox:'-118,32,-117,33'
                       ,limit:10
                       };

           superagent
           .get('http://'+ testhost +':'+testport+'/ml')
           .query(query)
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.be.below(11)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
    it('should return a list of mainline detectors in a bbox'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+['/ml',z,c,r+'.json'].join('/'))
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.equal(550)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
})

describe('/hv detectors',function(){
    it('should return a list of mainline detectors in a bbox'
      ,function(done){
           var query = {bbox:'-118,32,-117,33'
                       ,limit:10
                       };

           superagent
           .get('http://'+ testhost +':'+testport+'/hv')
           .query(query)
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.be.below(11)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
    it('should return a list of hov detectors in a bbox'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+['/hv',z,c,r+'.json'].join('/'))
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.equal(438)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
})

describe('/cd detectors',function(){
    it('should return a list of mainline detectors in a bbox'
      ,function(done){
           var query = {bbox:'-118,32,-117,33'
                       ,limit:10
                       };

           superagent
           .get('http://'+ testhost +':'+testport+'/cd')
           .query(query)
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.be.below(11)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
    it('should return a list of collector/distributor detectors in a bbox'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+['/cd',z,c,r+'.json'].join('/'))
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.equal(11)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
})

describe('/ff detectors',function(){
    it('should return a list of mainline detectors in a bbox'
      ,function(done){
           var query = {bbox:'-118,32,-117,33'
                       ,limit:10
                       };

           superagent
           .get('http://'+ testhost +':'+testport+'/ff')
           .query(query)
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.be.below(11)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
    it('should return a list of freeway to freeway detectors in a bbox'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+['/ff',z,c,r+'.json'].join('/'))
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.equal(107)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
})

describe('/fr detectors',function(){
    it('should return a list of mainline detectors in a bbox'
      ,function(done){
           var query = {bbox:'-118,32,-117,33'
                       ,limit:10
                       };

           superagent
           .get('http://'+ testhost +':'+testport+'/fr')
           .query(query)
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.be.below(11)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
    it('should return a list of off ramp detectors in a bbox'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+['/fr',z,c,r+'.json'].join('/'))
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.equal(229)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
})

describe('/or detectors',function(){
    it('should return a list of mainline detectors in a bbox'
      ,function(done){
           var query = {bbox:'-118,32,-117,33'
                       ,limit:10
                       };

           superagent
           .get('http://'+ testhost +':'+testport+'/or')
           .query(query)
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.be.below(11)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
    it('should return a list of onramp detectors in a bbox'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+['/or',z,c,r+'.json'].join('/'))
           .set('accept','application/json')
           .set('followRedirect',true)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               should.exist(res.body)
               var c = res.body
               c.should.have.property('features')
               c.features.length.should.equal(289)
               _.each(c.features
                     ,function(row){
                          row.should.have.property('type')
                          row.should.have.property('geometry')
                          row.should.have.property('properties')
                          row.properties.should.have.property('id')
                          row.properties.id.should.match(/^\d{6,7}$/)
                      })
                   return done()
           })
       })
})
