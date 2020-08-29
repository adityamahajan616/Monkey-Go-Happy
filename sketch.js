var bananaImg, obstacleImg, obstacleGrp, bkground, backgroundImg, score, monkey, monkeyRun, bananaGrp, invGround;

function preload() 
{
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  backgroundImg = loadImage("jungle.jpg");
  
  monkeyRun = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(400, 400);
  
  bkground = createSprite(200,200,400,400);
  bkground.addImage("bg_image",backgroundImg);
  
  invGround = createSprite(200,390,400,30);
  invGround.visible = false;
  
  bananaGrp = new Group();
  obstacleGrp = new Group();
  
  score = 0;
  
  monkey = createSprite(70,340,50,50);
  monkey.addAnimation("running",monkeyRun);
  monkey.scale = 0.1;
  
  
}

function draw() {
  background("white");
  
  //moving background
  bkground.velocityX=-7;
  if (bkground.x<=0)
  {
    bkground.x=bkground.width/2;
  }
   
  //jumping
  if (keyDown("space")&&monkey.y>=320)
  {
    monkey.velocityY = -15;
  }
  //console.log(monkey.y);
  
  //gravity & ground collision
  monkey.velocityY=monkey.velocityY+1;
  monkey.collide(invGround);
  
  //eating banana
  if (bananaGrp.isTouching(monkey)) {
    score = score+10;
    bananaGrp.destroyEach();
  }
  
  //size increase
  switch(score) {
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    case 50: monkey.scale = 0.2;
      break;
      default: break;
  }
  
  //touching rock
  if (obstacleGrp.isTouching(monkey)) {
    monkey.scale = 0.1;
  }
  
  //spawning
  spawnBananas();
  spawnObstacles();
  
  drawSprites();
  
  //score display
  strokeWeight(5);
  stroke("red");
  textSize(20);
  fill("white");
  text("Score: "+score,30,45);
}


function spawnBananas()
{
  if (World.frameCount%120===0) {
    var banana = createSprite(410,random(240,300),40,40);
    banana.addImage("bananaImg",bananaImg);
    banana.scale = 0.05;
    
    banana.velocityX=random(-12,-5);
    banana.lifetime=90;
    
    bananaGrp.add(banana);
  }
}


function spawnObstacles()
{
  if (World.frameCount%240===0) {
    var obstacle = createSprite(430,346,40,40);
    obstacle.addImage("obstacleImg",obstacleImg);
    obstacle.scale = 0.22;
    
    obstacle.velocityX=-7;
    obstacle.lifetime=90;
    
    obstacleGrp.add(obstacle);
  }
}
