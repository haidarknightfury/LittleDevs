var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


const board = Board(ctx,canvas); // Using Closures and obtain only 'public' methods
document.addEventListener("keydown", board.keydownHandler, false);
setInterval(board.draw, 500);


function Board(ctx, canvas){

    this.ctx = ctx;
    this.canvas = canvas;

    // FOODS
    const MAX_FOODS = 5;
    this.foods = [];

    // SNAKE
    this.snake = new Snake(10, 10, this.ctx, this.canvas);
    
    initFoods();

    function draw(){
        clearBoard();
        this.snake.draw();
        drawFoods();
    }

    function keydownHandler(e) {
        snake.executeCommand(e.key);
    }


    function drawFoods(){
        for (let food of this.foods){
            food.draw();
        }
    }

    function initFoods() {
        for (let i = 0; i < MAX_FOODS; i++) {
            this.foods.push(new Food(5, 5, this.ctx, this.canvas));
        }
    }

    function clearBoard(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return {
        draw: draw,
        keydownHandler: keydownHandler
    }
}


function Food(width,height,ctx, canvas){
    this.width= width;
    this.height = height;
    this.ctx = ctx;
    this.canvas =canvas;

    this.x = getRandomInt(this.canvas.width);
    this.y = getRandomInt(this.canvas.height);

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "#FF00000";
        this.ctx.closePath();
        this.ctx.fill();
    }
}


function Snake(width, height, ctx, canvas){

    const SPEED_SNAKE = 10;

    // DY & DX position of snakes -> Represent the velocity
    this.dx = SPEED_SNAKE;
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
            this.dy = -SPEED_SNAKE;
        }, 'ArrowDown': ()=>{
            this.dx = 0;
            this.dy = SPEED_SNAKE;
        }, 'ArrowLeft':  () => {
            this.dx = -SPEED_SNAKE;
            this.dy = 0;
        }, 'ArrowRight':  () => {
            this.dx = SPEED_SNAKE;
            this.dy = 0;
        }};

    this.draw = function(){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.snakeWidth, this.snakeHeight);
        this.ctx.fillStyle = "#FF00000";
        this.ctx.closePath();
        this.ctx.fill();
        this.x += this.dx;
        this.y += this.dy;
    };

    this.executeCommand = function (key){
        try {
            this.commandMap[key]();
        } catch (error) { 
            throw e;
        }
        
    }

}
