const D3Node    = require('d3-node');
const d3n   = new D3Node();
const d3    = d3n.d3;

function createSVG(data, width, height) {

	var svg = d3n.createSVG(width, height)
					.attr("preserveAspectRatio", "xMinYMin meet")
					.attr("viewBox", `0 0 ${width} ${height}`)
					.classed("svg-content", true);

	var g = svg.append("g")

	var vSlices = g.selectAll('circle').data(data).enter().append('circle')

    vSlices.attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('r', function (d) { return d.r; })
        .style("fill", function(d) { 
        	return getColour(d.data.name)
        })
        .style("fill-opacity", function(d) {
        	return (d.data.display) ? 1 : 0.5 ;
        })

	return d3n.svgString()

}

function getColour(type) {

    var colours = [ "#d73027", "#fc8d59", "#fee090", "#ffffbf", "#e0f3f8", "#4575b4", "#4d4d4d" ]

    var licenses = [ "Exploration Tenement", "Production Tenement Application", "Production Tenement", "Exploration Tenement Application", "Retention Tenement", "Exploration Release Area", null ]

    var index = licenses.indexOf(type); 

    return colours[index]

}

module.exports = createSVG