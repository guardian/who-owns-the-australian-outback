var topojson = require("topojson")

var fs = require('fs')

var mines = require("../shared/data/permits.json")

var createNodes = require('./js/createNodes');

var createSVG = require('./js/createSVG');

var choropleth = topojson.feature(mines,mines.objects.permits).features

// var list = choropleth.map(item => item.properties.LEASE_TYPE)

// var categories = Array.from( new Set(list) )

choropleth.forEach( (item,index) => {

    item.properties.id = index

})

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

var obj = {
            "name" : "Mining types",
            "display" : false,
            "children": []
        }

json.forEach( item => {
    var child = {}
    child.name = item.category
    child.display = false
    var shortlist = choropleth.filter( cat => cat.properties.LEASE_TYPE === item.category)
    child.children = shortlist.map( (final,index) => {
        return { "name": final.properties.LEASE_TYPE, "size" : Math.sqrt( final.properties.AREA_GEO / Math.PI ), "display" : true , "id" : final.properties.id }
    })
    obj.children.push(child)
})

var width = 1000

var height = 1000 

var nodes = createNodes(obj, width, height)

//console.log(nodes[0].data)

choropleth.forEach( (item, index) => {

    var target = nodes.find( (node) => {

        return node.data.id === item.properties.id

    })

    if (target!=undefined) {

        item.properties.x = target.x

        item.properties.y = target.y

        item.properties.r = target.r

    }

})

var svg = createSVG(nodes, width, height)

//console.log(testing)

function writeSVG(svg) {

    fs.writeFile("mines.svg", svg, function(err) {

        if(err) {
            return console.log(err);
        }

        console.log("Completed SVG")

    }); 
}

writeSVG(svg)


function writer(data) {

    fs.writeFile("boom.json", JSON.stringify(data), function(err) {

        if(err) {
            return console.log(err);
        }

        console.log("Complete")

    }); 
}

//writer(obj) //
