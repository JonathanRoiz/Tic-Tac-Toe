let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 550;
canvas.height = 550;

let turn = 'red';

y = 0;
x = 0;

let blocks = [];

for (i = 0; i < 3; i++) {
  for (v = 0; v < 3; v++) {
    blocks[blocks.length] = new Block(x,y,canvas.width/3, canvas.height/3,'grey');
    x += canvas.height/3;
  }
  y += canvas.height/3;
  x = 0;
}

function Block(x,y,width,height,color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

let winDisplay = document.getElementById('winDisplay');
let restartButton = document.getElementById('restartButton');
let gameOver = false;

function restart() {
  for (i = 0; i < blocks.length; i++) {
    blocks[i].color = 'grey';
  }
  winDisplay.style.display = 'none';
  restartButton.style.display = 'none';
  gameOver = false;
}

document.body.onmousedown = function(e) { 
  var mousePos = getMousePos(canvas, e);
  if (gameOver == false) {
  if (mousePos.x >= 0 && mousePos.y >= 0 && mousePos.x <= canvas.width && mousePos.y <= canvas.height) {
    let column = Math.floor(mousePos.x/(canvas.width/3))
    let row = Math.floor(mousePos.y/(canvas.height/3))
    if (blocks[column+(row*3)].color == 'grey') {
      blocks[column+(row*3)] = new Block(column * (canvas.height/3), row * (canvas.width/3), canvas.height/3, canvas.height/3, turn);
      if (turn == 'red') {
        turn = 'black';
      } else {
        turn = 'red';
      }
    }

    gameOver = true;
    for (i = 0; i < blocks.length; i++) {
      if (blocks[i].color == 'grey') {
        gameOver = false;
      }
    }

    if (gameOver == true) {
      winDisplay.style.display = 'block';
      restartButton.style.display = 'block';
      winDisplay.innerHTML = 'It is a tie!';
    }

    for (i = 0; i <= 6; i+=3) {
      if (blocks[i].color != 'grey') {
        if (blocks[i].color == blocks[i+1].color && blocks[i+2].color == blocks[i].color) {
          console.log(blocks[i].color);
          winDisplay.style.display = 'block';
          restartButton.style.display = 'block';
          winDisplay.innerHTML = blocks[i].color+' wins!';
          gameOver = true;
        }
      }
    }
    for (i = 0; i < 3; i++) {
      if (blocks[i].color != 'grey') {
        if (blocks[i].color == blocks[i+3].color && blocks[i+6].color == blocks[i].color) {
          console.log(blocks[i].color);
          winDisplay.style.display = 'block';
          restartButton.style.display = 'block';
          winDisplay.innerHTML = blocks[i].color+' wins!';
          gameOver = true;
        }
      }
    }
    if (blocks[2].color != 'grey') {
      if (blocks[2].color == blocks[4].color && blocks[6].color == blocks[2].color) {
        console.log(blocks[2].color);
        winDisplay.style.display = 'block';
        restartButton.style.display = 'block';
        winDisplay.innerHTML = blocks[2].color+' wins!';
        gameOver = true;
      }
    }
    if (blocks[0].color != 'grey') {
      if (blocks[0].color == blocks[4].color && blocks[8].color == blocks[0].color) {
        console.log(blocks[0].color);
        winDisplay.style.display = 'block';
        restartButton.style.display = 'block';
        winDisplay.innerHTML = blocks[0].color+' wins!';
        gameOver = true;
      }
    }
  }
  }
}

setInterval(function() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (i = 0; i < blocks.length; i++) {
    ctx.fillStyle = blocks[i].color
    ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
  }
}, 100);
