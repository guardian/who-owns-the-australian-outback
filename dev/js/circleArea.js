var turf = require('@turf/turf');

function multiplyer(unit) {

    return (unit==='hectares' || unit==='hectare') ? 10000 :
        (unit==='kilometers' || unit==='kilometres') ? 1000000 :
        (unit==='meters' || unit==='metres') ? 1000000000 :
        (unit==='acres' || unit==='acre') ? 4046.86 : 1 ;

}

var circleArea = (lat, lng, area, unit='kilometers', id=null) => { // units  string  'kilometers'    miles, kilometers, degrees, or radians

    var radius =  Math.sqrt( area / Math.PI )

    var center = [ lat, lng ];

    var options = { units: 'kilometers', properties: (id===null) ? {} : { id: id }, } ; //steps: 10, default 64

    var circle = turf.circle(center, radius, options);

    return circle

}

module.exports = circleArea