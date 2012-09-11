var querystring = require('querystring')
var _ = require('lodash')

// make sure that strings are strings, numbers are numbers when JSON encoding
function brutal_hack(v){
    if(! isNaN(v) ){
        return +v;
    }else{
        return v;
    }
}
// Encode only key, startkey and endkey as JSON
var toQuery = function(query) {
        var q={};
        _.each(query,function(v,k){
            if (['key', 'startkey', 'endkey'].indexOf(k) != -1) {
                // keys can be arrays or strings
                var vmap;
                if(_.isArray(v)){
                    vmap = _.map(v,function(value){ return brutal_hack(value); });
                }else{
                    vmap = brutal_hack(v);
                }
                q[k] = JSON.stringify(vmap);
            } else {
                q[k] = String(v);
            }
        });
    //console.log(q);
        return querystring.stringify(q);
};
exports.toQuery=toQuery