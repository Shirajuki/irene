// https://www.spriters-resource.com/mobile/cookierun/
class ObjectObject {
  constructor(x,y,dx,dy,width,height) {
    this.y = y;
    this.x = x;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;

    this.frameMax = 3;
    this.frame = 0;
    this.frameTime = 0;
    this.frameTimeMax = 6;
  }
  draw() {
    game.ctx.beginPath();
    game.ctx.fillStyle = "white";
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  move() {
    this.x += this.dx*game.bgScrollSpeed;
    this.y += this.dy*game.bgScrollSpeed;
  }
}
class Platform extends ObjectObject{
  constructor(x,y,dx,dy,width,height) {
    super(x,y,dx,dy,width,height);
    this.widthCount = Math.floor(this.width/platform.width);
    this.width = this.widthCount * platform.width
  }
  draw() {
    game.ctx.beginPath();
    for (let i = this.widthCount; i >= 0; i--) {
      game.ctx.drawImage(platform,0,0,platform.width,platform.height,this.x,this.y,platform.width*i,this.height);
    }
  }
}
class BGObjects extends ObjectObject {
  constructor(x,y,dx,dy,width,height,paddingX,img,type="normal") {
    super(x,y,dx,dy,width,height);
    this.startX = x;
    this.startY = y;
    this.paddingX = paddingX;
    this.img = img;
    this.type = type;
    this.spawned = false;
  }
  draw() {
    game.ctx.beginPath();
    game.ctxBG.beginPath();
    game.ctxFX.beginPath();
    if (this.type == "bg2") {
      game.ctxFX.drawImage(this.img,2+1710,2+1290,850,318,this.x,this.y,this.width,this.height);
    } else if (this.type == "bg1") {
      game.ctxBG.drawImage(this.img,2+856,2+1290,850,318,this.x,this.y,this.width,this.height);
    } else {
      game.ctx.drawImage(this.img,0,0,124,120,this.x,this.y,this.width,this.height);
    }
    if (!this.spawned && this.x <= game.canvas.width-this.width+15-this.paddingX) {
      this.spawned = true;
      game.BGObjects.push(new BGObjects(this.startX, this.startY, this.dx, this.dy, this.width, this.height, this.paddingX, this.img, this.type));
    }
  }
}
class Obstacles extends ObjectObject {
  constructor(x,y,dx,dy,width,height,img,type) {
    super(x,y,dx,dy,width,height);
    this.img = img;
    this.type = type;
  }
  draw() {
    game.ctx.beginPath();
    // game.ctx.fillStyle = "black";
    game.ctx.lineWidth = 2;
    // game.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.type == "low") { game.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.x,this.y,this.width,this.height); }
    else if (this.type == "middle") { game.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.x,this.y,this.width,this.height); }
    else if (this.type == "high") { game.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.x,this.y,this.width,this.height); }
    // game.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
const game = new gameState();
//// EVENT
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let isMobile = false;
if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || /Android|iPhone|Windows Phone|webOS|iPod|BlackBerry/i.test(navigator.userAgent)) {
  isMobile = true;
  // console.log = function() {};
};

function keyDownHandler(e) {
  if (!game.gameOver) {
    if(e.keyCode == 38) {
      game.controls.jump = true;
    }
    else if(e.keyCode == 40) {
      game.controls.slide = true;
    }
    else if(e.keyCode == 90) {
      game.controls.special = true;
    }
    else if(e.keyCode == 32) {
      console.log("SPACE debug");
      spawnObstacles(randint(1,10));
    }
  }
}
function spawnObstacles(num) {
  let height = 60; // low
  let height2 = 120; // middle
  let height3 = game.canvas.height-100; //high
  let width = 60;
  let paddingX = 10;
  game.lastSpawnTime = millis();
  if (num == 1 || num == 2) {
    let num2 = randint(1,4);
    if (num == 1) game.obstacles.push(new Obstacles(game.canvas.width+paddingX, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low1,"low"));
    if (num2 == 1) game.obstacles.push(new Obstacles(game.canvas.width+paddingX, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low1,"low"));
    if (num2 == 2) game.obstacles.push(new Obstacles(game.canvas.width+paddingX, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low2,"low"));
    if (num == 2) {
      game.obstacles.push(new Obstacles(game.canvas.width+paddingX, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low2,"low"));
      if (num2 == 1) game.obstacles.push(new Obstacles(game.canvas.width+paddingX, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low1,"low"));
      if (num2 == 2) game.obstacles.push(new Obstacles(game.canvas.width+paddingX, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low2,"low"));
    }
  }
  if (num == 3) game.obstacles.push(new Obstacles(game.canvas.width+paddingX, game.canvas.height - 50 - height2, -1,0, width, height2,obstacle_middle1,"middle"));
  if (num == 4) game.obstacles.push(new Obstacles(game.canvas.width+paddingX, game.canvas.height - 50 - height2, -1,0, width, height2,obstacle_middle2,"middle"));
  if (num == 5 || num == 6) {
    let num2 = randint(1,4)
    if (num == 5) game.obstacles.push(new Obstacles(game.canvas.width+paddingX, 0, -1,0, width+40, height3,obstacle_high1,"high"));
    if (num2 == 1) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+width+40, 0, -1,0, width+40, height3,obstacle_high1,"high"));
    if (num2 == 2) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+width+40, 0, -1,0, width+40, height3,obstacle_high2,"high"));
    if (num == 6) {
      game.obstacles.push(new Obstacles(game.canvas.width+paddingX, 0, -1,0, width+40, height3,obstacle_high2,"high"));
      if (num2 == 1) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+width+40, 0, -1,0, width+40, height3,obstacle_high1,"high"));
      if (num2 == 2) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+width+40, 0, -1,0, width+40, height3,obstacle_high2,"high"));
    }
  }
  if (num == 7 || num == 8 || num == 9 || num == 10) {
    let platfWidth = randint(1,4)*platform.width;
    game.objects.push(new Platform(game.canvas.width+paddingX, game.canvas.height - 130, -1,0, platfWidth, 30));
    num = randint(1,5);
    let num2 = randint(1,5);
    if (num == 1) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+10+platfWidth, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low1,"low"));
    if (num == 2) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+10+platfWidth, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low2,"low"));
    if (num == 3) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+10+platfWidth, game.canvas.height - 50 - height2, -1,0, width, height2,obstacle_middle1,"middle"));
    if (num == 4) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+10+platfWidth, game.canvas.height - 50 - height2, -1,0, width, height2,obstacle_middle2,"middle"));
    if (num2 == 1) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+width+10+platfWidth, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low1,"low"));
    if (num2 == 2) game.obstacles.push(new Obstacles(game.canvas.width+paddingX+width+10+platfWidth, game.canvas.height - 50 - height, -1,0, width, height,obstacle_low2,"low"));
    if (num == 5) {
      let platfWidth2 = randint(1,4)*platform.width;
      game.objects.push(new Platform(game.canvas.width+paddingX+10+platfWidth, game.canvas.height - 230, -1,0, platfWidth, 30));
    }
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 38) {
    game.controls.jump = false;
    game.player.upReleasedInAir = true;
  }
  else if(e.keyCode == 40) {
    game.controls.slide = false;
  }
  else if(e.keyCode == 90) {
    game.controls.special = false;
  }
}
// START ON TOUCH/CLICK
canvasGUI2.addEventListener('click', startGame);
document.getElementById('startBtn').addEventListener('click', startGame);
function startGame() {
  if (!game.clicked) {
    document.getElementById('menu').style.opacity = 0;
    document.getElementById('menu').style.pointerEvents = "None";
    game.init();
    game.clicked = true;
    game.canvasBlack.style.transition = "opacity 0s";
    game.canvasBlack.style.opacity = 1;
    game.canvasGUI.style.opacity = 0;
    game.canvasGUI.style.animation = "None";
    badboy.load();
    badboy.play();
    badboy.volume = 0.5;
    setTimeout(_=> {
      game.started = true;
      game.canvasBlack.style.transition = "opacity .5s";
      game.canvasGUI.style.opacity = 1;
    },600)
  }
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function millis() {
  return new Date().getTime();
}
function gameLoop() {
  // Draw loop
  game.updatePlayer();
  game.draw();
  game.drawGUI();
  game.backgroundLoop();
  if (game.started && !game.gameOver) {
    game.score++;
    game.updateScore();
    if (randint(0,50) == 0) {
      if (millis() - game.lastSpawnTime > 2000) spawnObstacles(randint(1,10));
    }
  }
  // PLAYER INTRO ON-START
  if (!game.gameOver) {
    if (game.started && game.player.x < 200) game.introMove(game.player,5);
    // Sasaeng move in/move out
    if (game.sasaeng.pBumpCount == 1 && game.sasaeng.x < 100) game.introMove(game.sasaeng,5);
    if (game.sasaeng.pBumpCount == 0 && game.sasaeng.x > -60) game.introMove(game.sasaeng,-5);
  } else {
    if (game.player.x < 300) game.introMove(game.player,5);
    if (game.sasaeng.x < 200) game.introMove(game.sasaeng,5);
  }
  if (game.sasaeng.pBumpCount >= 2) {
    game.over();
  }
  // Platforms
  for (let i = game.objects.length-1; i >= 0; i--) {
    const obj = game.objects[i];
    if (i != 0) obj.draw();
    obj.move();
    game.collideSides(game.player,obj);
    if (obj.x < -1.25*obj.width) game.objects.splice(i,1);
  }
  // Obstacles
  for (let i = game.obstacles.length-1; i >= 0; i--) {
    const obj = game.obstacles[i];
    obj.draw();
    obj.move();
    if (game.collide(game.player, obj) && !game.player.invulnerable) {
      console.log("HIT OBSTACLE!");
      game.player.hit = true;
    }
    if (obj.x < -1.25*obj.width) game.obstacles.splice(i,1);
  }
  // BGObjects
  for (let i = game.BGObjects.length-1; i >= 0; i--) {
    const obj = game.BGObjects[i];
    obj.draw();
    obj.move();
    if (obj.x < -1*obj.width - obj.paddingX - 100) game.BGObjects.splice(i,1);
  }
  if (game.controls.slide) { game.player.sliding = true; }
  else { game.player.sliding = false; }
  requestAnimationFrame(gameLoop);
}
const buttons = document.getElementsByClassName('btn');
buttons[0].addEventListener('touchstart', function(event) {
  if (game.gameOver) {
    event.preventDefault(); game.controls.jump = true; this.style.backgroundColor = "rgba(0,0,0,.7)";
  }
});
buttons[0].addEventListener('touchend', function(event) { event.preventDefault(); game.controls.jump = false; game.player.upReleasedInAir = true; this.style.backgroundColor = "rgba(0,0,0,.4)"; });
buttons[1].addEventListener('touchstart', function(event) {
  if (game.gameOver) {
    event.preventDefault(); game.controls.slide = true; this.style.backgroundColor = "rgba(0,0,0,.7)";
  }
});
buttons[1].addEventListener('touchend', function(event) { event.preventDefault(); game.controls.slide = false; this.style.backgroundColor = "rgba(0,0,0,.4)"; });
document.addEventListener('touchstart', preventZoom);
document.addEventListener('click', function(event) {event.preventDefault();});
document.addEventListener('dblclick', function(event) {event.preventDefault();});
function preventZoom(e) {
  var t2 = e.timeStamp;
  var dt = t2 - 0;
  var fingers = e.touches.length;

  if (!dt || dt > 500 || fingers > 1) return; // not double-tap

  e.preventDefault();
  e.target.click();
}
