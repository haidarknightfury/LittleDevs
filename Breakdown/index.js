var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var time = 10;

var dx = 2;
var dy = -2;

function drawBall() {
  //drawing code
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
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
