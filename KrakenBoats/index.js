var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;


var time = 10;

var dx = 2;
var dy = -2;

// Wave Motion
var waveDisp = 5;
var waveDispMotion = 1;

var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


// SHIP VARIABLES
var invincible =false;


// FISH VARIABLES
var FishDropY = 10;
var FishDropX = Math.floor((Math.random() * canvas.width) + 1);
var DrawFishOnScreen = true;

// WAVE VARIABLES
var waveHeight = 70;
var score = 100;


// KRAKEN SPURT
var krakenSpurtX = Math.floor((Math.random() * canvas.width) + 1);
var krakenSpurtY = canvas.height - 10;
var krakenSpurtWidth = 20;
var krakenSpurtHeight = 20;
var krakenMoveY = 1;

// INITIALISE BRICKS
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}

document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keydownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyupHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// FISH
function generateFish(){
  if(DrawFishOnScreen){
    ctx.beginPath();
    ctx.arc(FishDropX, FishDropY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); 
  }
}

function isCollisionWithFishAndBoat(){

  if(FishDropY+ 70> canvas.height - ballRadius*2){
    if(FishDropX > paddleX && FishDropX < paddleX + paddleWidth){
      score = score -10;     
      if(score <= 0){
        alert("GAME OVER");
        document.location.reload();
      }
      restartFishDrop();
    }
  }
  // touch ocean
  if(FishDropY > canvas.height){
    restartFishDrop();
  }
}

function restartFishDrop(){
  FishDropY = 10;
  FishDropX = Math.floor((Math.random() * canvas.width) + 1);
}


function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}


function initWave(){
  ctx.beginPath();
  ctx.rect(0, canvas.height -waveHeight, canvas.width, waveHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


// KRAKEN
function announceKraken(){
  ctx.beginPath();
  ctx.rect(krakenSpurtX, canvas.height - waveHeight, krakenSpurtWidth, krakenSpurtHeight);
  ctx.fillStyle = "#CD5C5C";
  ctx.fill();
  ctx.closePath();

  ctx.font = "16px";
  ctx.fillStyle = "#CD5C5C";
  ctx.fillText("WARNING", krakenSpurtX+ 20, canvas.height - waveHeight+ 16);
}


function collideKraken(){
  if (krakenSpurtY - krakenMoveY < canvas.height - waveHeight && krakenSpurtY > waveHeight) {
    if (krakenSpurtX > paddleX && krakenSpurtX < paddleX + paddleWidth) {
        // Collision with kraken
        score =score -20;
        animateInvisibility();
        if(score <=0){
          alert("you lost");
        }
        restartKraken();
    }
  }
  if (krakenSpurtY - krakenMoveY <= 0) {
    restartKraken();
  }
}


function restartKraken(){
   krakenSpurtX = Math.floor((Math.random() * canvas.width) + 1);
   krakenSpurtY = canvas.height - 10;
}

function animateInvisibility(){
    invincible = true;
    setInterval(function(){
      invincible = false;
    }, 3000);
}

function MoveKrakenUp(){
  ctx.beginPath();
  ctx.rect(krakenSpurtX, krakenSpurtY , krakenSpurtWidth, krakenSpurtHeight);
  ctx.fillStyle = "#006400";
  ctx.fill();
  ctx.closePath();
}

function drawWaveLines(){
  ctx.moveTo(0, 180);
  for (let i = 0; i <= 490; i += 1) {
    let j = 250.0 - Math.sin(i * Math.PI / 180) * 20;
    ctx.lineTo(i , j);
  }
  ctx.stroke();
}



function drawBall() {
  //drawing code
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight - waveHeight   , paddleWidth, paddleHeight);
  if(invincible){
    ctx.fillStyle = "#F08080";
  }
  else{
    ctx.fillStyle = "#0095DD";
  }
  ctx.fill();
  ctx.closePath();
}

function drawWave1() {
  ctx.beginPath();
  ctx.rect(waveDisp, canvas.height - waveHeight, 2, waveHeight);
  ctx.fillStyle = "#00FA9A";
  ctx.fill();
  ctx.closePath();
}



function draw() {

  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //drawBricks();
  //drawBall();
  //collisionDetection();
  drawPaddle();

  // draw wave
  initWave();
  generateFish();
  
  FishDropY ++;

  drawScore();
  drawWave1();

  if(!invincible){
    isCollisionWithFishAndBoat();
    collideKraken();
  }
 


  announceKraken();
  MoveKrakenUp();
  krakenSpurtY = krakenSpurtY - krakenMoveY;
  


  waveDisp +=waveDispMotion

  if(waveDisp > canvas.width){
    waveDispMotion = -1;
  }
  else if(waveDisp < canvas.width){
    waveDispMotion = 1;
  }
   
    drawWaveLines();

  // move paddle
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

setInterval(draw, time);