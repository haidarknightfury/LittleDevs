var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d'),
  img = new Image;

img.onload = draw;
img.src = "http://krakathon.com/wp-content/uploads/2017/07/krakathon2017logo-copy-1030x1030.png";

function draw() {

  var dArr = [-2, -2, 0, -2, 2, -2, -2, 0, 2, 0, -2, 2, 0, 2, 2, 2], // offset array
    s = 2, // thickness scale
    i = 0, // iterator
    x = 5, // final position
    y = 5;

  // draw images at offsets from the array scaled by s
  for (; i < dArr.length; i += 2){

    var xPos = x + dArr[i] * s;
    var yPos = y + dArr[i + 1] * s;

    ctx.drawImage(img, xPos, yPos);
    ctx.beginPath();

    console.log(xPos,yPos);
    
  }
  

  // fill with color
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw original image in normal mode
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(img, x, y);
}