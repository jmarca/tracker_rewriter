// this is the base "class" for getting vds and wim data

// needs a callback for handling data display,
// an option for urls passed in an options hash, and
// an option for the target div
//
// as in {'cb': function(data){...} , url: '/db/wim/', div:'#target' }
// these are also settable using accessor functions that are exported.
//

var detector_view
      = function(){
        var yr_re = /\d{4}/;
        var year_re = /_(\d{4})_/;
        var divid;
        var displayData;
        var u;
        function target_div (d){
            if(d !== undefined) divid = d;
            return divid;
        }
        function display_cb( cb ){
            if( cb !== undefined ) displayData = cb;
            return displayData;
        }
        function url(_u){
            if(_u !== undefined)  u = _u;
            return u;
        }
        function get(site){
            if(u === undefined || displayData === undefined){
                return null;
                // could also throw here, but why?
            }
            return jQuery.getJSON(u + site
                                 ,processData
                                 );
        };
        function processYears(data){
            var years = _.chain(data)
                        .keys()
                        .filter(function(k){
                            return yr_re.test(k);
                        })
                        .sort()
                        .value();
            var blob = d3.select(divid)
            var titles = blob.selectAll('h2.id').data([data._id]);
            titles.enter().append('h2').classed('id',true);
            titles.text(data._id);
            titles.exit().remove();
            blob
            .selectAll('div.year').remove();

            var rows = blob
                       .selectAll('div.year')
                       .data(years);
            rows
            .enter()
            .append('div')
            .classed('line year',true)
            .append('h2')
            .text(function(d){return d;})
            ;
            rows.exit().remove();
            // reselect to make sure I have the current set
            rows = blob
                   .selectAll('div.year');
            return rows;
        }
            function processData(data){
                var rows = processYears(data);
                return displayData({data:data,rows:rows});
            }
            var detector_view = {url : url
                                ,target_div : target_div
                                ,display_cb : display_cb
                                ,get : get
                                };
            function initialize( options ){
                if( options.url !== undefined ) url(options.url);
                if( options.div !== undefined ) target_div(options.div);
                if( options.cb  !== undefined ) display_cb(options.cb);
                return detector_view;
            }

            return initialize;
        }();

