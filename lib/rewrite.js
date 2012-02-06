var request = require('request');

var couch = "http://127.0.0.1:5984";
exports.rewriter = function(req,res,next){
    var to = couch + '/vdsdata%2ftracking/'+req.params.id;
    if(req.params.attachment !== undefined){
        to += '/'+req.params.attachment;
    }
    console.log(to)
    request(to).pipe(res);
}