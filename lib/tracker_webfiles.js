var express = require('express')
var path = require('path')
var assets_dir = path.normalize(__dirname+'/../attachments')
exports.tracker=function trackingfiles(app) {
    console.log(assets_dir+'/views')
    app.set('views', assets_dir + '/views');
    app.set('view engine', 'jade');

    app.get('/tracker/:d'
           ,function(req,res,next){
                res.render('index'
                          ,{d:req.params.d
                           ,pretty:true}
                          ,function(err,html){
                               if(err){
                                   return next(err)
                               }
                               return res.end(html)
                           })
                return null
            });
    app.get(/\/tracker(\/.*)?/
             ,express.static(assets_dir)
            );

}
