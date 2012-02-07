var util = function() {
    function showLoader() {
        $( '.stream-loading' ).removeClass( 'hidden' );
    }

    function hideLoader() {
        $( '.stream-loading' ).addClass( 'hidden' );
    }

    function loaderShowing() {
        var showing = false;
        if( $( '.stream-loading' ).css( 'visibility' ) !== "hidden" ) showing = true;
        return showing;
    }

    function bindInfiniteScroll() {
        var settings = {
            couch: '',
            lookahead: 400,
            container: jQuery( '#detectors' )
        };
        var oldlast = '0';
        var wimoldlast = 'wim.0';

        jQuery( window ).scroll( function( e ) {
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
                var url = settings.couch + '/detectors';
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
                        if (data.length > 0) {
                            var last = _.last(data);
                            if (data.length > 1) {
                                data.pop()
                            }
                            jQuery('.detectors'+wrapper).find('div').append(hbars.doclist({data: data} ) );
                            cb(null,last)
                        }else{
                            cb('no data')
                        }
                    }
                }(elemclass,lasthandler);
                jQuery.getJSON({'url': url
                               ,'data': query
                               ,'success': success
                               ,'cache': true
                               });
            }

        })
    };
    return { showLoader: showLoader
           , hideLoader: hideLoader
           , loaderShowing: loaderShowing
           , bindInfiniteScroll: bindInfiniteScroll
           };
}();

