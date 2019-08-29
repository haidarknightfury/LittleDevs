var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function Ant(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
}
/**
 * Move the ant by dx and dy
 */
Ant.prototype.move = function (dy, dx) {
    this.x += getRandomInt(10) * getRandomInt(2) == 0 ? 1 : -1;
    this.y += getRandomInt(10) * getRandomInt(2) == 0 ? 1 : -1;
}

Ant.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = "Black";
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.closePath();
    ctx.fill();
    this.move(5, 5);
}


function Board(ctx, numberOfAnts) {
    this.ctx = ctx;
    this.numberOfAnts = numberOfAnts;
    this.ants = [];
    for (let x = 0; x < this.numberOfAnts; x++) {
        this.ants.push(new Ant(10, 50, 5));
    }
}
Board.prototype.draw = function () {
    this.refresh();
    for (ant of this.ants) {
        ant.draw(this.ctx);
    }
}

Board.prototype.refresh = function () {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let board = new Board(ctx, 100);
setInterval(board.draw.bind(board), 200);