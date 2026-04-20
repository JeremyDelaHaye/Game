function preload()
{
    walkSheet = loadImage('Assets/playerWalk.png')
    attackSheet = loadImage('Assets/playerAttack.png')
    enemyWalk = loadImage('assets/enemyUnarmed.png')
    bricks = loadImage('Assets/bricks.jpg')
}

function setup()
{
    createCanvas(1000,1000)
    level1Setup()
}

function draw() 
{
    background(0)
    player.draw(colGrid)
    brickGrid.drawTexture() 
   // enemy1.logic(player,colGrid)
    enemy2.draw(player,colGrid)
    
    
}

function mousePressed()
{
    if (player.getAttackFrame() === 0)
    {
        player.startAttack() 
    }
}
