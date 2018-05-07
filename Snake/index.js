var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height / 2;

var snakeWidth = 10;
var snakeHeight = 10;

var dx = 10;
var dy = 0;

document.addEventListener("keydown",keydownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keydownHandler(e){
    //up
    if(e.keyCode = 38 ){
        dx = 0;
        dy = 10;
    }

}

function keyUpHandler(e){

}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
}

function drawSnake() {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
    ctx.fillStyle = "#FF00000";
    ctx.closePath();
    ctx.fill();
    x += dx;
    y += dy;
}

setInterval(drawGame, 500);