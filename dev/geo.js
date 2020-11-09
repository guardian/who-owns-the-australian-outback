//import * as turf from '@turf/turf'
var turf = require('@turf/turf');
var fs = require('fs');
var wrangled = require("./wrangled.json")

var createPoly = require("./js/createPoly")

var test = createPoly(-25.022970, 133.829698,6)

console.log(test)

var app = {

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

//app.init()
