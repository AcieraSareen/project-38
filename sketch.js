//vars
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//var imgs
var marshall,marshsallImg;
var ground, invisibleGround, groundImage;
//grps
var skyeGroup, skyeImage;
var rubbleGroup,rubbleImage;
//score
var score=0;
//gameover and rsestart
var gameOver,restart;
//sounds
//var dogsound;



function preload(){
  //loading images
  marshallImg=loadAnimation("Marshall_.png");
  groundImage = loadImage("road1.png");
  skyeImage = loadImage("Jet_skye.png");
  rubbleImage = loadImage("Rubble.png");
  //restart and gameover
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  //sound
  //dogsound=loadSound("dog-barking-close-sound-effect[1].mp3");
  
}

function setup() {
  createCanvas(displayWidth-20, displayHeight-30);
  //marshall
  marshall = createSprite(50,180,20,50);
  marshall.addAnimation("marshall", marshallImg);
  marshall.scale = 0.15;
  //ground
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale=2
  //gameover
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  //restsart
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  //scaling gameover and restart
  gameOver.scale = 0.5;
  restart.scale = 0.1;
  //visibility of gameover and restart
  gameOver.visible = false;
  restart.visible = false;
  //creating the invisible ground so marshall does not falls
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //creating skye and rubbel group
  skyeGroup = new Group();
  rubbleGroup = new Group();
  //setting score to 0 as default
  score = 0;
  
  marshall.setCollider("rectangle",0,0,20,30);
}

function draw() {
  //background and text
  background("lightblue");
  text("Score: "+ score, 500,50);
  //tasks to be done when gameState=PLAY
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && marshall.y >= 155) {
      marshall.velocityY = -12;
    }
  
    marshall.velocityY = marshall.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    marshall.collide(invisibleGround);
    spawnSkye();
    spawnRubble();
  
    if(rubbleGroup.isTouching(marshall)){
        gameState = END;
    }
    //dogsound.play();
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velocity of each game var to 0
    ground.velocityX = 0;
    marshall.velocityY = 0;
    skyeGroup.setVelocityXEach(0);
    rubbleGroup.setVelocityXEach(0);
    
//set lifetime of the game vars so that they are never destroyed
    skyeGroup.setLifetimeEach(-1);
    rubbleGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
        //dogsound.stop();

  }
  
  
  drawSprites();
}

function spawnSkye() {
  //write code here to spawn the flying dog skye
  if (frameCount % 60 === 0) {
    var skye = createSprite(600,10,40,10);

    skye.y = Math.round(random(50,13));
    skye.addImage(skyeImage);
    skye.scale = 0.07;
    skye.velocityX = -3;
    
     //assign lifetime to the vars
    skye.lifetime = 200;
    
    //adjust the depth
    skye.depth = marshall.depth;
    marshall.depth = marshall.depth + 1;
    
    //add skye to the group
    skyeGroup.add(skye);
  }
  
}

function spawnRubble() {
  if(frameCount % 60 === 0) {
    var rubble = createSprite(600,165,10,40);
        

    
    rubble.velocityX = -(6 + 3*score/100);
    rubble.addImage("rubble",rubbleImage);
    //generate rubble randomly
    var rand = Math.round(random(1,6));
   
    
    //assign scale and lifetime to rubble        
    rubble.scale = 0.2;
    rubble.lifetime = 300;
    
    //add each obstacle to the group
    rubbleGroup.add(rubble);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  skyeGroup.destroyEach();
  rubbleGroup.destroyEach();
  
  score = 0;
  
}