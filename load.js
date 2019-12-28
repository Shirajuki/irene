//// LOADS
let gameLoaded = false;
let loadedImg = 0;
//// IMAGES
// BG
const bg = new Image();
bg.src = 'dungeon.png';
bg.onload = () => {
  loadedImg++;
  checkLoaded();
};
// BG2
const bg2 = new Image();
bg2.src = 'bg.png';
bg2.onload = () => {
  loadedImg++;
  checkLoaded();
};
// Ground
const ground = new Image();
ground.src = 'tb1.png';
ground.onload = () => {
  loadedImg++;
  checkLoaded();
};
// Ground
const platform = new Image();
platform.src = 'fh.png';
platform.onload = () => {
  loadedImg++;
  checkLoaded();
};
// Player Sprite
const cookie = new Image();
cookie.src = 'Sasaeng_Sprite.png';
cookie.onload = () => {
  loadedImg++;
  checkLoaded();
};
// font
const font = new Image();
font.src = 'font.png';
font.onload = () => {
  loadedImg++;
  checkLoaded();
};
// Obstacles
const obstacle_low1 = new Image();
obstacle_low1.src = 'jp1A.png';
obstacle_low1.onload = () => {
  loadedImg++;
  checkLoaded();
}
const obstacle_low2 = new Image();
obstacle_low2.src = 'jp1B.png';
obstacle_low2.onload = () => {
  loadedImg++;
  checkLoaded();
}
const obstacle_middle1 = new Image();
obstacle_middle1.src = 'jp2A.png';
obstacle_middle1.onload = () => {
  loadedImg++;
  checkLoaded();
}
const obstacle_middle2 = new Image();
obstacle_middle2.src = 'jp2B.png';
obstacle_middle2.onload = () => {
  loadedImg++;
  checkLoaded();
}
const obstacle_high1 = new Image();
obstacle_high1.src = 'sdA.png';
obstacle_high1.onload = () => {
  loadedImg++;
  checkLoaded();
}
const obstacle_high2 = new Image();
obstacle_high2.src = 'sdB.png';
obstacle_high2.onload = () => {
  loadedImg++;
  checkLoaded();
}
function checkLoaded() {
  if (loadedImg == 12) {
    game.init();
    gameLoop();
    console.log("Start game");
    gameLoaded = true;
  }
}
