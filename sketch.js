var dog, dogHappy;
var foodStock,foodS;
var changinggameState, readState,gameState;
var bedroom, garden, washroom;
var feed, addFood;
var lastFed;
var currentTime;
var milk;

function preload(){
  dogImg=loadImage("images/Dog.png");
  dogHappy=loadImage("images/Happy.png");
  bedroom=loadImage("images/Bed Room.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/Wash Room.png")
  livingroom = loadImage("images/Living Room.png")
  sadDog=loadImage("images/Dog.png")
  milk=loadImage("images/milk.png")
}

function setup() {
	database= firebase.database();
  createCanvas(800, 1000);
  dog = createSprite(500,350,10,10);
  dog.addImage("dogImg",dogImg);
  foodS = new Food()
  foodS.getFoodstock();
  dog.scale=0.15;
  feed = createButton("Feed Dog");
  feed.position(200,50);
  
  Bath=createButton("I want to take bath");
  Bath.position(520,125);
  Play=createButton("Lets Play !");
  Play.position(430,125);
  Sleep=createButton("I am very sleepy");
  Sleep.position(660,125);
  PlayInGarden=createButton("Dig!");
  PlayInGarden.position(380,125);
  addFood = createButton("Add Food");
  addFood.position(300,50);
  addFood.mousePressed(add);
   
  database.ref('gameState').on("value",function(data){
    gameState=data.val();
  });

 // database.ref('foodStock').on("value",readStock);
 textSize(20); 
}
function draw() {  

  fill("white")
;
 if(gameState==="hungry"){
 background(0);
 dog.visible=true;
 //dog = createSprite(500,350,10,10);
 //dog.addImage("dogImg",dogImg);
 //dog.scale=0.3;
 foodS.display();
 }else{
  dog.visible = false;
 }
feed.mousePressed(feedDog)


Bath.mousePressed(function(){
  gameState="bathing";
  database.ref('/').update({'gameState':gameState});
});
if(gameState==="bathing"){
  foodS.washroom();
  dog.visible = false;
 // milk.visible=false
}


Sleep.mousePressed(function(){
  gameState="sleeping";
  database.ref('/').update({'gameState':gameState});
});
if(gameState==="sleeping"){
  foodS.bedroom();
  dog.visible = false;
  //milk.visible=false
}


Play.mousePressed(function(){
  gameState="playing";
  database.ref('/').update({'gameState':gameState});
});
if(gameState==="playing"){
  foodS.livingroom();
  dog.visible = false;
  //milk.visible=false
}

PlayInGarden.mousePressed(function(){
  gameState="playg";
  database.ref('/').update({'gameState':gameState});
});
if(gameState==="playg"){
  foodS.garden();
  dog.visible = false;
  //milk.visible=false
}

  database.ref("time").on("value",function (data){
    foodS.lastFed = data.val();
    
  })
  
  text("Last Fed: "+foodS.lastFed,50,50)
  // text("Food Remaining: "+foodStock,300,150)
  // text("Note: Press UP ARROW To Feed The Dog",200,70);
  
//   if(keyDown(UP_ARROW)){
//      writeStock(foodStock-1);
//      dog.addImage(dogHappy);
//  }  

 drawSprites();
}
 
 function feedDog(){
   foodS.updateFoodstock(foodStock-1);
   database.ref('/').update({time:hour()})
   gameState="hungry";
   update(gameState);
 }

 function add(){
   foodS.updateFoodstock(foodStock+1);
   gameState="hungry";
   update(gameState);
 }
 
 function update(state){
  database.ref('/').update({
    gameState:state});
 }
 //function readStock(data){
       //foodStock=data.val();
 //}
 //function writeStock(x){
  // if(x<=0){
    // x=0;
//    }
//    database.ref('/').update({
//      foodStock:x
//    })
//  }
 