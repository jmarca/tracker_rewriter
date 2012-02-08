
var yr_re = /\d{4}/;
var year_re = /_(\d{4})_/;
var imputed_re = /imputed_trucks/;
var agg_re = /_agg.redo_/;
var img_sort = /_(\d{3}).png/;
var agg_sort_map = {'001':2
                   ,'002':1
                   ,'003':3
                   ,'004':4};

jQuery('document').ready(function(){

    jQuery('.detectors div').hide();
    jQuery('.detectors h2 a').click(function(e){
        e.preventDefault();
        jQuery(this)
        .parents('.detectors')
        .find('div.listing')
        .toggle();

    });
    util.getMore('wim');
    util.getMore('vds');

});

function getWIM(site){
    jQuery.getJSON('/db/wim/'+site
                  , function(data) {
                        var years = _.chain(data)
                                    .keys()
                                    .filter(function(k){
                                        return yr_re.test(k);
                                    })
                                    .sort()
                                    .value();
                        var blob = d3.select('#blob')
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

                        // now add the data
                        // first everybody gets imputation summary
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
                        var yi = yearly_images(data);
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
                        .attr('title','raw data plot, post imputation');

                   });
};

jQuery('#blob').ready(function(){

    var site = 'wim.10.S';
    getWIM(site);

})

function yearly_images(data){

    var imgs = _.chain(data._attachments)
               .keys()
               .filter(function(att){
                   return year_re.test(att);
               })
               .map(function(img){
                   return '/db/wim/'+data._id+'/'+img;
               })
               .value();
    // first pree
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