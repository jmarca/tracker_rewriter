var express = require('express')
var path = require('path')
var assets_dir = path.normalize(__dirname+'/../attachments')
exports.tracker=function trackingfiles(app) {
    app.set('views', assets_dir + '/views');
    app.set('view engine', 'jade');

    function force_detector(req,res,next){
        if(req.params.d === undefined ||
              /index/.test(req.params.d)) {
            req.params.d = 'wim.10.S'
        }
        return next()
    }
    function detector_info(req,res,next){
        res.render('index'
                  ,{detector:req.params.d
                   ,pretty:true}
                  ,function(err,html){
                       if(err){
                           return next(err)
                       }
                       return res.end(html)
                   })
        return null
    }
    app.get('/tracker/:d'
           ,[force_detector,detector_info]);
    app.get('/tracker'
           ,[force_detector,detector_info]);


    app.get(/\/tracker(\/.*)?/
             ,express.static(assets_dir)
            );
    return app
}
