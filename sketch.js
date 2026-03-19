// add colision detection 
function setup()
{
    player = new Player(300,300)
    enemy = new Enemy(random(600),random(600),0)
    createCanvas(600,600)
    
}

function draw() 
{
    background(0)
    player.updateRotation()
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