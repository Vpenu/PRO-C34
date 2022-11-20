const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,mango,ground;
var mango_con;
var mango_con_2;
var mango_con_3;

var bg_img;
var food;
var basket;

var button,blower, button2, button3;
var basket2;
var mute_btn;

var fr,rope2, rope3;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

function preload()
{
  bg_img = loadImage('nature.jpeg');
  food = loadImage('apple.jpeg');
  basket = loadImage('basket2.png');

  bk_song = loadSound('sound1.mp3');
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');
  
}

function setup() {
  createCanvas(500,700);
 
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   
   button3 = createImg('cut_btn.png');
   button3.position(360,200);
   button3.size(60,60);
   button3.mouseClicked(drop3);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7, {x:370, y:40});
  rope3 = new Rope(4, {x:400, y:225});
  ground = new Ground(200,690,600,20);

  basket2 = createSprite(200,625,50,50);
  basket2.scale = 0.2;
  basket2.addAnimation('basket', basket);
  
  mango = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,mango);

  mango_con = new Link(rope,mango,);
  mango_con_2 = new Link(rope2, mango,);
  mango_con_3 = new Link(rope3, mango,);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,500,690);

  push();
  imageMode(CENTER);
  if(mango!=null){
    image(food,mango.position.x,mango.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(mango,basket2)==true)
  {
    eating_sound.play();
  }


  if(mango!=null && mango.position.y>=650)
  {
    bk_song.stop();
    sad_sound.play();
    mango=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  mango_con.detach();
  mango_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  mango_con_2.detach();
  mango_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  mango_con_3.detach();
  mango_con_3 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,mango);
               mango = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


