var util =
    function() {

        // from jquery.couch.js
        // Convert a options object to an url query string.
        // ex: {key:'value',key2:'value2'} becomes '?key="value"&key2="value2"'
        function encodeOptions(options) {
            var buf = [];
            if (typeof(options) === "object" && options !== null) {
                for (var name in options) {
                    if ($.inArray(name,
                                  ["error", "success", "beforeSuccess", "ajaxStart"]) >= 0)
                        continue;
                    var value = options[name];
                    if ($.inArray(name, ["key", "startkey", "endkey"]) >= 0) {
                        value = toJSON(value);
                    }
                    buf.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
                }
            }
            return buf.length ? "?" + buf.join("&") : "";
        }
        function toJSON(obj) {
            return obj !== null ? JSON.stringify(obj) : null;
        }


        function showLoader() {
            $( '.loading' ).toggle();
        }

        function hideLoader() {
            $( '.loading' ).toggle();
        }

        function loaderShowing() {
        var showing = false;
            if( $( '.loading' ).css( 'visibility' ) !== "hidden" ) showing = true;
            return showing;
        }

        var oldlast = '.';
        var wimoldlast = 'wim.0';

        var adddocs =
            function(){
                var alldocs = {};
                return function(option,container,docs,cb){
                    if(alldocs[option] === undefined) {
                        alldocs[option] = [];
                    }

                    alldocs[option] = _.flatten([alldocs[option],docs]);
                    container.selectAll('div')
                    .data(alldocs[option],function(d){
                        return d.id;
                    })
                    .enter()
                    .append('div')
                    .append('a')
                    .attr('href','#')
                    .on('click',function(d){
                        cb(d.id);
                        return false;
                    })
                    .text(function(d){ return d.id; });

                }
            }();


        function getMoreDocs(settings){
            var defaults = {couch:''
                           ,lookahead:100
                           ,vdsservice:'/db/vdsdetectors'
                           ,wimservice:'/db/wimdetectors'
                           };
            if(settings){
                settings = _.extend(defaults,settings);
            }else{
                settings = defaults;
            }
            var detector_service = settings.vdsservice;
            var vdsurl = settings.couch + detector_service;
            detector_service = settings.wimservice;
            var wimurl = settings.couch + detector_service;

            var getsome =
                function(option){
                    var url = vdsurl;
                    var query = {limit:settings.lookahead
                                ,startkey:oldlast
                                ,endkey:'9900000'
                                };

                    var lasthandler = function(err,newlast,next){
                            if(!err)
                                oldlast = newlast;
                            if(next) next()

                        }
                    var elemclass = '.vds';

                    if (option === 'wim') {
                        url = wimurl;
                        query.startkey=wimoldlast;
                        query.endkey='wim.Z';
                        lasthandler =  function(err,newlast,next){
                            if(!err)
                                wimoldlast = newlast;
                            if(next) next()
                        }
                        elemclass = '.wim';
                    }

                    var success =
                        function(wrapper,cb){
                            // display the data  in the big container.
                            return function(data){
                                var rows = data.rows;
                                var next = null;
                                if (rows.length > 0) {
                                    var last = _.last(rows);
                                    if (rows.length > 1 && rows.length==settings.lookahead) {
                                        rows.pop()
                                        next = fetch;
                                    }

                                    var container = d3.select('.detectors'+wrapper+' div.listing');
                                    adddocs(option,container,rows,clickhandler[option]);

                                    cb(null,last.id,next)
                                }else{
                                    cb('no data')
                                }
                            }
                        }(elemclass,lasthandler);
                    function fetch(){
                        query.startkey = option == 'wim' ? wimoldlast : oldlast;
                        jQuery.ajax({'url': url// + encodeOptions(query)
                                    ,'data':query
                                    ,'dataType': 'json'
                                    ,'success': success
                                    ,'cache': true
                                    });

                    };
                    fetch();
                };

            return getsome;
        };


        var doit = getMoreDocs();



    return { showLoader: showLoader
           , hideLoader: hideLoader
           , loaderShowing: loaderShowing
           , getMore: doit
           };

}();

