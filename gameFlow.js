let gameState;
let pastState;
const CELLSIZE = 25;
let createdLvl0 = false
let createdLvl1 = false
let createdLvl2 = false
let createdLvl3 = false
let createdLvl4 = false
let createdLvlCreated = false
let createdLvlEditor = false
let enemys = []
let textureGrids = []
let enemyCount = 0
let scaleFactor = 1
let paintVal = 1
let levelEdit

function initializeGame()
{
    gameState = 2;
    let cnv = createCanvas(1500,1500)

    scaleFactor = Math.min(windowWidth / 1500, (windowHeight - 4) / 1500)
    cnv.style('width',  (1500 * scaleFactor) + 'px')
    cnv.style('height', (1500 * scaleFactor) + 'px')

    player = new Player(width/2,height/2,attackSheet,walkSheet)
    colGrid = new Grid(CELLSIZE)
    doorGrid = new TextureGrid(CELLSIZE,wood)
    healthGrid = new ItemGrid(CELLSIZE,med)
}

function level0()
{
    background(0)
    textAlign(CENTER)
    textSize(50)
    fill(255)
    text('Press space start', width/2, height/2)
    text('Press 1 to create level',width/2,height/1.75)
    text('Press 2 to play created level',width/2,height/1.5)
}

function level1()
{
    if (!createdLvl1)
    {
        resetGame()
        createdLvl1 = true    
        let brickGrid = new TextureGrid(CELLSIZE,bricks)
        let grassGrid = new TextureGrid(CELLSIZE,grass)
        loadMap(LEVEL1MAP,brickGrid,healthGrid)
        mergeGrids(brickGrid,colGrid)
        occupyEmptyGrid(grassGrid,colGrid)
        enemyCount = enemys.length
        textureGrids.push(brickGrid)
        textureGrids.push(grassGrid)
        textureGrids.push(healthGrid)
        
    }
    fullLevelLogic()
}

function level2()
{
    if (!createdLvl2)
    {
        resetGame()
        createdLvl2 = true
        let woodGrid = new TextureGrid(CELLSIZE,wood)
        let stoneGrid = new TextureGrid(CELLSIZE,darkStoneWall)

        loadMap(LEVEL2MAP,stoneGrid,healthGrid)

        mergeGrids(stoneGrid,colGrid)
        occupyEmptyGrid(woodGrid,colGrid)

        enemyCount = enemys.length
        textureGrids.push(stoneGrid)
        textureGrids.push(woodGrid)
        textureGrids.push(healthGrid)
        
    }
    fullLevelLogic()
    
}

function level3()
{
    if (!createdLvl3)
    {
        resetGame()
        createdLvl3 = true 
        let wallsGrid = new TextureGrid(CELLSIZE,walls)
        let grassGrid = new TextureGrid(CELLSIZE,grass)

        loadMap(LEVEL3MAP,wallsGrid,healthGrid)

        mergeGrids(wallsGrid,colGrid)
        occupyEmptyGrid(grassGrid,colGrid)

        enemyCount = enemys.length
        textureGrids.push(wallsGrid)
        textureGrids.push(grassGrid)
        textureGrids.push(healthGrid)
    }
    fullLevelLogic()
    
}

function level4()
{
    if (!createdLvl4)
    {
        resetGame()
        createdLvl4 = true
        let wallsGrid = new TextureGrid(CELLSIZE,walls)
        let grassGrid = new TextureGrid(CELLSIZE,grass)

        loadMap(LEVEL4MAP,wallsGrid,healthGrid)

        mergeGrids(wallsGrid,colGrid)
        occupyEmptyGrid(grassGrid,colGrid)

        enemyCount = enemys.length
        textureGrids.push(wallsGrid)
        textureGrids.push(grassGrid)
        textureGrids.push(healthGrid)
    }
    fullLevelLogic()
}

function createdlevel()
{
    if (!createdLvlCreated)
    {
        resetGame()
        createdLvlCreated = true

        let wallsGrid = new TextureGrid(CELLSIZE,walls)
        let grassGrid = new TextureGrid(CELLSIZE,grass)
        try 
        {   
            loadMap(CREATEDLEVEL,wallsGrid,healthGrid)
            mergeGrids(wallsGrid,colGrid)
            occupyEmptyGrid(grassGrid,colGrid)

            enemyCount = enemys.length
            textureGrids.push(wallsGrid)
            textureGrids.push(grassGrid)
            textureGrids.push(healthGrid)
        }
        catch
        {
            alert('must create level')
            resetGame()
            gameState = 2
        }
        
    }
    fullLevelLogic()
}

function levelEditor()
{
    if (!createdLvlEditor)
    {
        resetGame()
        levelEdit = new LevelEditorGrid(CELLSIZE)
        createdLvlEditor = true 
        levelEdit.createUI()
    }
    levelEdit.drawGrid()
}

function endGame()
{
    background(0)
    textAlign(CENTER)
    textSize(50)
    fill(255)
    text("YOU WIN", width/2, height/2)
    textSize(25)
    text("Press ENTER to return to menu", width/2, height/1.5)
}

function dead()
{
    if (player.getState() === false)
    {
        pastState = gameState
        gameState = 0

        if (pastState === 3) createdLvl1 = false
        if (pastState === 4) createdLvl2 = false
        if (pastState === 5) createdLvl3 = false
        if (pastState === 6) createdLvl4 = false
        if (pastState === 8) createdLvlCreated = false
    }
}

function pauseScreen()
{
    fill(0)
    textAlign(CENTER)
    textSize(50)
    fill(255)
    text("PAUSE", width/2, height/2)
    textSize(50)
    text("Press SPACE to restart", width/2, height/1.75)
    text("Press ENTER to go to main menu", width/2, height/1.5)
}

function deathScreen()
{
    fill(0)    
    textAlign(CENTER)
    textSize(50)
    fill(255)
    text("YOU DIED", width/2, height/2)
    textSize(25)
    text("Press SPACE to respawn", width/2, height/1.5)
}

