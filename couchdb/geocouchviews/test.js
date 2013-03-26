// function(doc) {
//     var re = new RegExp("wim");
//     if( ! re.test(doc._id) ){
//         // not wim, probably vds
//         var year_regex = new RegExp("^\\d{4}$");
//         var keys = Object.keys(doc);
//         var ys = keys.filter(function(k){return year_regex.test(k)});
//         // search each year, stop at first one with properties with hwy
//         var findprops =  function(y){
//             if(doc[y].properties === undefined){
//                 return null;
//             }
//             var p = doc[y].properties[0]
//             if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'ML'){
//                 return null;
//             }
//             var versions = p.versions
//             if(!Array.isArray(versions)){
//                  versions = [p.versions]
//             }
//             if(versions.forEach){
//                 versions.forEach(function(stamp){
//                     emit(p.geojson,null)
//                 })
//             }
//             return null;
//         };
//         var props = ys.forEach(findprops)
//     }
// }

// {
//    "_id": "_design/vdstype",
//    "spatial": {
//        "ml": "function(doc) {if (typeof doc.lon !=='undefined' && typeof doc.lat !== 'undefined' && doc.type==='ML') {emit({type:'Point', coordinates: [doc.lon-0,doc.lat-0]}, doc);}}",
//        "hv": "function(doc) {if (typeof doc.lon !=='undefined' && typeof doc.lat !== 'undefined' && doc.type==='HV') {emit({type:'Point', coordinates: [doc.lon-0,doc.lat-0]}, doc);}}",
//        "cd": "function(doc) {if (typeof doc.lon !=='undefined' && typeof doc.lat !== 'undefined' && doc.type==='CD') {emit({type:'Point', coordinates: [doc.lon-0,doc.lat-0]}, doc);}}",
//        "ff": "function(doc) {if (typeof doc.lon !=='undefined' && typeof doc.lat !== 'undefined' && doc.type==='FF') {emit({type:'Point', coordinates: [doc.lon-0,doc.lat-0]}, doc);}}",
//        "fr": "function(doc) {if (typeof doc.lon !=='undefined' && typeof doc.lat !== 'undefined' && doc.type==='FR') {emit({type:'Point', coordinates: [doc.lon-0,doc.lat-0]}, doc);}}",
//        "or": "function(doc) {if (typeof doc.lon !=='undefined' && typeof doc.lat !== 'undefined' && doc.type==='OR') {emit({type:'Point', coordinates: [doc.lon-0,doc.lat-0]}, doc);}}"
//    }
// }



var d = {
   "_id": "1000210",
   "_rev": "4-c4e33e53d2835c28cfb24450411ccde8",
   "2006": {
       "properties": [
           {
               "name": "N/O Eldorado St",
               "cal_pm": "R20.8789",
               "abs_pm": 466.371,
               "latitude_4269": 37.873818,
               "longitude_4269": -121.2779,
               "lanes": 3,
               "segment_length": 0.478,
               "freeway": 5,
               "direction": "S",
               "vdstype": "ML",
               "district": 10,
               "versions": [
                   "2006-12-27"
               ],
               "geojson": {
                   "type": "Point",
                   "crs": {
                       "type": "name",
                       "properties": {
                           "name": "EPSG:4326"
                       }
                   },
                   "coordinates": [
                       -121.2779,
                       37.873818
                   ]
               }
           }
       ]
   },
   "2007": {
       "vdsdata": "0",
       "rawdata": "1",
       "row": 1,
       "vdsimputed": 1,
       "properties": [
           {
               "name": "N/O Eldorado St",
               "cal_pm": "R20.8789",
               "abs_pm": 466.371,
               "latitude_4269": 37.873818,
               "longitude_4269": -121.2779,
               "lanes": 3,
               "segment_length": 0.478,
               "freeway": 5,
               "direction": "S",
               "vdstype": "ML",
               "district": 10,
               "versions": [
                   "2007-01-11",
                   "2007-01-31",
                   "2007-02-17",
                   "2007-06-16",
                   "2007-06-21",
                   "2007-06-27",
                   "2007-07-03",
                   "2007-07-12",
                   "2007-07-18",
                   "2007-07-19",
                   "2007-07-31",
                   "2007-08-03",
                   "2007-08-09",
                   "2007-08-11",
                   "2007-08-16",
                   "2007-08-17",
                   "2007-08-30",
                   "2007-09-13",
                   "2007-09-20",
                   "2007-09-22",
                   "2007-09-27",
                   "2007-10-04",
                   "2007-10-06",
                   "2007-10-12",
                   "2007-11-09",
                   "2007-12-14"
               ],
               "geojson": {
                   "type": "Point",
                   "crs": {
                       "type": "name",
                       "properties": {
                           "name": "EPSG:4326"
                       }
                   },
                   "coordinates": [
                       -121.2779,
                       37.873818
                   ]
               }
           }
       ]
   },
   "2008": {
       "vdsdata": "0",
       "rawdata": "1",
       "row": 1,
       "vdsimputed": 1,
       "properties": [
           {
               "name": "N/O Eldorado St",
               "cal_pm": "R20.8789",
               "abs_pm": 466.371,
               "latitude_4269": 37.873818,
               "longitude_4269": -121.2779,
               "lanes": 3,
               "segment_length": 0.478,
               "freeway": 5,
               "direction": "S",
               "vdstype": "ML",
               "district": 10,
               "versions": [
                   "2008-01-15",
                   "2008-02-07",
                   "2008-02-09",
                   "2008-03-04",
                   "2008-03-12",
                   "2008-04-19",
                   "2008-06-10",
                   "2008-06-14",
                   "2008-06-19",
                   "2008-07-09",
                   "2008-07-11",
                   "2008-07-12",
                   "2008-07-18",
                   "2008-07-22",
                   "2008-07-26",
                   "2008-07-29",
                   "2008-07-31",
                   "2008-08-01",
                   "2008-08-07",
                   "2008-08-08",
                   "2008-08-09",
                   "2008-08-12",
                   "2008-08-15",
                   "2008-08-26",
                   "2008-10-21",
                   "2008-11-15",
                   "2008-11-26",
                   "2008-12-11",
                   "2008-12-31"
               ],
               "geojson": {
                   "type": "Point",
                   "crs": {
                       "type": "name",
                       "properties": {
                           "name": "EPSG:4326"
                       }
                   },
                   "coordinates": [
                       -121.2779,
                       37.873818
                   ]
               }
           }
       ]
   },
   "2009": {
       "vdsdata": "0",
       "rawdata": "1",
       "row": 1,
       "vdsimputed": 1,
       "properties": [
           {
               "name": "N/O Eldorado St",
               "cal_pm": "R20.8789",
               "abs_pm": 466.371,
               "latitude_4269": 37.873818,
               "longitude_4269": -121.2779,
               "lanes": 3,
               "segment_length": 0.478,
               "freeway": 5,
               "direction": "S",
               "vdstype": "ML",
               "district": 10,
               "versions": [
                   "2009-01-10",
                   "2009-02-26",
                   "2009-03-25",
                   "2009-03-27",
                   "2009-04-08",
                   "2009-04-09",
                   "2009-04-15",
                   "2009-04-21",
                   "2009-04-22",
                   "2009-05-06",
                   "2009-05-08",
                   "2009-05-16",
                   "2009-05-20",
                   "2009-05-23",
                   "2009-05-30",
                   "2009-06-02",
                   "2009-06-04",
                   "2009-06-19",
                   "2009-07-17",
                   "2009-08-19",
                   "2009-09-11",
                   "2009-09-17",
                   "2009-09-18",
                   "2009-10-24",
                   "2009-11-17",
                   "2009-12-04"
               ],
               "geojson": {
                   "type": "Point",
                   "crs": {
                       "type": "name",
                       "properties": {
                           "name": "EPSG:4326"
                       }
                   },
                   "coordinates": [
                       -121.2779,
                       37.873818
                   ]
               }
           }
       ]
   },
   "2010": {
       "properties": [
           {
               "name": "N/O Eldorado St",
               "cal_pm": "R20.8789",
               "abs_pm": 466.371,
               "latitude_4269": 37.873818,
               "longitude_4269": -121.2779,
               "lanes": 3,
               "segment_length": 0.478,
               "freeway": 5,
               "direction": "S",
               "vdstype": "ML",
               "district": 10,
               "versions": [
                   "2010-06-24",
                   "2010-08-27"
               ],
               "geojson": {
                   "type": "Point",
                   "crs": {
                       "type": "name",
                       "properties": {
                           "name": "EPSG:4326"
                       }
                   },
                   "coordinates": [
                       -121.2779,
                       37.873818
                   ]
               }
           }
       ]
   }
}



var dumper = function(doc) {
    var re = new RegExp('wim');
    if( ! re.test(doc._id) ){
        // not wim, probably vds
        var year_regex = new RegExp("^\\d{4}$");
        var keys = Object.keys(doc);
        var ys = keys.filter(function(k){return year_regex.test(k)});
        var findprops =  function(y){
            if(doc[y].properties === undefined)  return null;
            var p = doc[y].properties[0]
            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'ML') return null;
            var versions = p.versions
            if(!Array.isArray(versions)) versions = [p.versions]
            if(versions.forEach) versions.forEach(function(stamp){
                    emit(p.geojson,null)
                })
            return null;
        };
        var props = ys.forEach(findprops)}}


var thumper = function(doc) {
    var re = new RegExp('wim');
    if( ! re.test(doc._id) ){
        var keys = Object.keys(doc);
        var findprops =  function(y){
            if(doc[y].properties === undefined)  return null;
            var p = doc[y].properties[0];
            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'ML') return null;
            var versions = p.versions;
            if(!Array.isArray(versions)) versions = [p.versions]
            if(versions.forEach) versions.forEach(
                function(stamp){ emit({type: 'Point',
                                       coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]},stamp) })
        }
        var props = keys.forEach(findprops)}}

var emit = function(a,b){
    console.log(JSON.stringify(a)+', '+JSON.stringify(b))
}

var f = "function(doc) {
    var re = new RegExp('wim');
    if( ! re.test(doc._id) ){
        var keys = Object.keys(doc);
        var findprops =  function(y){
            if(doc[y].properties === undefined)  return null;
            var p = doc[y].properties[0];
            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'ML') return null;
            var versions = p.versions;
            if(!Array.isArray(versions)) versions = [p.versions]
            if(versions.forEach) versions.forEach(
                function(stamp){ emit({type: 'Point',
                                       coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]},stamp) })
        }
var props = keys.forEach(findprops)}}"

thumper(d)



{
   "_id": "_design/main",
   "_rev": "2-d1f0b9b5a424adf7e60d6876d6a15ced",
   "spatial": {
       "ml": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'ML') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit({type: 'Point',\n                                       coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]},stamp) })\n        }\n        var props = keys.forEach(findprops)}}"
   }
}

{
   "_id": "_design/vdstype",
   "_rev": "10-d54be9522f8f9a9bc28781341e5266a8",
   "spatial": {
       "ml": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'ML') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit({type: 'Point',\n                                       coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]},stamp) })\n        }\n        var props = keys.forEach(findprops)}}"
   }
}


"ml": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'ML') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit(p.geojson,stamp) })\n        }\n        var props = keys.forEach(findprops)}}",
"hv": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'HV') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit({type: 'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1],stamp) })\n        }\n        var props = keys.forEach(findprops)}}",
"fr": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'FR') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit(p.geojson,stamp) })\n        }\n        var props = keys.forEach(findprops)}}",
"cd": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'CD') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit(p.geojson,stamp) })\n        }\n        var props = keys.forEach(findprops)}}",
"ff": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'FF') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit(p.geojson,stamp) })\n        }\n        var props = keys.forEach(findprops)}}",
"or": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'OR') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit(p.geojson,stamp) })\n        }\n        var props = keys.forEach(findprops)}}"




"ml": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.freeway === undefined || p.vdstype === undefined || p.vdstype !== 'ML') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit({type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]},stamp) })\n        }\n        var props = keys.forEach(findprops)}}"


"ml": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'ML' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit({type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]},stamp) })\n        }\n        var props = keys.forEach(findprops)}}"



// this works, but breaks
{
   "ml": "function(doc) { var re = new RegExp('wim');\n   if( ! re.test(doc._id) ){\n        var keys = Object.keys(doc);\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p. === undefined || p.vdstype === undefined || p.vdstype !== 'ML') return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n            if(versions.forEach) versions.forEach(\n                function(stamp){ emit({type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]},stamp) })\n        }\n        var props = keys.forEach(findprops)}}"
}

// this works, no breaks
{
   "ml": "function(doc) { var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'ML' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,vers);  }}"











    "ml": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'ML' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
    "hv": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'HV' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
    "cd": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'CD' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
    "ff": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'FF' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
    "fr": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'FR' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
    "or": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'OR' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}"


}


// updating that

{
   "ml": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'ML' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
   "hv": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'HV' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
   "cd": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'CD' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
   "ff": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'FF' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
   "fr": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'FR' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}",
   "or": "function(doc) {    function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1,  length = array.length;\n      var push = Array.prototype.push\n      while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n          push.apply(result,  flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n   var re = new RegExp('\\\\d{6,7}');\n   if( re.test(doc._id) ){\n   var year_re = new RegExp('^\\\\d{4}$');\n  var vers=[]; var geom;  var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n        var findprops =  function(y){\n            if(doc[y].properties === undefined)  return null;\n      var p = doc[y].properties[0];\n            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'OR' || p.versions === undefined) return null;\n            var versions = p.versions;\n            if(!Array.isArray(versions)) versions = [p.versions]\n    geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]}; vers.push(versions);         }\n        if(keys) keys.forEach(findprops); if(geom) emit(geom,flatten(vers));  }}"


    var ml = "function(doc) {\n  function flatten(array) {\n    var result = [];\n    if (!array) {\n      return result;\n    }\n    var value, index = -1, length = array.length;\n    var push = Array.prototype.push\n    while (++index < length) {\n      value = array[index];\n      if (Array.isArray(value)) {\n        push.apply(result, flatten(value));\n      } else {\n        result.push(value);\n      }\n    }\n    return result;\n  }\n  var re = new RegExp('\\\\d{6,7}');\n  if( re.test(doc._id) ){\n    var year_re = new RegExp('^\\\\d{4}$');\n    var vers=[]; var geom; var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});\n    var findprops = function(y){\n      if(doc[y].properties === undefined) return null;\n      doc[y].properties.forEach(function(p){\n        if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'ML' || p.versions === undefined) return null;\n        var versions = p.versions;\n        if(!Array.isArray(versions)) versions = [p.versions]\n        geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]};\n        vers.push(versions);\n        return null;\n      })\n      return null\n    }\n    if(keys) keys.forEach(findprops);\n    if(geom) emit(geom,flatten(vers));\n    }\n}"

   // That seems to work okay


    // testing out reducing geocouch views


    function(doc) {
      function flatten(array) {
        var result = [];
        if (!array) {
          return result;
        }
        var value, index = -1, length = array.length;
        var push = Array.prototype.push
        while (++index < length) {
          value = array[index];
          if (Array.isArray(value)) {
            push.apply(result, flatten(value));
          } else {
            result.push(value);
          }
        }
        return result.sort();
      }
      var re = new RegExp('\\\\d{6,7}');
      if( re.test(doc._id) ){
        var year_re = new RegExp('^\\\\d{4}$');
        var vers=[]; var geom; var keys = (Object.keys(doc)).filter(function(k){return year_re.test(k)});
        var findprops = function(y){
          if(doc[y].properties === undefined) return null;
          doc[y].properties.forEach(function(p){
            if(p.geojson === undefined || p.vdstype === undefined || p.vdstype !== 'ML' || p.versions === undefined) return null;
            var versions = p.versions;
            if(!Array.isArray(versions)) versions = [p.versions]
            geom ={type:'Point',coordinates:[p.geojson.coordinates[0],p.geojson.coordinates[1]]};
            vers.push(versions);
            return null;
          })
          return null
        }
        if(keys) keys.forEach(findprops);
        if(geom) emit(geom,flatten(vers));
        }
    }
