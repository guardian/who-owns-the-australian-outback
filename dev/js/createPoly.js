var turf = require('@turf/turf');
var Gis = require('./gis')
var gis = new Gis()

function multiplyer(unit) {

    return (unit==='hectares' || unit==='hectare') ? 10000 :
        (unit==='kilometers' || unit==='kilometres') ? 1000000 :
        (unit==='meters' || unit==='metres') ? 1000000000 :
        (unit==='acres' || unit==='acre') ? 4046.86 : 1 ;

}

var createPoly = (lat, lng, area=1, unit='kilometers') => {

    var multiply = multiplyer(unit)

    /*
    Latitude measures angular distance from the equator to a point north or south of the equator. 
    While longitude is an angular measure of east/west from the Prime Meridian. 
    Latitude values increase or decrease along the vertical axis, the Y axis. 
    Longitude changes value along the horizontal access, the X axis.
    */

    var unit = Math.sqrt(area * multiply) / 2;

    var hypotenuse = Math.sqrt( ( unit * unit ) + ( unit * unit ) )

    var feature = [45,135,225,315].map( item => gis.createCoord([lng,lat], item, hypotenuse)[0])

    /*

    for (var i = 0; i < compass.length; i++) {

        var coordinates = gis.createCoord([lng,lat], compass[i], hypotenuse);

        feature.push(coordinates)
    }

    feature.push(feature[0])

    */

    var polygons = turf.polygon([feature]);

    return polygons

}

module.exports = createPoly