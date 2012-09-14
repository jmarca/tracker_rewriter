var express = require('express')
var path = require('path')
var assets_dir = path.normalize(__dirname+'/../attachments')
exports.tracker=function trackingfiles(app) {
    app.get(/\/tracker(\/.*)?/
             ,express.static(assets_dir)
            );

}
