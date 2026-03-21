// add colision detection 
let idle, sheet; 
function preload()
{
    idle = loadImage('assets/sprite_01.png');
    sheet = loadImage('assets/character_template-Sheet.png')
}

function setup()
{
    createCanvas(600,600) 
    player = new Player(300,300,idle,sheet)
    enemy = new Enemy(random(600),random(600),10)
     
}

function draw() 
{
    
    background(0)
    
    
    player.updateRotation()
    player.animateWalk()
    player.draw()
    player.movement()  
    try
    {
        bullet.draw()
    }
    catch 
    {}

    try
    {
        enemy.kill(bullet.getX(),bullet.getY())
    }
    catch
    {}

    enemy.draw()
    
}

function mousePressed()
{
    bullet = new Bullet(player.getX(),player.getY(),player.getAngle(),30)
}

function characterDraw(x,y,s)
{
    rectMode(CENTER)
    noStroke()
    fill(100)
    rect(x,y,100,50)
    fill(100)
    rect(x-70,y-5,50,50)
    rect(x+70,y-5,50,50)
}