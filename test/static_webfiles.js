//test the webfiles server

/* global require console process it describe after before */

var should = require('should')

var superagent = require('superagent')
var http = require('http')

var tracker = require('../.').tracker
var express = require('express')

var env = process.env;
var testhost = env.TEST_HOST || '127.0.0.1'
var testport = env.TEST_PORT || 3000
testport += 2

var app,server

before(
    function(done){
        app = express()
              //.use(express.logger())

        tracker(app)
        server=http
               .createServer(app)
               .listen(testport,done)

    })
after(function(done){
    server.close(done)
})

describe('/tracker path',function(){
    it('should get index.html from /tracker'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+'/tracker')
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               res.text.should.match(/Detector imputation details/)
               return done()
           })

       })
    it('should get index.html from /tracker/'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+'/tracker/')
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               res.text.should.match(/Detector imputation details/)
               return done()
           })

       })
    it('should not get index.html from /trackers'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+'/trackers')
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.false
               return done()
           })

       })
    it('should get index.html from /tracker/index.html'
      ,function(done){
           superagent
           .get('http://'+ testhost +':'+testport+'/tracker/index.html')
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               res.text.should.match(/Detector imputation details/)
               return done()
           })

       })

})
