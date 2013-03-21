// this is the base "class" for getting vds and wim data

// needs a callback for handling data display,
// an option for urls passed in an options hash, and
// an option for the target div
//
// as in {'cb': function(data){...} , url: '/db/wim/', div:'#target' }
// these are also settable using accessor functions that are exported.
//

var detector_view
      = function(options){

        var yr_re = /\d{4}/;
        var year_re = /_(\d{4})_/;
        var divid;
        var displayData;
        var displayProps;
        var u;
        function target_div (d){
            if(d !== undefined) divid = d;
            return divid;
        }
        function display_cb( cb ){
            if( cb !== undefined ) displayData = cb;
            return displayData;
        }
        function properties_cb( cb ){
            if( cb !== undefined ) displayProps = cb;
            return displayProps;
        }
        function url(_u){
            if(_u !== undefined)  u = _u;
            return u;
        }
        function get(site,handlers){
            if(u === undefined || displayData === undefined){
                return null;
                // could also throw here, but why?
            }
            return jQuery.getJSON(u + site
                                 ,function(data){
                                      if(handlers){
                                          async.parallel( _.map(_.flatten([handlers,processData])
                                                               ,function(f){
                                                                    return async.apply(f,data);
                                                                }) )
                                      }else{
                                          processData(data);
                                      }
                                  }
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
            blob.selectAll('div.props').remove();

            displayProps(blob,data);

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
            var timeagg = ['monthly','daily','hourly']
            var csvlinks = rows.selectAll('a.datalink')
                           .data(function(g,d,i){
                               var urls = timeagg.map(function(agg){
                                              return [agg,'/data6/freeway/'+agg+'/'+d+'/'+data._id+'.csv']
                                          })
                               return urls
                           })

            csvlinks.enter()
            .append('a')
            .classed('datalink')
            .attr('href',function(d){return d[1]})
            .text(function(d){return d[0]+' data'})
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
            if( options.year_cb  !== undefined ) display_cb(options.year_cb);
            if( options.props_cb  !== undefined ) properties_cb(options.props_cb);
            return detector_view;
        }
        return initialize(options);

    }
