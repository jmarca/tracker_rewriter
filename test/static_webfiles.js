//test the webfiles server

/* global require console process it describe after before */

var should = require('should')

var superagent = require('superagent')
var http = require('http')
var async = require('async')
var _ = require('lodash')
var tracker = require('../.').tracker
var express = require('express')
var jsdom = require('jsdom')

var env = process.env;
var testhost = env.TEST_HOST || '127.0.0.1'
var testport = env.TEST_PORT || 3000
testport += 2

var fs = require('fs')
var path = require('path')
var rooturl = 'http://'+ testhost +':'+testport+'/tracker'
var jqueryurl =  rooturl + '/js/vendor/jquery-1.8.1.min.js'



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

    it('should get jquery from '+jqueryurl
      ,function(done){
           superagent
           .get(jqueryurl)
           .end(function(err,res){
               if(err) return done(err)
               res.ok.should.be.true
               return done()
           })

       })


    describe('js and css files',function(){
        var links = {}
        before(function(done){
            // parse the file for js and css files, then try to get them
            jsdom.env('http://'+ testhost +':'+testport+'/tracker/index.html',[jqueryurl]
                     ,function(errors,window){
                          if (errors)
                              throw new Error('bleh'+errors)
                          // inspect window
                          var jq = window.jQuery
                          var jslinks = jq('script')
                          var csslinks=jq('link[rel="stylesheet"]')
                          async.parallel([function(cb){
                                              async.forEach(jslinks,
                                                            function(link,cbjs){
                                                                if(!/\/\//.test( jq(link).attr('src'))){
                                                                    var target = rooturl+'/'+jq(link).attr('src')
                                                                    links[target]=target
                                                                }
                                                                cbjs()
                                                            },cb)
                                          }
                                         ,function(cb){
                                              async.forEach(csslinks,
                                                            function(link,cbcss){
                                                                var target = rooturl+'/'+jq(link).attr('href');
                                                                links[target]=target
                                                                cbcss()
                                                            },cb);
                                          }]
                                        ,function(err){
                                             done()
                                         })
                      })
        })
        it('together in rhythm and sorrow',function(kissme){
            async.forEach(_.keys(links)
                         ,function(link,cb){
                              superagent.get(link)
                              .end(function(err,res){
                                  if(err){
                                      return cb(err)
                                  }
                                  if(!res.ok)
                                  console.log(link)
                                  res.ok.should.be.true
                                  return cb()
                              })
                          }
                         ,function(err){
                              console.log('done with async')
                              kissme()
                          })
            return null
        })
    })

})

