var topojson = require("topojson")

var fs = require('fs')

var mines = require("../shared/data/permits.json")

var choropleth = topojson.feature(mines,mines.objects.permits).features

// var list = choropleth.map(item => item.properties.LEASE_TYPE)

// var categories = Array.from( new Set(list) )

var results = choropleth.reduce( (acc, boundary) => {

    let tally = acc[boundary.properties.LEASE_TYPE] ? acc[boundary.properties.LEASE_TYPE].area + boundary.properties.AREA_GEO : boundary.properties.AREA_GEO ;

    let count = acc[boundary.properties.LEASE_TYPE] ? acc[boundary.properties.LEASE_TYPE].count + 1 : 1 ;

    return {

        ...acc,

        [ boundary.properties.LEASE_TYPE ] : { area: tally, count : count },

    };

}, {})

var categories = Object.keys(results)

var database = Object.values(results)

var totals = database.map(item => item.area)

var total = totals.reduce((a, b) => a + b, 0)

var json = categories.map( (item, index) => {

	return { category : item, area :  results[item].area , percentage : 100 / total * results[item].area, count : results[item].count }

})

function writer(data) {

    fs.writeFile("wrangled.json", JSON.stringify(data), function(err) {

        if(err) {
            return console.log(err);
        }

        console.log("Complete")

    }); 
}

writer(json)