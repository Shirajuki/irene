class gameState {
  init() {
    //// CONFIG
    this.started = false;
    this.gameOver = false;
    this.clicked = false;
    this.canvasBlack = document.getElementById("canvasBlack");
    setTimeout(_=> this.canvasBlack.style.opacity = 0, 2200);
    // GUI
    this.canvasGUI2 = document.getElementById("canvasGUI2");
    this.ctxGUI2 = this.canvasGUI2.getContext("2d");
    this.ctxGUI2.webkitImageSmoothingEnabled = false;
    this.ctxGUI2.imageSmoothingEnabled = false;

    this.canvasGUI = document.getElementById("canvasGUI");
    this.ctxGUI = this.canvasGUI.getContext("2d");
    this.ctxGUI.webkitImageSmoothingEnabled = false;
    this.ctxGUI.imageSmoothingEnabled = false;
    // MAIN
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    // FX
    this.canvasFX = document.getElementById("canvasFX");
    this.ctxFX = this.canvasFX.getContext("2d");
    this.ctxFX.webkitImageSmoothingEnabled = false;
    this.ctxFX.imageSmoothingEnabled = false;
    // BG
    this.canvasBG = document.getElementById("canvasBG");
    this.ctxBG = this.canvasBG.getContext("2d");
    this.ctxBG.webkitImageSmoothingEnabled = false;
    this.ctxBG.imageSmoothingEnabled = false;
    this.bg1X = 0;
    this.bg2X = 638;
    this.bgScrollSpeedMax = 10;
    this.bgScrollSpeed = this.bgScrollSpeedMax;

    //// CONTROLS
    this.controls = {
      "jump": false,
      "slide": false,
      "special": false,
    };
    this.jumpConstant = 12;
    this.gravityConstant = 1;
    this.dbJumpTimeMax = 500;
    this.dbJumpTime1 = 500;
    this.dbJumpTime = 400;
    this.jumped = 0;
    //// PLAYER
    this.objects = [new ObjectObject(-100, this.canvas.height - 52, 0,0,this.canvas.width+100, 35), new Platform(this.canvas.width, this.canvas.height - 130, -1,0,this.canvas.width, 30)];
    this.player = {
      "x": 100,
      "y": this.canvas.height - 90 - 60,
      "vx": 0,
      "vy": 0,
      "width": 42,
      "height": 84,
      "bumpObject": this.objects[0],
      "downBumping": false,
      "upReleasedInAir": false, //upon landing, reset to false
      "doubleJumpReady": true, //upon landing, reset to true
      "jumping": false,
      "doubleJumping": false,
      "sliding": false,
      "hit": false,
      "hitFrame": false,
      "invulnerable": false,
      "frameMax": 4,
      "frame": 0,
      "frameTimeMax": 2,
      "frameTime": 0,
    };
    //// SASAENG
    this.sasaeng = {
      "x": -60,
      "y": 264,
      "width": 42,
      "height": 84,
      "pBumpCount": 0,
      "bumpFadeTime": 0,
      "bumpFadeTimeMax": 60*8,
      "frameMax": 4,
      "frame": 0,
      "frameTimeMax": 2,
      "frameTime": 0,
    };
    //// OBJECTS
    // BGObject
    this.BGObjects = [];
    // ground
    this.BGObjects.push(new BGObjects(this.canvas.width, this.canvas.height - 52, -0.9,0,124,120,0,ground));
    // Parallax 1
    this.BGObjects.push(new BGObjects(this.canvas.width, 0, -0.3,0,this.canvas.width+100,this.canvas.height,this.canvas.width*4,bg2,"bg1"));
    // Parallax 2
    this.BGObjects.push(new BGObjects(this.canvas.width, -100, -0.7,0,this.canvas.width,this.canvas.height+100,0,bg2,"bg2"));

    // Obstacles
    this.obstacles = [];
    this.lastSpawnTime = new Date().getTime();
    //// GUI
    this.numbers = [0,59,125,190,254,319,384,449,514,579];
    this.score = 0;
    this.score1 = 0, this.score10 = 0, this.score100 = 0, this.score1000 = 0, this.score10000 = 0, this.score100000 = 0, this.score1000000 = 0, this.score10000000 = 0, this.score100000000 = 0;
  }
  updateScore() {
    if (this.score > 1000000000) {
      this.score1 = 9, this.score10 = 9, this.score100 = 9, this.score1000 = 9, this.score10000 = 9, this.score100000 = 9, this.score1000000 = 9, this.score10000000 = 9, this.score100000000 = 9;
    } else {
      this.score100000000 = Math.floor(this.score/100000000).toString().split("").reverse()[0];
      this.score10000000 = Math.floor(this.score/10000000).toString().split("").reverse()[0];
      this.score1000000 = Math.floor(this.score/1000000).toString().split("").reverse()[0];
      this.score100000 = Math.floor(this.score/100000).toString().split("").reverse()[0];
      this.score10000 = Math.floor(this.score/10000).toString().split("").reverse()[0];
      this.score1000 = Math.floor(this.score/1000).toString().split("").reverse()[0];
      this.score100 = Math.floor(this.score/100).toString().split("").reverse()[0];
      this.score10 = Math.floor(this.score/10).toString().split("").reverse()[0];
      this.score1 = Math.floor(this.score/1).toString().split("").reverse()[0];
    }
  }
  backgroundSpeedUpdate(n) {
    this.bgScrollSpeedMax = n;
    this.bgScrollSpeed = this.bgScrollSpeedMax;
  }
  backgroundLoop() {
    if (this.screenShake) {
      this.ctxBG.save();
      this.ctxBG.translate(Math.random()*5, Math.random()*5);
    }
    if (this.gameOver && badboy.volume-0.05 > 0) {
      badboy.volume -= 0.05;
    }
    this.bg1X -= this.bgScrollSpeed*0.1;
    this.bg2X -= this.bgScrollSpeed*0.1;
    if (this.bg1X <= -638) this.bg1X = 638;
    if (this.bg2X <= -638) this.bg2X = 638;
    this.ctxBG.beginPath();
    this.ctxBG.clearRect(0,0,this.canvasBG.width,this.canvasBG.height);
    this.ctxFX.clearRect(0,0,this.canvasBG.width,this.canvasBG.height);
    // this.ctxBG.drawImage(bg,0,0,this.canvasBG.width,this.canvasBG.height,this.bg1X,0,this.canvasBG.width,this.canvasBG.height);
    // this.ctxBG.drawImage(bg,0,0,this.canvasBG.width,this.canvasBG.height,this.bg2X,0,this.canvasBG.width,this.canvasBG.height);
    this.ctxBG.drawImage(bg2,2,2+322,857,317,this.bg1X,0,this.canvasBG.width,this.canvasBG.height);
    this.ctxBG.drawImage(bg2,2,2+322,857,317,this.bg2X,0,this.canvasBG.width,this.canvasBG.height);
    if (this.screenShake) {
      this.ctxBG.restore();
    }
  }
  introMove(obj,num) {
    obj.x += num;
  }
  drawGUI() {
    this.ctxGUI.clearRect(0,0,this.canvasGUI.width,this.canvasGUI.height);
    this.ctxGUI2.clearRect(0,0,this.canvasBG.width,this.canvasGUI2.height);
    this.ctxGUI.beginPath();
    if (!this.started) {
      if (!this.gameOver) {
        this.ctxGUI.drawImage(font, 0, 0, 510, 55, this.canvas.width/2 - 100, this.canvas.height/2-100, 200, 24); // START
      } else {
        this.ctxGUI2.drawImage(font, 0, 55*5, 416, 55, this.canvas.width/2-100, this.canvas.height/2-100, 200, 24); // GameOver
        this.ctxGUI2.drawImage(font, this.numbers[this.score100000000], 55, 50, 55, 5+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI2.drawImage(font, this.numbers[this.score10000000], 55, 50, 55, 30+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI2.drawImage(font, this.numbers[this.score1000000], 55, 50, 55, 55+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI2.drawImage(font, this.numbers[this.score100000], 55, 50, 55, 80+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI2.drawImage(font, this.numbers[this.score10000], 55, 50, 55, 105+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI2.drawImage(font, this.numbers[this.score1000], 55, 50, 55, 130+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI2.drawImage(font, this.numbers[this.score100], 55, 50, 55, 155+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI2.drawImage(font, this.numbers[this.score10], 55, 50, 55, 180+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI2.drawImage(font, this.numbers[this.score1], 55, 50, 55, 205+this.canvas.width/4+45, this.canvas.height/2-50, 25, 25); // 0
        this.ctxGUI.drawImage(font, 0, 55*6, 570, 55, this.canvas.width/2-135, this.canvas.height/2, 280, 24); // GameOver
      }
    } else {
      // this.ctxGUI.drawImage(font, 0, 55, 50, 55, 10, 10, 25, 25); // NOTE
      // this.ctxGUI.drawImage(font, 0, 112, 50, 55, 35, 17, 15, 15); // x
      this.ctxGUI.drawImage(font, this.numbers[this.score100000000], 55, 50, 55, 5, 10, 25, 25); // 0
      this.ctxGUI.drawImage(font, this.numbers[this.score10000000], 55, 50, 55, 30, 10, 25, 25); // 0
      this.ctxGUI.drawImage(font, this.numbers[this.score1000000], 55, 50, 55, 55, 10, 25, 25); // 0
      this.ctxGUI.drawImage(font, this.numbers[this.score100000], 55, 50, 55, 80, 10, 25, 25); // 0
      this.ctxGUI.drawImage(font, this.numbers[this.score10000], 55, 50, 55, 105, 10, 25, 25); // 0
      this.ctxGUI.drawImage(font, this.numbers[this.score1000], 55, 50, 55, 130, 10, 25, 25); // 0
      this.ctxGUI.drawImage(font, this.numbers[this.score100], 55, 50, 55, 155, 10, 25, 25); // 0
      this.ctxGUI.drawImage(font, this.numbers[this.score10], 55, 50, 55, 180, 10, 25, 25); // 0
      this.ctxGUI.drawImage(font, this.numbers[this.score1], 55, 50, 55, 205, 10, 25, 25); // 0
    }
  }
  updatePlayer() {
    if (!this.player.hit) {
      this.player.y += this.player.vy;
      // console.log(this.player.vy)
      if (this.player.sliding && !this.player.downBumping) {
        this.player.vy += this.gravityConstant;
      }
      // BUMPING
      if (this.player.downBumping) { //if we are touching the floor
        if (this.player.vy >= 0) {
          let platform = 0;
          if (this.player.bumpObject.y == undefined) { platform = 370; }
          else { platform = this.player.bumpObject.y }
          this.player.y = platform - 84;
          this.player.vy = 0;
          this.player.jumping = false;
        }
        if (this.controls.jump) { //and if the up arrow is pressed
          console.log("JUMP");
          this.jumped = 1;
          this.dbJumpTime1 = this.dbJumpTimeMax;
          setTimeout(_=> this.jumped = 0, this.dbJumpTime);
          this.player.vy = -this.jumpConstant; //set the y speed to the jump constant
          this.player.jumping = true;
          this.player.upReleasedInAir = false;
        }
      } else {
        this.player.vy += this.gravityConstant;
      }
      // Double jump
      if (this.player.doubleJumpReady && this.player.upReleasedInAir){ // if both variables are true
        if (this.controls.jump) { //and if the up arrow is pressed
          console.log("2-DOUBLE JUMP");
          if (this.jumped == 1 && !this.player.doubleJumping) {
            this.jumped = 0;
            this.player.frame = 0;
            this.player.doubleJumping = true;
          }
          this.player.vy = -this.jumpConstant-this.jumpConstant/10; //set the y speed to the jump constant
          this.player.doubleJumpReady = false; //then, prevent additional double jumps
          this.player.jumping = true;
        }
      }
    } else {
      this.player.hit = false;
      this.player.invulnerable = true;
      this.player.frame = 0;
      this.player.hitFrame = true;
      this.canvasBlack.style.backgroundColor = "rgb(255,0,0)";
      this.canvasBlack.style.opacity = "0.7";
      setTimeout(_=> {
        this.canvasBlack.style.opacity = "0";
      },200);
      setTimeout(_=> this.canvasBlack.style.backgroundColor = "rgb(0,0,0)", 2000);
      this.sasaeng.pBumpCount++;
      this.sasaeng.bumpFadeTime = 0;
      this.bgScrollSpeed = -1*this.bgScrollSpeedMax;
      setTimeout(_=> this.player.invulnerable = false, 2000);
    }
  }
  over() {
    if (!this.gameOver) {
      this.gameOver = true;
      this.started = false;
      console.log("Game OVER!")
      this.bgScrollSpeedMax = 0;
      this.clicked = false;
      this.canvasGUI2.style.opacity = "1";
      this.canvasBlack.style.opacity = ".25";
      setTimeout(_=> {
        this.canvasBlack.style.opacity = ".5";
      },201);

      this.canvasBlack.style.backgroundColor = "rgb(0,0,0)";
      this.canvasGUI.style.animation = "pop 1s ease infinite";

      setTimeout(_=> {
        this.objects = this.objects.slice(0,1);
        this.obstacles = [];
      },100);
    }
  }
  draw() {
    if (this.bgScrollSpeed < this.bgScrollSpeedMax) { this.bgScrollSpeed += 0.5; }
    if (this.gameOver && this.bgScrollSpeed > this.bgScrollSpeedMax) { this.bgScrollSpeed -= 0.05; }
    // PLAYER FRAME
    if (this.gameOver) {
      this.player.frameMax = 2;
      this.player.frameTimeMax = 30;
      this.sasaeng.frameMax = 2;
      this.sasaeng.frameTimeMax = 24;
    } else if (this.player.hitFrame) {
      this.player.frameMax = 1;
      this.player.frameTimeMax = 24;
    } else if (this.player.sliding) {
      this.player.frameMax = 2;
      this.player.frameTimeMax = 4;
    } else if (this.player.doubleJumping) {
      this.player.frameMax = 7;
      this.player.frameTimeMax = 4;
    } else if (this.player.jumping && !this.player.doubleJumping ) {
      this.player.frameMax = 2;
      this.player.frameTimeMax = 4;
    } else {
      this.player.frameMax = 4;
      this.player.frameTimeMax = 2;
    }
    if (this.player.frameTime == this.player.frameTimeMax) {
      this.player.frame++;
      this.player.frameTime = 0;
      if (this.player.frame == this.player.frameMax) this.player.doubleJumping = false;
      if (this.player.hitFrame && this.player.frame == this.player.frameMax) this.player.hitFrame = false;
    }
    else { this.player.frameTime++; }
    if (this.player.frame >= this.player.frameMax) this.player.frame = 0;
    if (this.player.frameTime > this.player.frameTimeMax) this.player.frameTime = 0;

    // SASAENG FRAME
    if (this.sasaeng.frameTime == this.sasaeng.frameTimeMax) {
      this.sasaeng.frame++;
      this.sasaeng.frameTime = 0;
    }
    else { this.sasaeng.frameTime++; }
    if (this.sasaeng.frame >= this.sasaeng.frameMax) this.sasaeng.frame = 0;

    // BUMPFADE TIME
    if (this.sasaeng.bumpFadeTime == this.sasaeng.bumpFadeTimeMax) { this.sasaeng.bumpFadeTime = 0; this.sasaeng.pBumpCount = 0; }
    else { this.sasaeng.bumpFadeTime++; }

    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "white";
    let slide = 1, height;
    if (this.player.sliding) { slide = 2; height = this.player.height/2; }
    else { slide = 1; height = 0; }
    // this.ctx.strokeRect(this.player.x, this.player.y+height, this.player.width, this.player.height/slide); // og
    // this.ctx.strokeRect(this.sasaeng.x, this.sasaeng.y, this.sasaeng.width, this.sasaeng.height); // og
    // this.ctx.drawImage(img, 48*this.player.frame, 0, 48, 48, this.player.x-24, this.player.y, this.player.width+48, this.player.height);
    if (this.gameOver) {
      this.ctx.drawImage(cookie, 2+272*(5+this.player.frame), 2+272*4, 270, 270, this.player.x-74, this.player.y-95, 180, 180);
      this.ctx.drawImage(cookie2, 2+272*(6+this.sasaeng.frame), 2+272*2, 270, 270, this.sasaeng.x-74, this.sasaeng.y-95, 180, 180);
    } else {
      if (this.player.hitFrame) {
        this.ctx.drawImage(cookie, 2+272*(5+this.player.frame), 2+272*4, 270, 270, this.player.x-74, this.player.y-95, 180, 180);
      } else if (this.player.sliding) {
        this.ctx.drawImage(cookie, 2+272*(9+this.player.frame), 2, 270, 270, this.player.x-74, this.player.y-95, 180, 180);
      } else if (this.player.doubleJumping) {
        this.ctx.drawImage(cookie, 2+272*this.player.frame, 2, 270, 270, this.player.x-74, this.player.y-95, 180, 180);
      } else if (this.player.jumping && !this.player.doubleJumping) {
        this.ctx.drawImage(cookie, 2+272*(7+this.player.frame), 2, 270, 270, this.player.x-74, this.player.y-95, 180, 180);
      } else {
        this.ctx.drawImage(cookie, 2+272*this.player.frame, 2+272, 270, 270, this.player.x-74, this.player.y-95, 180, 180);
      }
      this.ctx.drawImage(cookie2, 2+272*this.sasaeng.frame, 2+272, 270, 270, this.sasaeng.x-74, this.sasaeng.y-95, 180, 180);
    }
  }
  collide(object1, object2) {
    if (object1 == this.player && this.player.sliding && !this.objects.includes(object2)) {
      return (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
      object1.y < object2.y + object2.height/2 && object1.y + object1.height/2 > object2.y);
    } else {
      return (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
      object1.y < object2.y + object2.height && object1.y + object1.height > object2.y);
    }
  }
  collideSides(object1, object2) {
    if (this.collide(object1, object2)) {
      if (object1.x + object1.width > object2.x && object1.x < object2.x + object2.width && object1.y > object2.y - object1.height && object1.y + object1.height < object2.y + object2.height*2) {
        this.player.downBumping = true;
        setTimeout(_=> this.player.doubleJumpReady = true,100);
        this.player.bumpObject = object2;
        // COPY
        if (this.player.vy > 0) {
          let platform = this.player.bumpObject.y;
          this.player.y = platform - 84;
          this.player.vy *= 0.01;
          this.player.jumping = false;
        }
        if (this.controls.jump) { //and if the up arrow is pressed
          console.log("JUMP");
          this.jumped = 1;
          setTimeout(_=> this.jumped = 0, this.dbJumpTime);
          this.dbJumpTime1 = this.dbJumpTimeMax;
          this.player.vy = -this.jumpConstant; //set the y speed to the jump constant
          this.player.upReleasedInAir = false;
        }
      }
    } else {
      this.player.downBumping = false;
      if (this.player.bumpObject.y == undefined) this.player.bumpObject = this.objects[0];
    }
  }
}
