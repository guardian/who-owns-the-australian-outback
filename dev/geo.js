//import * as turf from '@turf/turf'
var turf = require('@turf/turf');
var fs = require('fs');
var wrangled = require("./wrangled.json")

var createPoly = require("./js/createPoly")
var circleArea = require("./js/circleArea")
var randomPoints = require("./js/randomPoints") // https://gist.github.com/mkhatib/5641004


//var randomGeoPoints = randomPoints({ 'lat' : 133.829698, 'lng' : -25.022970 }, 1000, 100);

//var test = createPoly(133.829698, -25.022970, 984796)
//var test = circleArea(133.829698, -25.022970, 984796)

//console.log(randomGeoPoints)

var app = {

    init: (polygon) => {

        var bbox = app.getBoundingBox(polygon)

        bbox.then(bbox => app.electoratesGetPollingStations(bbox, polygon)); 

    },

    electoratesGetPollingStations: (bbox, polygon) => {

        var radius =  Math.sqrt( 984796 / Math.PI )

        var points = randomPoints({ 'lat' : 133.829698, 'lng' : -25.022970 }, radius, 100);

        app.voronoi(points, bbox, polygon)

    },

    voronoi: async(points, bbox, electorate) => {
        
        var points = await {
            type: "FeatureCollection",
            features: points.map(function(item) {
                return {
                    type: "Feature",
                    geometry: { type: 'Point', coordinates: [item.lat, item.lng] },
                    properties: { "sid": 0 },
                }
            })
        }

        var options = {

            bbox: bbox

        };

        var cbox = await turf.bboxPolygon(bbox);

        var cutter = await turf.buffer(cbox, 0.5, {units: 'kilometers'});

        let cookie_cutter = turf.difference(cutter, electorate);

        var features = []

        var voronoiPolygons = await turf.voronoi(points, options);

        var total = voronoiPolygons.features.length

        //console.log(`${total} points`)

        app.jsonify(points)

        /*

        voronoiPolygons.features.forEach(function(polygon) {

            var boundary = app.electorates[app.electoratesCurrent]

            let intersection = turf.intersect(polygon, boundary);

            if (intersection) {

                features.push(intersection)

            } else {

                let difference = turf.difference(polygon, cookie_cutter);

                if (difference) {

                    features.push(difference)

                }

            }

        })

        */
    },

    jsonify: (data) => {

        fs.writeFile(`test.json`, JSON.stringify(data), function(err) {

            if (err) {

                console.log(err);

            }

            console.log("Your files has been saved")

        }); 

    },

    getBoundingBox: async(polygon) => {

        var bbox = await turf.bbox(polygon);

        var bboxPolygon = await turf.bboxPolygon(bbox);

        var bufferedBox = await turf.buffer(bboxPolygon, 0.5, {units: 'kilometers'});

        var box = await turf.bbox(bufferedBox);

        return box

    },

    temporalToSeconds: function(hms) {

        var a = hms.split(':');

        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])

        return seconds

    },

    getPoint: function(lnglat) {

        return turf.point(lnglat)

    },

    getTrack: function(coordinates) {

        return turf.lineString(coordinates)

    },

    calculateDistance: function(track) {

        return turf.length(track, { units: 'kilometers'} )

    },

    sliceTrack: function(start, stop, total) {

        return turf.lineSlice(start, stop, total);

    },

    nearestPointOnLine: function(track, coordinates) {

        return turf.nearestPointOnLine( track, coordinates, { units: 'kilometers' } );

    }

}

var circle = circleArea(133.829698, -25.022970, 984796)

app.init(circle)
