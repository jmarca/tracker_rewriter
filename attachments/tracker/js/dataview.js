

jQuery('document').ready(function(){

    jQuery('.detectors div').hide();
    jQuery('.detectors h2 a').click(function(e){
        e.preventDefault();
        jQuery(this)
        .parents('.detectors')
        .find('div.listing')
        .toggle();

    });
    util.getMore('vds');
    util.getMore('wim');

});

var clickhandler = {'wim':getWIM.get
                   ,'vds':getVDS.get
                   };



function enlargeimage(d) {

    var taller = jQuery(window).height()*0.95;

    var _d = ui.dialog(''
             , jQuery('<img src='+d+' alt="image blowup" />')
             )
      .closable()
      .overlay()
      .effect('scale')
      .show()
    ;
    _d.el.css({ height: taller + 'px' });

}

jQuery('#blob').ready(function(){

    var site = 'wim.10.S';
    getWIM.get(site);

})

