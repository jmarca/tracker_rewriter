var po = org.polymaps;
var ui_layers = {};

ui_layers.detectors = po.geoJson()
    .url("/detectors/{Z}/{X}/{Y}.json")
    .id("detectors")
    .clip(false)
    .visible(true)
    .on("load", detectors_load)
    .on("load", po.stylist()
                .attr("stroke", function(d) {
                    return 'green';
                })
       );

// ui_layers.murbs = po.geoJson()
//     .url("/detectors/murb/2009/{Z}/{X}/{Y}.json")
//     .id("murb")
//     .clip(false)
//     .visible(true)
//     .on("load", murb_load)
// ;

var jsonp_fetch = function(url,cb){
    jQuery.ajax({
        'url': url,
        'success': cb,
        'dataType': 'jsonp',
        'cache':true,
        'jsonpCallback':hex_sha1(url)
    });
};


var map;
jQuery(document).ready(function(){
    // -117.7659%2C33.6875%2C-117.61176%2C33.69161

    var svg = d3.selectAll("#map")
        .append("svg:svg")
    ;


    map = po.map()
            .container(svg[0][0])
            .center({lon:-117.8809,lat:33.7209})
            .tileSize({x: 128, y: 128})
            .zoom(10)
            .zoomRange([6, 18])
            .add(po.interact());

    map.add(po.image()
             .url(po.url("http://{S}tile.openstreetmap.org/"
                         + "{Z}/{X}/{Y}.png")
                  .hosts(["a.", "b.", "c."])));

    _.each( ui_layers,function(k ){
        map.add(k);
    })

})

function click_handler_creator(did){
    var detector  = did;
    var handler = getWIM.get;
    if(/vds/.test(did)){
        detector = did.split('_')[1]
        handler = getVDS.get;
    }
    return function(){
        d3.event.stopPropagation();
        handler(detector);
    }
}

var click_links = {};
function detectors_load(e) {
    var tile = e.tile, g = tile.element;
    //while (g.lastChild) g.removeChild(g.lastChild);
    var keep=[];
    for (var i = 0,l=e.features.length; i < l; i++) {
        var feature = e.features[i];
        if(['Data','ML'].indexOf(feature.data.properties.type) == -1){
            g.removeChild(feature.element);
        }else{
            keep.push(feature);
            //g.appendChild(e.feature.element);
            var detector_id = feature.data.properties.detector_id;


            var dot = d3.select(feature.element);

            if(/wim/.test(detector_id)){
                dot.classed('wim',true);
                // TODO add detector type here too
            }else{
                dot.classed('vds',true);
            }

            if(click_links[detector_id] === undefined){
                click_links[detector_id] = click_handler_creator(detector_id);
            }
            dot.on('click',click_links[detector_id])
        }
    }
    e.features = keep;
    return null;
};

