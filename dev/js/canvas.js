var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = 1920,
    height = 1000,
    shapes = [randomPolygon(), randomPolygon()],
    interpolator = flubber.interpolate(shapes[0], shapes[1], { string: false }),
    startTime;

context.fillStyle = "#e3e3e3";
context.strokeStyle = "#666";
context.lineWidth = 4;

requestAnimationFrame(draw);

function draw(time) {
  var points,
      t;

  if (!startTime) {
    startTime = time;
  }

  t = time - startTime;

  context.clearRect(0, 0, width, height);

  // Next iteration
  if (t > 1000) {
    startTime = time - t + 1000;
    t -= 1000;
    shapes.shift();
    shapes.push(randomPolygon());
    interpolator = flubber.interpolate(shapes[0], shapes[1], { string: false });
  }

  points = interpolator(ease(t / 1000));

  context.beginPath();
  points.forEach(function(p, i) {
    context[i ? "lineTo" : "moveTo"](...p);
  });
  context.lineTo(...points[0]);
  context.stroke();
  context.fill();

  requestAnimationFrame(draw);
}

function randomPolygon() {
  var sides = 3 + Math.floor(Math.random() * 10),
      r = 100 + Math.random() * 400,
      offset = Math.random() * 2 * Math.PI,
      x = width * (Math.random() * 2 + 1) / 4;

  return new Array(sides)
    .fill(null)
    .map(function(d, i) {
      return [
        Math.cos(offset + 2 * Math.PI * i / sides) * r + x,
        Math.sin(offset + 2 * Math.PI * i / sides) * r + height / 2
      ]
    });
}

// Cubic in/out easing
function ease(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}