let idle, sheet; 
function preload()
{
    walkSheet = loadImage('Assets/playerWalk.png')
    attackSheet = loadImage('Assets/playerAttack.png')
    bricks = loadImage('Assets/bricks.jpg')
}

function setup()
{
    const CELLSIZE = 50;
    createCanvas(500,500)
    player = new Player(width/2,height/2,attackSheet,walkSheet)
    enemy1 = new Enemy(random(500),random(500),null,null,null,CELLSIZE)
    brickGrid = new TextureGrid(CELLSIZE,bricks)
    colGrid = new Grid(CELLSIZE)
    enemyGrid = new Grid(CELLSIZE)
    brickGrid.addToGrid(5,5)
}

function draw() 
{
    background(0)
    player.draw(colGrid)
    brickGrid.drawTexture() 
    //enemy1.draw(player)
    //rect(100,100,50)
}

function mousePressed()
{
    if (player.getAttackFrame() === 0)
    {
        player.startAttack() 
    }
}
