var years = [];
for (var y =2007; y<2010; y++){ years.push(y); }

var wim =
    "{{#inspectwim years}}{{.}}"
    + "{{/inspectwim}}";

var wim_imputations =  "<ul>"
                     + "<li>self imputation: {{imputed}}</li>"
                     + "<li> {{max_iterations}} imputations out of {{{chain_lengths.length}}} stopped at max iterations</li>"
                     + "</ul>"

var preimglist = '<div class="unit size1of2"><h3>Pre-imputation plots</h3>{{#images}}<img src="{{.}}" alt="{{.}}" title="raw data plot, pre imputation" />{{/images}}</div>';
var postimglist = '<div class="unit size1of2 lastUnit"><h3>Post-imputation plots</h3>{{#images}}<img src="{{.}}" alt="{{.}}" title="imputed median plots, post imputation" />{{/images}}</div>';

var year_re = /_(\d\d\d\d)_/;
var imputed_re = /imputed_trucks/;
var agg_re = /_agg.redo_/;



Handlebars.registerHelper('inspectwim'
                         , function(items,options) {
                               // items is years, full context is options.fn(this)
                               var data = options.fn(this).site;
                               var imgs = _.chain(data._attachments)
                                           .keys()
                                           .filter(function(att){
                                               return year_re.test(att);
                                           })
                                           .value();
                               var pre = _.chain(imgs)
                                          .filter(function(img){
                                              return agg_re.test(img);
                                          })
                                          .map(function(img){
                                              return '/db/wim/'+data._id+'/'+img;
                                          })
                                           .sort()
                                          .value();
                               var post = _.chain(imgs)
                                           .filter(function(img){
                                               return imputed_re.test(img);
                                           })
                                           .map(function(img){
                                               return '/db/wim/'+data._id+'/'+img;
                                           })
                                           .sort()
                                           .value();

                               var out = ''
                               for(var i=0, l=items.length; i<l; i++) {
                                   var year = items[i];
                                   var this_year = function(att){
                                       var m = year_re.exec(att);
                                       if(m) return m[1] == year;
                                       return false;
                                   }
                                   out += '<div class="line"><h2>' + options.fn(items[i])+'</h2>';
                                   out += templates.wim_imputations(data[year])
                                   // the pre imputation plots are slightly out of order

                                   var prelist = _.filter(pre,this_year);
                                   if(prelist){
                                       out += templates.preimagelist({'images':[prelist[1]
                                                                               ,prelist[0]
                                                                               ,prelist[2]
                                                                               ,prelist[3]]});
                                   }
                                   out += templates.postimagelist({'images':_.filter(post,this_year)});
                                   out += "</div>";
  }

                               return out;

                          });

Handlebars.registerHelper('beforeimages', function(context, fn) {

                              //return templates.preimagelist({'images':pre.sort()});
                          });


var templates = { wim : Handlebars.compile(wim)
                ,wim_imputations: Handlebars.compile(wim_imputations)
                ,preimagelist: Handlebars.compile(preimglist)
                ,postimagelist: Handlebars.compile(postimglist)
                };


jQuery('document').ready(function(){


    jQuery('.detectors div').hide();
    jQuery('.detectors h2 a').click(function(e){
        e.preventDefault();
        jQuery(this)
            .parents('.detectors')
            .find('div')
            .slideToggle();
    });

    //    http://lysithia.its.uci.edu:5984/vdsdata%2Ftracking/_all_docs?limit=10&startkey=%2212%22&endkey=%2212zzz%22


});

jQuery('#blob').ready(function(){

    var site = 'wim.10.S';

    jQuery.getJSON('/db/wim/'+site
                   , function(data) {
                       var bit = templates.wim({'years':years
                                                ,'site':data});
                       jQuery('#blob').html(bit);
                   });
})

