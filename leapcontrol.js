var Leap = require('leapjs');

var handPosition;
var lastHandPosition;
var moveHand;
var active = false;

console.log("I'm alive!");

Leap.loop(function (frame) {
  var hand = frame.hands[0];
  handPosition = hand.palmPosition;
  console.log(hand.sphereRadius);

  if (hand.sphereRadius < 50) {
    moveHand = {
      x: handPosition[0] - lastHandPosition[0],
      y: handPosition[1] - lastHandPosition[1],
      z: handPosition[2] - lastHandPosition[2]
    }
  }

  var selectorPosition = $('#selector').offset();
  console.log(selectorPosition);

  //document.getElementById('selector').style.top 

  lastHandPosition = handPosition; 
});