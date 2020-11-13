var turf = require('@turf/turf');
var Gis = require('./gis')
var gis = new Gis()

function multiplyer(unit) {

    return (unit==='hectares' || unit==='hectare') ? 10000 :
        (unit==='kilometers' || unit==='kilometres') ? 1000000 :
        (unit==='meters' || unit==='metres') ? 1000000000 :
        (unit==='acres' || unit==='acre') ? 4046.86 : 1 ;

}

var createPoly = (lat, lng, area=1, unit='kilometers', id=null) => {

    var multiply = multiplyer(unit)

    var unit = Math.sqrt(area * multiply) / 2;

    var hypotenuse = Math.sqrt( ( unit * unit ) + ( unit * unit ) )

    var feature = [45,135,225,315].map( item => gis.createCoord([ lat, lng ], item, hypotenuse))

    feature.push(feature[0])

    var polygons = turf.polygon([ feature ]);

    polygons.properties.id = id

    return polygons

}

module.exports = createPoly