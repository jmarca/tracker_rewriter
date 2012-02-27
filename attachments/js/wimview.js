// requires detector_view.js to be loaded first

var getWIM
      = function(){
        var year_re = /_(\d{4})_/;
        var imputed_re = /imputed_trucks/;
        var agg_re = /_agg.redo_/;
        var img_sort = /_(\d{3}).png/;
        var agg_sort_map = {'001':2
                           ,'002':1
                           ,'003':3
                           ,'004':4};

            function wim_yearly_images(data){
                var imgs = _.chain(data._attachments)
                           .keys()
                           .filter(function(att){
                               return year_re.test(att);
                           })
                           .map(function(img){
                               return '/db/wim/'+data._id+'/'+img;
                           })
                           .value();
                // first pre
                var preimgs = _.chain(imgs)
                              .filter(function(img){
                                  return agg_re.test(img);
                              })
                              .sortBy(function(v){
                                  var m = img_sort.exec(v)
                                  return agg_sort_map[m[1]];
                              })
                              .groupBy(function(v){
                                  var m = year_re.exec(v);
                                  return m[1];
                              })
                              .value();

                // now post
                var postimgs = _.chain(imgs)
                               .filter(function(img){
                                   return imputed_re.test(img);
                               })
                               .sortBy(function(v){
                                   var m = img_sort.exec(v)
                                   return m[1];
                               })
                               .groupBy(function(v){
                                   var m = year_re.exec(v);
                                   return m[1];
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
                     var props = elem
                                 .append('div');
                     props
                     .classed('props',1);
                     props.append('ul')
                     .selectAll('li')
                     .data(function(d){return ['loc','wim_type','freeway','lanes'];})
                     .enter()
                     .append('li')
                     .text(function(d){
                         var keyval = {'loc':'Location: '
                                      ,'wim_type':'WIM station type: '
                                      ,'freeway':'Freeway: '
                                      ,'lanes': 'lanes: '
                                      };

                         var text = keyval[d]+data.properties['2009-02-25'][d];
                         return text;
                     });

                 };

            var displayData = function(params){
                    var data = params.data;
                    var rows = params.rows;

                    // second everybody gets imputation summary
                    var imputereport = rows.selectAll('ul')
                                       .data(function(d){return [d];});
                    imputereport.enter()
                    .append('ul');
                    imputereport.append('li')
                    .text(function(d){
                        var text = 'self imputation: '+data[d].imputed;
                        return text;
                    });
                    imputereport.append('li')
                    .text(function(d){
                        var text = ''
                        if(data[d].chain_lengths !== undefined)
                            text = data[d].max_iterations +' imputations out of '+ data[d].chain_lengths.length +' stopped at max iterations ';
                        return text;
                    });

                    // now two "columns".  left batch is pre
                    // imputation plots, right batch is post
                    // imputation plots
                    // need to inspect the attachment filenames to determine each
                    if(data._attachments === undefined) return;
                    var yi = wim_yearly_images(data);
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

            var url = '/db/wim/';
            var div = '#blob';
            return detector_view({url:url
                                 ,div:div
                                 ,year_cb:displayData
                                 ,props_cb:displayProperties
                                 });
        }();

