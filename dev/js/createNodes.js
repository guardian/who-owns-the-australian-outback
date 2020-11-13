var d3 = require('d3')

function createNodes(data, width, height) {

    var layout = d3.pack().size([width, height]);
    var vert = d3.hierarchy(data).sum( (d) => d.size );
    var nodes = vert.descendants();
    layout(vert);
        
    return nodes
}

module.exports = createNodes