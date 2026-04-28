let gameState;
let pastState;
const CELLSIZE = 25;
let createdLvl0 = false
let createdLvl1 = false
let createdLvl2 = false
let createdLvl3 = false
let createdLvl4 = false
let enemys = []
let textureGrids = []
let enemyCount = 0

function initializeGame()
{
    gameState = 0;
    createCanvas(1500,1500)
    player = new Player(width/2,height/2,attackSheet,walkSheet)
    colGrid = new Grid(CELLSIZE)
    doorGrid = new Grid(CELLSIZE)
    healthGrid = new ItemGrid(CELLSIZE,med)
}

function level0()
{
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
        resetGame()
        createdLvl1 = true

        let enemy1 = new ShootingEnemy(50,50,4,enemyArmed,enemyAttack,splatter1,dead4,5)
        let enemy2 = new Enemy(1000,50,4,enemyUnarmed,enemyAttack,splatter2,dead2,5)
        let brickGrid = new TextureGrid(CELLSIZE,bricks)
        let grassGrid = new TextureGrid(CELLSIZE,grass)

        loadMap(MAP,brickGrid)
        mergeGrids(brickGrid,colGrid)
        occupyEmptyGrid(grassGrid,colGrid)
        
        healthGrid.setCell(33,33,true)

        
        //enemys.push(enemy1)
        //enemys.push(enemy2)
        textureGrids.push(brickGrid)
        textureGrids.push(healthGrid)
        textureGrids.push(grassGrid)
        
    }
    fullLevelLogic(createdLvl1)
}

function level2()
{
    if (!createdLvl2)
    {
    
    }
    fullLevelLogic(createdLvl2)
    
}

function level3()
{
    if (!createdLvl3)
    {
        
    }
    fullLevelLogic(createdLvl3)
    
}

function level4()
{
    if (!createdLvl4)
    {
        
    }
    fullLevelLogic(createdLvl4)
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

