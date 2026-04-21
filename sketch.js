function preload()
{
    walkSheet = loadImage('Assets/playerWalk.png')
    attackSheet = loadImage('Assets/playerAttack.png')
    enemyWalk = loadImage('assets/enemyUnarmed.png')
    bricks = loadImage('Assets/bricks.jpg')
    splatter1 = loadImage('assets/splatter1.png')
    splatter2 = loadImage('assets/splatter2.png')
    splatter3 = loadImage('assets/splatter3.png')
}

function setup()
{
    createCanvas(1000,1000)
    level1Setup()
    
}

function draw() 
{
    
    background(0)
    if (player.getState())
    {
        player.draw(colGrid)
        brickGrid.drawTexture() 
        enemy1.logic(player,colGrid)
        drawUI(player)
    }
    else 
    {
        deathScreen(player)
    }
    
    
    //enemy2.logic(player,colGrid)d
    
    
}

function mousePressed()
{
    if(player.getHealth()>=0)
    {
        if (player.getAttackFrame() === 0)
        {
            player.startAttack() 
        }
    }

    if (player.getState() === false)
    {
        resetGame()
        console.log('uhateme')
    }
}



