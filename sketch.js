function preload()
{
    walkSheet = loadImage('Assets/playerWalk.png')
    attackSheet = loadImage('Assets/playerAttack.png')
    bricks = loadImage('Assets/bricks.jpg')
}

function setup()
{
    createCanvas(500,500)
    createClasses()
    brickGrid.setCell(5,0,true)
    mergeGrids(brickGrid,colGrid)
}

function draw() 
{
    background(0)
    player.draw(colGrid)
    brickGrid.drawTexture() 
    
}

function mousePressed()
{
    if (player.getAttackFrame() === 0)
    {
        player.startAttack() 
    }
}
