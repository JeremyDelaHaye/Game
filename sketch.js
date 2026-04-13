let idle, sheet; 
function preload()
{
    walkSheet = loadImage('Assets/sprPWalkUnarmed_strip8.png')
    attackSheet = loadImage('Assets/sprPAttackSword_strip7.png')
}

function setup()
{
    const CELLSIZE = 50;
    createCanvas(500,500)
    player = new Player(width/2,height/2,attackSheet,walkSheet)
    enemy1 = new Enemy(random(500),random(500),null,null,null,CELLSIZE)
    colGrid = new Grid(CELLSIZE)
    enemyGrid = new Grid(CELLSIZE)
    colGrid.addToGrid(0,0)
}

function draw() 
{
    background(0)
    player.draw(colGrid)
    //colGrid.drawGrid() 
    enemy1.draw(player)
    rect(100,100,50)
}

function mousePressed()
{
    if (player.getAttackFrame() === 0)
    {
        player.startAttack() 
    }
}
