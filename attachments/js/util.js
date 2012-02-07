var util = function() {
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

    var oldlast = 0;
    var wimoldlast = 'wim.0';

    function adddocs(container,docs){

        container.selectAll('div')
                 .data(docs)
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


    function getMoreDocs(settings){
        var defaults = {couch:''
                       ,lookahead:400
                       };
        if(settings){
            settings = _.extend(defaults,settings);
        }else{
            settings = defaults;
        }
        var url = settings.couch + '/db/detectors';

        return function(){

            var query = {limit:settings.lookahead
                        ,startkey:oldlast
                        ,endkey:1300000
                        };
            var option = jQuery('input:radio[name=dataset]:checked').val();
            var lasthandler = function(err,data){
                if(!err)
                    oldlast = _.last(data);
            }
            var elemclass = '.vds';

            if (option === 'wim') {
                query.startkey=wimoldlast;
                query.endkey='wim.Z';
                lasthandler =  function(err,data){
                    if(!err)
                        wimoldlast = _.last(data);
                }
                elemclass = '.wim';
            }
            var success = function(wrapper,cb){
                // display the data  in the big container.
                return function(data){
                    var rows = data.rows;
                    if (rows.length > 0) {
                        var last = _.last(rows);
                        if (rows.length > 1) {
                            rows.pop()
                        }

                        var container = d3.select('.detectors'+wrapper+' div.listing');
                        adddocs(container,rows);

                        cb(null,last.id)
                        }else{
                            cb('no data')
                        }
                }
            }(elemclass,lasthandler);
            jQuery.ajax({'url': url
                        ,'data': query
                        ,'dataType': 'json'
                           ,'success': success
                           ,'cache': true
                           });

        };
    };

    var doit = getMoreDocs();

    function bindInfiniteScroll() {
        var settings = {
            couch: '',
            lookahead: 400,
            container: jQuery( '#detectors' )
        };

        var scrollDown = function( e ) {
            if ( loaderShowing() ) {
                return;
            }

            var containerScrollTop = settings.container.scrollTop();
            if ( ! containerScrollTop ) {
                var ownerDoc = settings.container.get().ownerDocument;
                if( ownerDoc ) {
                    containerScrollTop = jQuery( ownerDoc.body ).scrollTop();
                }
            }
            var distanceToBottom = jQuery( document ).height() - ( containerScrollTop + jQuery( window ).height() );

            if ( distanceToBottom < settings.lookahead ) {
                showLoader()
                doit()
            }

        }
        jQuery( window ).scroll( scrollDown );
        scrollDown();
    };
    return { showLoader: showLoader
           , hideLoader: hideLoader
           , loaderShowing: loaderShowing
           , bindInfiniteScroll: bindInfiniteScroll
           , getMore: doit
           };

}();

