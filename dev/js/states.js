var svg = d3.select("svg"),
    path = svg.append("path");

d3.json("lower48.topo.json", function(err, topo) {
  // Get a single list of coordinates for each state
  var states = topojson.feature(topo, topo.objects.states)
    .features.map(function(d) {
      return d.geometry.coordinates[0];
    });

  d3.shuffle(states);

  draw();

  function draw() {
    var a = states[0],
        b = states[1],
        interpolator = flubber.interpolate(a, b);

    states.push(states.shift());

    path.attr("d", interpolator(0));

    // Morph
    path.transition()
      .delay(100)
      .duration(800)
      .attrTween("d", function() { return interpolator; })
      .on("end", draw);
  }
});