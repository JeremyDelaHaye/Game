let gameState;
let pastState;
const CELLSIZE = 50;
let createdLvl0 = false
let createdLvl1 = false
let createdLvl2 = false
let createdLvl3 = false
let createdLvl4 = false
let enemyCount = 0

function initializeGame()
{
    gameState = 0;
    createCanvas(1000,1000)
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
        createdLvl0 = true
    }
    background(0)
    textAlign(CENTER)
    textSize(50)
    fill(255)
    text('Press ENTER to start', width/2, height/2)
}

function level1()
{
    if (!createdLvl1)
    {
        brickGrid = new TextureGrid(CELLSIZE, bricks)
        healthGrid = new ItemGrid(CELLSIZE, grass)
        colGrid = new Grid(CELLSIZE)
        doorGrid = new TextureGrid(CELLSIZE, wood)
        createLevel()
        doorGrid.setCell(0, 9, true)
        doorGrid.setCell(0, 10, true)
        healthGrid.setCell(12, 3, true)
        healthGrid.setCell(3, 15, true)
        player = new Player(250, 700, attackSheet, walkSheet)
        player.setState(true)
        enemy1 = new ShootingEnemy(750, 250, 1, enemyArmed, attackSheet, splatter1, dead1, 10)
        enemy2 = new Enemy(400, 400, 1, enemyUnarmed, attackSheet, splatter2, dead2, 1)
        enemyCount = 2
        createdLvl1 = true
    }
    background(0)
    brickGrid.drawTexture()
    healthGrid.drawTexture()
    enemy1.logic(player, colGrid)
    enemy2.logic(player, colGrid)
    player.draw(colGrid, healthGrid)
    drawUI(player)
    if (enemyCount === 0)
    {
        doorGrid.drawTexture()
        if (doorGrid.isOccupied(player.getX(), player.getY()))
        {
            createdLvl1 = false
            gameState++
        }
    }
    dead()
}

function level2()
{
    if (!createdLvl2)
    {
        darkWallGrid = new TextureGrid(CELLSIZE, darkStoneWall)
        healthGrid = new ItemGrid(CELLSIZE, grass)
        colGrid = new Grid(CELLSIZE)
        doorGrid = new TextureGrid(CELLSIZE, wood)
        createLevel2()
        doorGrid.setCell(0, 9, true)
        doorGrid.setCell(0, 10, true)
        healthGrid.setCell(3, 3, true)
        healthGrid.setCell(16, 16, true)
        player = new Player(150, 700, attackSheet, walkSheet)
        player.setState(true)
        enemy1 = new ShootingEnemy(800, 150, 1, enemyArmed, attackSheet, splatter2, dead2, 10)
        enemy2 = new Enemy(800, 800, 1, enemyUnarmed, attackSheet, splatter3, dead3, 1)
        enemy3 = new Enemy(150, 400, 1, enemyUnarmed, attackSheet, splatter1, dead4, 1)
        enemyCount = 3
        createdLvl2 = true
    }
    background(0)
    darkWallGrid.drawTexture()
    healthGrid.drawTexture()
    enemy1.logic(player, colGrid)
    enemy2.logic(player, colGrid)
    enemy3.logic(player, colGrid)
    player.draw(colGrid, healthGrid)
    drawUI(player)
    if (enemyCount === 0)
    {
        doorGrid.drawTexture()
        if (doorGrid.isOccupied(player.getX(), player.getY()))
        {
            createdLvl2 = false
            gameState++
        }
    }
    dead()
}

function level3()
{
    if (!createdLvl3)
    {
        woodGrid = new TextureGrid(CELLSIZE, wood)
        healthGrid = new ItemGrid(CELLSIZE, grass)
        colGrid = new Grid(CELLSIZE)
        doorGrid = new TextureGrid(CELLSIZE, bricks)
        createLevel3()
        doorGrid.setCell(0, 9, true)
        doorGrid.setCell(0, 10, true)
        healthGrid.setCell(15, 3, true)
        healthGrid.setCell(3, 15, true)
        healthGrid.setCell(15, 15, true)
        player = new Player(150, 800, attackSheet, walkSheet)
        player.setState(true)
        enemy1 = new ShootingEnemy(800, 150, 2, enemyArmed, attackSheet, splatter3, dead3, 10)
        enemy2 = new ShootingEnemy(800, 800, 2, enemyArmed, attackSheet, splatter1, dead4, 10)
        enemy3 = new Enemy(500, 800, 1, enemyUnarmed, attackSheet, splatter2, dead1, 1)
        enemy4 = new Enemy(500, 150, 1, enemyUnarmed, attackSheet, splatter2, dead2, 1)
        enemyCount = 4
        createdLvl3 = true
    }
    background(0)
    woodGrid.drawTexture()
    healthGrid.drawTexture()
    enemy1.logic(player, colGrid)
    enemy2.logic(player, colGrid)
    enemy3.logic(player, colGrid)
    enemy4.logic(player, colGrid)
    player.draw(colGrid, healthGrid)
    drawUI(player)
    if (enemyCount === 0)
    {
        doorGrid.drawTexture()
        if (doorGrid.isOccupied(player.getX(), player.getY()))
        {
            createdLvl3 = false
            gameState++
        }
    }
    dead()
}

function level4()
{
    if (!createdLvl4)
    {
        createdLvl4 = true
    }
    background(0)
    textAlign(CENTER)
    textSize(50)
    fill(255)
    text('You Win!', width/2, height/2)
    textSize(25)
    text('Press ENTER to play again', width/2, height/1.5)
}

function dead()
{
    if (!player.getState())
    {
        pastState = gameState
        background(0)
        textAlign(CENTER)
        textSize(50)
        fill(255)
        text("YOU DIED", width/2, height/2)
        textSize(25)
        text("Press SPACE to respawn", width/2, height/1.5)
        gameState = 5

        if (pastState === 1) createdLvl1 = false
        if (pastState === 2) createdLvl2 = false
        if (pastState === 3) createdLvl3 = false
    }
}