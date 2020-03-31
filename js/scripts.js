let myGamePiece;
let myObstacle;
const globalSpeed = 5;

function startGame() {
  myGamePiece = new component(
    30,
    30,
    'https://i.pinimg.com/originals/84/c6/92/84c6921fe8ad81b9d0138289df482fc3.png',
    10,
    120,
    'image'
  );
  myObstacle = new component(
    100,
    100,
    'https://lh3.googleusercontent.com/proxy/kC-F3ulSV1SAgWobLEfa4XSlFkIqy_dxLgKFBHclP0MwQcMtShLvmOL8ZDpOVtZUHySKGGZKTU6AUEuadOeyob6u4cDI9X49',
    300,
    50,
    'image',
    20,
    30,
    360,
    300,
  );
  myGameArea.start();
}

let myGameArea = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function(e) {
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = e.type == 'keydown';
    });
    window.addEventListener('keyup', function(e) {
      myGameArea.keys[e.keyCode] = e.type == 'keydown';
    });
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function component(
  width,
  height,
  color,
  x,
  y,
  type,
  startX,
  startY,
  imageWidth,
  imageHeight,
) {
  this.gamearea = myGameArea;
  if (type == 'image') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    if (type === 'image') {
      if ((startX, startY, imageWidth, imageHeight)) {
        ctx.drawImage(
          this.image,
          startX,
          startY,
          imageWidth,
          imageHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );
      } else {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function(otherobj) {
    const myleft = this.x;
    const myright = this.x + this.width;
    const mytop = this.y;
    const mybottom = this.y + this.height;
    const otherleft = otherobj.x;
    const otherright = otherobj.x + otherobj.width;
    const othertop = otherobj.y;
    const otherbottom = otherobj.y + otherobj.height;
    let crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }

    const crashTop = crash && mybottom === othertop;
    const crashBottom = crash && mytop === otherbottom;
    const crashLeft = crash && myright === otherleft;
    const crashRight = crash && myleft === otherright;
    return {
      crash,
      top: crashTop,
      bottom: crashBottom,
      left: crashLeft,
      right: crashRight
    };
  };
}

function updateCrashed(obstacleCrashed) {
  myGameArea.clear();
  myObstacle.update();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (!obstacleCrashed.right && myGameArea.keys && myGameArea.keys[65]) {
    myGamePiece.speedX = -globalSpeed;
  }
  if (!obstacleCrashed.left && myGameArea.keys && myGameArea.keys[68]) {
    myGamePiece.speedX = globalSpeed;
  }
  if (!obstacleCrashed.bottom && myGameArea.keys && myGameArea.keys[87]) {
    myGamePiece.speedY = -globalSpeed;
  }
  if (!obstacleCrashed.top && myGameArea.keys && myGameArea.keys[83]) {
    myGamePiece.speedY = globalSpeed;
  }
  myGamePiece.newPos();
  myGamePiece.update();
}

function update() {
  myGameArea.clear();
  myObstacle.update();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.keys && myGameArea.keys[65]) {
    myGamePiece.speedX = -globalSpeed;
  }
  if (myGameArea.keys && myGameArea.keys[68]) {
    myGamePiece.speedX = globalSpeed;
  }
  if (myGameArea.keys && myGameArea.keys[87]) {
    myGamePiece.speedY = -globalSpeed;
  }
  if (myGameArea.keys && myGameArea.keys[83]) {
    myGamePiece.speedY = globalSpeed;
  }
  myGamePiece.newPos();
  myGamePiece.update();
}

function updateGameArea() {
  const obstacleCrashed = myGamePiece.crashWith(myObstacle);
  if (obstacleCrashed.crash) {
    updateCrashed(obstacleCrashed);
  } else {
    update();
  }
}
