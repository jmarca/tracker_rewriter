var util =
    function() {
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
                return function(option,container,docs){
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
                        getWIM(d.id);
                        return false;
                    })
                    .text(function(d){ return d.id; });

                }
            }();


        function getMoreDocs(settings){
            var defaults = {couch:''
                           ,lookahead:100
                           };
            if(settings){
                settings = _.extend(defaults,settings);
            }else{
                settings = defaults;
            }
            var url = settings.couch + '/db/detectors';

            var getsome =
                function(option){

                    var query = {limit:settings.lookahead
                                ,startkey:oldlast
                                ,endkey:'1300000'
                                };

                    var lasthandler = function(err,newlast,next){
                            if(!err)
                                oldlast = newlast;
                            if(next) next()

                        }
                    var elemclass = '.vds';

                    if (option === 'wim') {
                        query.startkey=wimoldlast;
                        query.endkey='wim.Z';
                        lasthandler =  function(err,newlast,next){
                            if(!err)
                                wimoldlast = newlast;
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
                                    adddocs(option,container,rows);

                                    cb(null,last.id,next)
                                }else{
                                    cb('no data')
                                }
                            }
                        }(elemclass,lasthandler);
                    function fetch(){
                        query.startkey = option == 'wim' ? wimoldlast : oldlast;
                        jQuery.ajax({'url': url
                                    ,'data': query
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

