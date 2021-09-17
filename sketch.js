var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy,vampire1,vampire2;
var ground, invisibleGround, groundImage;

var vampiresGroup, vampireImage;
var vampireGroup, vampire1, vampire2;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  boyImg = loadImage("boy.png");
  boy_collided = loadImage("boyscared.png");
  
  //groundImage = loadImage("ground.png");
  
  vampireImage = loadImage("vampire.png");
  
  vampire1 = loadImage("vampire.png");
  vampire2 = loadImage("vampire1.png");
  
  //restartImg = loadImage("restart.png")
  //gameOverImg = loadImage("gameOver.png")
  
  //jumpSound = loadSound("jump.mp3")
  //dieSound = loadSound("die.mp3")
  //checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  boy = createSprite(50,180,20,50);
  boy.addImage("running", boyImg);
  boy.addImage("collided" , boy_collided);
  boy.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   //gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
  //restart = createSprite(300,140);
  //restart.addImage(restartImg);
  
  //gameOver.scale = 0.5;
  //restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  vampireGroup = createGroup();
 
  
  console.log("Hello" + 5);
  
  boy.setCollider("circle",0,0,40);
  boy.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    //gameOver.visible = false
    //restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
    }
    
    //add gravity
    boy.velocityY = boy.velocityY + 0.8
  
  
    spawnvampire();
    
    if(vampireGroup.isTouching(boy)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      //gameOver.visible = true;
      //restart.visible = true;
     
      ground.velocityX = 0;
      boy.velocityY = 0
     
      //change the boy animation
      //boy.changeAnimation("collided", boyscared);
     
      //set lifetime of the game objects so that they are never destroyed
     vampireGroup.setLifetimeEach(-1);
   
     
     vampireGroup.setVelocityXEach(0);
     
   }
  
 
  //stop boy from falling down
  boy.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnvampire(){
 if (frameCount % 60 === 0){
   var vampire = createSprite(400,165,10,40);
   vampire.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: vampire.addImage(vampire);
              break;
      case 2: vampire.addImage(vampire1);
              break;
      
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    vampire.scale = 0.5;
    vampire.lifetime = 300;
   
   //add each obstacle to the group
   vampiresGroup.add(vampire);
 }
}


  


