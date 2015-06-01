function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function polarToCartesian (radius, degrees) {
  var x = radius * Math.cos(toRadians(degrees));
  var y = radius * Math.sin(toRadians(degrees));
  return { x : x, y : y};
}

function sumElementsIn (array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}