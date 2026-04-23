function mergeGrids(inputGrid,colGrid)
{
    const inputRow = (Math.ceil(height/inputGrid.getCellSize()));
    const inputCol = (Math.ceil(width/inputGrid.getCellSize()));

    for (let row = 0; row < inputRow; row++)
    {
        for (let col = 0; col < inputCol; col++)
        {    
            colGrid.setCell(row,col,inputGrid.getCell(row,col))
        }
    }
}

function clearGrid(grid)
{
    const inputRow = (Math.ceil(height/grid.getCellSize()));
    const inputCol = (Math.ceil(width/grid.getCellSize()));

    for (let row = 0; row < inputRow; row++)
    {
        for (let col = 0; col < inputCol; col++)
        {    
            grid.setCell(row,col,false)
        }
    }
}

function createLevel()
{
    // outer walls - 2 thick
    for (let i = 0; i < 20; i++)
    {
        brickGrid.setCell(0, i, true)
        brickGrid.setCell(1, i, true)
        brickGrid.setCell(18, i, true)
        brickGrid.setCell(19, i, true)
        brickGrid.setCell(i, 0, true)
        brickGrid.setCell(i, 1, true)
        brickGrid.setCell(i, 18, true)
        brickGrid.setCell(i, 19, true)
    }

    // horizontal divider top - 2 thick with 2-wide doorway
    for (let i = 0; i < 20; i++)
    {
        brickGrid.setCell(7, i, true)
        brickGrid.setCell(8, i, true)
    }
    brickGrid.setCell(7, 9, false)
    brickGrid.setCell(7, 10, false)
    brickGrid.setCell(8, 9, false)
    brickGrid.setCell(8, 10, false)

    // horizontal divider bottom - 2 thick with 2-wide doorway
    for (let i = 0; i < 20; i++)
    {
        brickGrid.setCell(12, i, true)
        brickGrid.setCell(13, i, true)
    }
    brickGrid.setCell(12, 9, false)
    brickGrid.setCell(12, 10, false)
    brickGrid.setCell(13, 9, false)
    brickGrid.setCell(13, 10, false)

    // vertical divider left - 2 thick with 2-wide doorways
    for (let i = 2; i < 18; i++)
    {
        brickGrid.setCell(i, 7, true)
        brickGrid.setCell(i, 8, true)
    }
    brickGrid.setCell(4, 7, false)
    brickGrid.setCell(4, 8, false)
    brickGrid.setCell(5, 7, false)
    brickGrid.setCell(5, 8, false)
    brickGrid.setCell(10, 7, false)
    brickGrid.setCell(10, 8, false)
    brickGrid.setCell(11, 7, false)
    brickGrid.setCell(11, 8, false)
    brickGrid.setCell(15, 7, false)
    brickGrid.setCell(15, 8, false)
    brickGrid.setCell(16, 7, false)
    brickGrid.setCell(16, 8, false)

    // vertical divider right - 2 thick with 2-wide doorways
    for (let i = 2; i < 18; i++)
    {
        brickGrid.setCell(i, 12, true)
        brickGrid.setCell(i, 13, true)
    }
    brickGrid.setCell(4, 12, false)
    brickGrid.setCell(4, 13, false)
    brickGrid.setCell(5, 12, false)
    brickGrid.setCell(5, 13, false)
    brickGrid.setCell(10, 12, false)
    brickGrid.setCell(10, 13, false)
    brickGrid.setCell(11, 12, false)
    brickGrid.setCell(11, 13, false)
    brickGrid.setCell(15, 12, false)
    brickGrid.setCell(15, 13, false)
    brickGrid.setCell(16, 12, false)
    brickGrid.setCell(16, 13, false)
    healthGrid.setCell(16,13,true)

    // 2x2 pillars in
}

function level1Setup()
{
    const CELLSIZE = 50;
    brickGrid = new TextureGrid(CELLSIZE,bricks)
    healthGrid = new ItemGrid(CELLSIZE,grass)
    colGrid = new Grid(CELLSIZE)
    mergeGrids(brickGrid,colGrid)
    player = new Player(width/2,height/2,attackSheet,walkSheet)
    enemy1 = new ShootingEnemy(200, 200,1,enemyArmed,attackSheet,splatter1,dead1,10)
    enemy2 = new Enemy(720,250,1,enemyUnarmed,attackSheet,splatter2,dead2,1)
    createLevel()
    mergeGrids(brickGrid,colGrid)
}

function spawnLogic(grid)
{
    grid.getEmptyCoord()
}   

function drawUI(player)
{
    textSize(25)
    fill(255)
    text('score:' + player.getScore(),10,20)
    text('health:' +player.getHealth(),150,20)
}

function deathScreen()
{   
    background(0)
    textSize(50)
    text('You Died',width/2,height/2)
    text('Press mouse to restart',width/2,height/1.5)
}

function startScreen()
{
    
    background(0)
    textSize(50)
    text('video game fr',width/2,height/2)
    text('Press mouse to start',width/2,height/1.5)
}

function resetGame()
{   
    player.setHealth(100)
    player.setScore(0)
    player.setState(true)
}
