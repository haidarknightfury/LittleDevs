var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var ballRadius=10;
var paddleHeight =10;
var paddleWidth =75;

var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed= false;
var leftPressed = false;

document.addEventListener("keydown",keydownHandler,false);
document.addEventListener("keyup",keyupHandler,false);

function keydownHandler(e){
  if(e.keyCode == 39){
    rightPressed = true;
  }
  else if(e.keyCode == 37){
    leftPressed = true;
  }
}

function keyupHandler(e){
  if(e.keyCode==39){
    rightPressed = false;
  }
  else if(e.keyCode ==37){
    leftPressed = false;
  }
}



var time = 10;

var dx = 2;
var dy = -2;

function drawBall() {
  //drawing code
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  x += dx;
  y += dy;

  if(y+dy > canvas.height - ballRadius|| y+dy < ballRadius){
    dy =-dy;
  }
  if(x+dx>canvas.width|| x+dx <ballRadius){
    dx= -dx;
  }

  if(rightPressed&& paddleX < canvas.width - paddleWidth ){
    paddleX+=7;
  }
  else if (leftPressed && paddleX > 0){
    paddleX -=7;
  }
}


setInterval(draw, time);


function drawShapes() {
  //rectangle
  ctx.beginPath();
  ctx.rect(20, 40, 50, 50); // x,y,width,height
  ctx.fillStyle = "#FF00000";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(240, 160, 20, 0, Math.PI * 2, false); //x,y,arcradius,startangle , endangle, direction
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(160, 10, 100, 40);
  ctx.strokeStyle = "rgba(0,0,255,0.5)";
  ctx.stroke();
  ctx.closePath();

}
