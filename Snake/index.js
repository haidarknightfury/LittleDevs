var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


const board = Board(ctx,canvas); // Using Closures and obtain only 'public' methods
document.addEventListener("keydown", board.keydownHandler, false);
setInterval(board.draw, 500);


function Board(ctx, canvas){

    this.ctx = ctx;
    this.canvas = canvas;
    this.snake = new Snake(20, 10, ctx, canvas);

    function draw(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.snake.draw(this.ctx);
    }

    function keydownHandler(e) {
        snake.executeCommand(e.key);
    }
    return {
        draw: draw,
        keydownHandler: keydownHandler
    }
}


function Snake(width, height, ctx, canvas){

    // DY & DX position of snakes -> Represent the velocity
    this.dx = 10;
    this.dy = 0;

    // Snake properties -> width & height
    this.snakeWidth = width;
    this.snakeHeight = height;

    // Context => For drawing
    this.ctx = ctx;

    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    // Command Map
    this.commandMap = {
        'ArrowUp':  () =>{
            this.dx = 0;
            this.dy = -10;
        }, 'ArrowDown': ()=>{
            this.dx = 0;
            this.dy = 10;
        }, 'ArrowLeft':  () => {
            this.dx = -10;
            this.dy = 0;
        }, 'ArrowRight':  () => {
            this.dx = 10;
            this.dy = 0;
        }};

    this.draw = function(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.snakeWidth, this.snakeHeight);
        ctx.fillStyle = "#FF00000";
        ctx.closePath();
        ctx.fill();
        this.x += this.dx;
        this.y += this.dy;
    };

    this.executeCommand = function (key){
        try {
            this.commandMap[key]();
        } catch (error) { }
        
    }

}
