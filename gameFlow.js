let gameState; 
let pastState;
const CELLSIZE = 50;
let createdLvl0 = false
let createdLvl1 = false
let createdLvl2 = false
let createdLvl3 = false
let createdLvl4 = false

function initializeGame()
{
    gameState = 0;
    createCanvas(1000,700)
    player = new Player(width/2,height/2,attackSheet,walkSheet)
    colGrid = new Grid(CELLSIZE)
    doorGrid = new Grid(CELLSIZE)
    healthGrid = new ItemGrid(CELLSIZE,grass)
}

function level0()
{
    if (!createdLvl0)
    {
        player.setState(true)
    }
    background(0)
    player.draw(colGrid,healthGrid)
    dead(createdLvl0)
}

function level1()
{ 
    if(!createdLvl1)
    {
        brickGrid = new TextureGrid(CELLSIZE,bricks)
        healthGrid = new ItemGrid(CELLSIZE,grass)
        colGrid = new Grid(CELLSIZE)
        mergeGrids(brickGrid,colGrid)
        player = new Player(width/2,height/2,attackSheet,walkSheet)
        player.setState(true)
        enemy1 = new ShootingEnemy(200, 200,1,enemyArmed,attackSheet,splatter1,dead1,10)
        enemy2 = new Enemy(720,250,1,enemyUnarmed,attackSheet,splatter2,dead2,1)
        createdLvl1 = true; 
    }
    background(0)
    baseLevel()
    enemy1.logic(player,colGrid)
    enemy2.logic(player,colGrid)
    dead(createdLvl1)
    console.log(player.getState())
    if (doorGrid.isOccupied(player.getX(),player.getY()) && enemyCount === 0)
    {
        gameState++
    }
}

function level2()
{
    if (!createdLvl2)
    {
        player = new Player(width/2,height/2,attackSheet,walkSheet)
        player.setState(true)
    }
    background(0,255,0)
    player.draw(colGrid,healthGrid)
    dead(createdLvl2)
}

function level3()
{
    if (!createdLvl3)
    {
        player = new Player(width/2,height/2,attackSheet,walkSheet)
        player.setState(true)
    }
    background(0,0,255)
    player.draw(colGrid,healthGrid)
    dead(createdLvl3)
}

function level4()
{
    if (!createdLvl4)
    {
        player = new Player(width/2,height/2,attackSheet,walkSheet)
        player.setState(true)
    }
    background(0,0,255)
    player.draw(colGrid,healthGrid)
    dead(createdLvl4)
}

function gameStateChange(enemyCount)
{
    if (enemyCount === 0)
    {
        gameState++
    }
}

function dead(level)
{
    if (!player.getState())
    {
        pastState = gameState
        background(0)
        textAlign(CENTER)
        textSize(25)
        text("YOU DIED",width/2,height/2)
        gameState = 5;
        level = false
    }
}

function baseLevel()
{
    player.draw(colGrid,healthGrid)
    gameStateChange()
}

