/* 
 *  Strumbot - A guitar-strumming robot for your guitar!
 *  Written by Yu Jiang Tham, copyright 2013
 */

var five = require('johnny-five');
var board, servo;
var moveAngle;
var beatsPerMinute = 80;
var millisecondsPerMinute = 60000;
var pattern = ['x x xxxx'];

board = new five.Board();
board.on('ready', function() {
  servo = new five.Servo(9);

  // Initial position on start
  moveAngle = 60;
  servo.move(moveAngle);

  readPattern(servo, pattern);
});

function readPattern(servo, pattern) {
  for (x in pattern) {
    if (x == 'x') {
      strum();
    } else {
      // Pause;
    }
    sleep(millisecondsPerMinute/beatsPerMinute);
  }
}

function strum(servo) {
  if (moveAngle < 90) {
    moveAngle = 120;
    servo.move(moveAngle);
  } else {
    moveAngle = 60;
    servo.move(moveAngle);
  }
  console.log("MoveAngle: " + moveAngle);
}