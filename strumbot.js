/* 
 *  Strumbot - A guitar-strumming robot for your guitar!
 *  Written by Yu Jiang Tham, copyright 2013
 */

var five = require('johnny-five');
var fs = require('fs');
var http = require('http').createServer(handler);
var io = require('socket.io').listen(http);

var board, servo;
var moveAngle;
var beatsPerMinute = 80;
var millisecondsPerMinute = 60000;
var currentPattern = 'x x x x ';
var currentBeat = 0;

// Load pattern array from text file
var patternArray = fs.readFileSync('patterns.txt').toString().split("\n");

// Initialize webserver
function handler (req, res) {
  fs.readFile(__dirname + '/index.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error 500');
    }

    res.writeHead(200);
    res.end(data);
  });
}

http.listen(8080);

io.sockets.on('connection', function(socket) {
  socket.emit('start', { hello: 'world' });
  socket.on('click_1', function(data) {
    currentPattern = patternArray[0];
    console.log("1: " + currentPattern);
  });
  socket.on('click_2', function(data) {
    currentPattern = patternArray[1];
    console.log("2: " + currentPattern);
  });
  socket.on('click_3', function(data) {
    currentPattern = patternArray[2];
    console.log("3: " + currentPattern);
  });
  socket.on('click_4', function(data) {
    currentPattern = patternArray[3];
    console.log("4: " + currentPattern);
  });
});

// Initialize johnny-five board and run
board = new five.Board();
board.on('ready', function() {
  servo = new five.Servo(9);

  // Initial position on start
  moveAngle = 60;
  servo.move(moveAngle);
  currentPattern = patternArray[0];

  this.loop(400, function () {
    readPattern(servo, currentPattern);
    console.log("currentPattern: " + currentPattern);
  });
});

function readPattern(servo, pattern) {
  console.log("[Beat] " + currentBeat + ": " + pattern[currentBeat]);
  if (pattern[currentBeat] === 'x') {
    strum(servo);
  } else {
    // Pause;
  }
  currentBeat++;

  if (currentBeat > pattern.length - 1) {
    currentBeat = 0;
    console.log("------------");
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
}
