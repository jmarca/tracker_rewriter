// requires detector_view.js to be loaded first

var getVDS
      = function(){
        var year_re = /_(\d{4})_/;
        var vds_pre_re=/\d{4}_\d{3}\.png/;
        var vds_post_re = /imputed_trucks_(bylane)?.*0*(\d+).png/;

function vds_yearly_images(data){

    var imgs = _.chain(data._attachments)
    .keys()
    .filter(function(att){
        return year_re.test(att);
    })
    .map(function(img){
        return '/db/vds/'+data._id+'/'+img;
    })
    .value();
    // first pre
    var preimgs = _.chain(imgs)
    .filter(function(img){
        return vds_pre_re.test(img);
    })
    .sortBy(function(v){
        return v;
    })
    .groupBy(function(v){
        var m = year_re.exec(v);
        return m[1];
    })
    .value();

    // now post
    var postimgs = _.chain(imgs)
    .filter(function(img){
        return vds_post_re.test(img);
    })
    .sortBy(function(v){
        var m = vds_post_re.exec(v)
        if(m[1]) return m[2]-0 + 100;
        return m[2];
    })
    .groupBy(function(v){
        var m = year_re.exec(v);
        return m[1]-0;
    })
    .value()
    return {pre:preimgs,post:postimgs};
}


            var  displayProperties = function(elem,data){
                     // everybody gets properties dump
                     //
                     //
                     // assign data to element
                     elem.selectAll('div.props').remove();
                     var yr_re = /\d{4}/;
                     var last_year = _.chain(data)
                                     .keys()
                                     .filter(function(k){
                                         return yr_re.test(k);
                                     })
                                     .sort()
                                     .last()
                                     .value();
                     var last_prop = _.last(data[last_year].properties)
                     var props = elem
                                 .append('div');
                     props
                     .classed('props',1);
                     props.append('ul')
                     .selectAll('li')
                     .data(function(d){return ['name','vdstype','freeway','direction','abs_pm','lanes'
                                              ,'district'
                                              ,'latitude_4269'
                                              ,'longitude_4269'
                                              ,'cal_pm'
                                              ,'geojson']})

                     .enter()
                     .append('li')
                     .text(function(d){
                         var keyval = {'name':'Site name: '
                                      ,'vdstype':'Detector type: '
                                      ,'freeway':'Freeway: '
                                      ,'lanes': 'lanes: '
                                      ,'direction':'direction: '
                                      ,'abs_pm':'absolute postmile: '
                                      ,'geojson':'GeoJSON: '
                                      };

                         var text = keyval[d] || d + ': '
                         if(d==='geojson') {
                             text+= JSON.stringify(last_prop[d])
                         }else{
                             text+= last_prop[d]
                         }
                         return text;
                     });

                 };


        var displayData = function(params) {
            var data = params.data;
            var rows = params.rows;

            // for the CARB users, imputation is important
            // first self-imputation, then truck imputation
            // then "neighboring WIM sites" information, with
            // links to vds and wim sites.

            // I have some grand ideas to make hashtags
            // work and therefore make the browser back
            // history owrk, but that is out of scope.
            // Ship it first, then add functionality and
            // niceties such as those.


            var imputereport = rows.selectAll('ul')
            .data(function(d){return [d];});
            imputereport.enter()
            .append('ul');

            // first, self imputation results, if they exist.
            imputereport.selectAll('li.selfimpute')
            .data(function(d){
                if(data[d].vdsraw_chain_lengths)
                return [{vdsraw_chain_lengths : data[d].vdsraw_chain_lengths
                ,vdsraw_max_iterations : data[d].vdsraw_max_iterations}]
                return [{}];
            })
            .enter()
            .append('li')
            .classed('selfimpute',true)
            .text(function(d){
                var t = 'Self imputation completed, ';
                if(d.vdsraw_max_iterations === undefined){
                    t = 'No data stored on self imputation yet'
                    // pull together some possible explanations
                    if(data[d].vdsimputed !== 1){
                        t += ', '+data[d].vdsimputed
                    }
                    if(data[d]['27varserr'] !== undefined){
                        t += ', '+data[d]['27varserr']
                    }
                }else{
                    t += d.vdsraw_max_iterations +' out of '+ d.vdsraw_chain_lengths.length +' imputations stopped at max iterations';
                }
                return t;
            });

            // then truck imputation results, if they exist.
            imputereport.selectAll('li.truckimpute')
            .data(function(d){
                if(data[d].truckimputation_chain_lengths)
                return [{truckimputation_chain_lengths : data[d].truckimputation_chain_lengths
                ,truckimputation_max_iterations : data[d].truckimputation_max_iterations}]
                return [{}];
            })
            .enter()
            .append('li')
            .classed('selfimpute',true)
            .text(function(d){
                var t = 'Truck imputation completed, ';
                if(d.truckimputation_max_iterations === undefined){
                    t = 'No data stored on truck imputation yet'
                }else{
                    t += d.truckimputation_max_iterations +' out of '+ d.truckimputation_chain_lengths.length +' imputations stopped at max iterations';
                }
                return t;
            });


            // then images if they exist.  pre and post, as with WIM

            // now two "columns".  left batch is pre
            // imputation plots, right batch is post
            // imputation plots
            // need to inspect the attachment filenames to determine each
            if(data._attachments === undefined) return;

            var yi = vds_yearly_images(data);
            rows.selectAll('div.unit').data(function(d){return [d];})
            .enter()
            .append('div')
            .classed('unit size1of2',true)
            .append('h3')
            .text('Pre-imputation plots')
            var preunits = rows.selectAll('div.unit');
            preunits.selectAll('img')
            .data(function(d){
                if(yi.pre[d] !== undefined)
                return yi.pre[d];
                return []
            })
            .enter()
            .append('img')
            .attr('src',function(d){
                return d;
            })
            .attr('alt',function(d){
                return d;
            })
            .on("click", enlargeimage)
            .attr('title','raw data plot, pre imputation');

            // now post imputation plots
            rows.selectAll('div.unit.lastUnit').data(function(d){return [d];})
            .enter()
            .append('div')
            .classed('unit size1of2 lastUnit',true)
            .append('h3')
            .text('Post-imputation plots')
            var postunits = rows.selectAll('div.unit.lastUnit');
            postunits.selectAll('img')
            .data(function(d){
                if(yi.post[d] !== undefined)
                return yi.post[d];
                return []
            })
            .enter()
            .append('img')
            .attr('src',function(d){
                return d;
            })
            .attr('alt',function(d){
                return d;
            })
            .attr('title','imputed data plot, median value from multiple imputations, post imputation')
            .on("click", enlargeimage)
            ;
        };

        var url = '/db/vds/';
        var div = '#blob';
        return detector_view({url:url
                             ,div:div
                             ,year_cb:displayData
                             ,props_cb:displayProperties
                             });
    }( );
