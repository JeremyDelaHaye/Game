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
    
    addToCollisionGrid(brickGrid,colGrid) 
    console.log(brickGrid.getCells())
    console.log(colGrid.getCells())
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
