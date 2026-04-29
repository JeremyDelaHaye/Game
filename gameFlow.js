let gameState;
let pastState;
const CELLSIZE = 25;
let createdLvl0 = false
let createdLvl1 = false
let createdLvl2 = false
let createdLvl3 = false
let createdLvl4 = false
let createdLvl5 = false
let enemys = [] 
let textureGrids = []
let enemyCount = 0
let scaleFactor = 1
let character
let dialogue =['hello','mate']

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
    text('Press to start', width/2, height/2)
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
        console.log('door cells set:', doorGrid.getCells().flat().filter(x => x).length)
        mergeGrids(brickGrid,colGrid)
        occupyEmptyGrid(grassGrid,colGrid)
        
        //healthGrid.setCell(33,33,true)

        enemyCount = enemys.length
        textureGrids.push(brickGrid)
        textureGrids.push(grassGrid)
        textureGrids.push(healthGrid)
        
    }
    fullLevelLogic()
    //enemyCount = 0
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

function level5()
{
    
    if (!createdLvl5)
    {
        resetGame()
        createdLvl5 = true 
        
        character = new NPC(width/2,height/2,npc,dialogue)

        
    }
    fullLevelLogic()

    character.logic(player,colGrid)
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
    }
}

