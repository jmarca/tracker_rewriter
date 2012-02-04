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


jQuery('#blob').ready(function(){
    var bit = templates.wim({'years':years
                            ,'site':site});
    jQuery('#blob').html(bit);
});

var site =
    {"_id":"wim.10.N",
     "_rev":"115-fcb344e3313f141605833e2ac1a09ef9",
     "2009":{"imputed":"finished",
             "paired":600060,
             "merged":600060,
             "chain_lengths":[6,
                              6,
                              6,
                              7,
                              7],
             "max_iterations":0},
     "2008":{"imputed":"finished",
             "paired":600060,
             "badpair":600060,
             "merged":600055,
             "chain_lengths":[8,
                              8,
                              7,
                              8,
                              8],
             "max_iterations":0},
     "2007":{"imputed":"finished",
             "chain_lengths":[113,
                              105,
                              109,
                              139,
                              110],
             "max_iterations":0,
             "paired":600060,
             "badpair":600060,
             "merged":600060},

     "_attachments":{"10_N_2008_imputed_trucks_002.png":{"content_type":"image/png",
                                                         "revpos":112,
                                                         "digest":"md5-7b0xEqsd2CuZ53Vlt8TNbA==",
                                                         "length":204301,
                                                         "stub":true},
                     "10_N_2008_imputed_trucks_001.png":{"content_type":"image/png",
                                                         "revpos":111,
                                                         "digest":"md5-sIfNNWdQ8dgr2+Q4gXQByQ==",
                                                         "length":202142,
                                                         "stub":true},
                     "10_N_2009_imputed_trucks_002.png":{"content_type":"image/png",
                                                         "revpos":106,
                                                         "digest":"md5-Npvl70WKIiebnBVqq8EPww==",
                                                         "length":199064,
                                                         "stub":true},
                     "10_N_2009_imputed_trucks_001.png":{"content_type":"image/png",
                                                         "revpos":105,
                                                         "digest":"md5-yptZSMTkLjd4fnXqo9UREA==",
                                                         "length":195556,
                                                         "stub":true},
                     "10_N_2007_imputed_trucks_002.png":{"content_type":"image/png",
                                                         "revpos":99,
                                                         "digest":"md5-pQIYh/MA7LnnTbAJkE/QeQ==",
                                                         "length":205504,
                                                         "stub":true},
                     "10_N_2007_imputed_trucks_001.png":{"content_type":"image/png",
                                                         "revpos":98,
                                                         "digest":"md5-eLAGDe0QFtcI1xFaZbXtVw==",
                                                         "length":190595,
                                                         "stub":true},
                     "10_N_2009_agg.redo_004.png":{"content_type":"image/png",
                                                   "revpos":49,
                                                   "digest":"md5-2ovQMHmJKSvPcwU2IRCwOw==",
                                                   "length":108273,
                                                   "stub":true},
                     "10_N_2009_agg.redo_003.png":{"content_type":"image/png",
                                                   "revpos":48,
                                                   "digest":"md5-TtrIZbEohsqs3QziFll9oQ==",
                                                   "length":194077,
                                                   "stub":true},
                     "10_N_2009_agg.redo_002.png":{"content_type":"image/png",
                                                   "revpos":47,
                                                   "digest":"md5-E6LOy6BHhJx6LrXLE6jx0w==",
                                                   "length":193342,
                                                   "stub":true},
                     "10_N_2009_agg.redo_001.png":{"content_type":"image/png",
                                                   "revpos":46,
                                                   "digest":"md5-lzKr7xY47ShrID/T8IE+pw==",
                                                   "length":188607,
                                                   "stub":true},
                     "10_N_2007_median_002.png":{"content_type":"image/png",
                                                 "revpos":34,
                                                 "digest":"md5-cHIBouomARlNiBbJy1DBRQ==",
                                                 "length":205432,
                                                 "stub":true},
                     "10_N_2007_median_001.png":{"content_type":"image/png",
                                                 "revpos":33,
                                                 "digest":"md5-IqoMDvMxiQ1jJBUCjVA6Hw==",
                                                 "length":184928,
                                                 "stub":true},
                     "10_N_2008_median_002.png":{"content_type":"image/png",
                                                 "revpos":27,
                                                 "digest":"md5-k6Tzart8d2XoifGZw85AGg==",
                                                 "length":204221,
                                                 "stub":true},
                     "10_N_2008_median_001.png":{"content_type":"image/png",
                                                 "revpos":26,
                                                 "digest":"md5-3SIX2f/KukrqTvgFqGFWEA==",
                                                 "length":197645,
                                                 "stub":true},
                     "10_N_2009_median_002.png":{"content_type":"image/png",
                                                 "revpos":22,
                                                 "digest":"md5-lDVQeHDYX8UCg/jcRgq4Qg==",
                                                 "length":198948,
                                                 "stub":true},
                     "10_N_2009_median_001.png":{"content_type":"image/png",
                                                 "revpos":21,
                                                 "digest":"md5-qZz8kcPKMazl0YF1MPvLyA==",
                                                 "length":191537,
                                                 "stub":true},
                     "10_N_2009_002.png":{"content_type":"image/png",
                                          "revpos":16,
                                          "digest":"md5-G2cNKcsPvWhJ+MOvYX61AQ==",
                                          "length":200366,
                                          "stub":true},
                     "10_N_2009_001.png":{"content_type":"image/png",
                                          "revpos":15,
                                          "digest":"md5-bqYAAelYTAl+l/egvwfM/g==",
                                          "length":192207,
                                          "stub":true}
                    }
    };

