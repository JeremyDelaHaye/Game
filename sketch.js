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
    player.draw() 
    try{bullet.draw()}
    catch{}
    try{enemy.kill(bullet.getX(),bullet.getY())}
    catch{}
    enemy.draw()
    
}

function mousePressed()
{
    bullet = new Bullet(player.getX(),player.getY(),player.getAngle(),30)
}

function shooting()
{
    
}