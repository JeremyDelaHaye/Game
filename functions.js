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

function createClasses()
{
    const CELLSIZE = 50;
    player = new Player(5,height/2,attackSheet,walkSheet)
    enemy1 = new Enemy(random(500), random(500), 2, enemyWalk,100) 
    enemy2 = new Enemy(random(500), random(500), 2, enemyWalk, 100) 
    brickGrid = new TextureGrid(CELLSIZE,bricks)
    colGrid = new Grid(CELLSIZE) 
    enemyGrid = new Grid(CELLSIZE)
}

function createLevel()
{
    // outer walls
    for (let i = 0; i < 14; i++)
    {
        brickGrid.setCell(0, i, true)
        brickGrid.setCell(13, i, true)
        brickGrid.setCell(i, 0, true)
        brickGrid.setCell(i, 13, true)
    }

    // horizontal divider with 2-wide doorway
    for (let i = 0; i < 14; i++) brickGrid.setCell(6, i, true)
    brickGrid.setCell(6, 6, false)
    brickGrid.setCell(6, 7, false)

    // vertical divider top half with 2-wide doorway
    for (let i = 0; i < 6; i++) brickGrid.setCell(i, 7, true)
    brickGrid.setCell(3, 7, false)
    brickGrid.setCell(4, 7, false)

    // vertical divider bottom half with 2-wide doorway
    for (let i = 7; i < 14; i++) brickGrid.setCell(i, 7, true)
    brickGrid.setCell(9, 7, false)
    brickGrid.setCell(10, 7, false)

    // small room top-left with 2-wide entrance
    for (let i = 1; i < 5; i++) brickGrid.setCell(i, 4, true)
    brickGrid.setCell(2, 4, false)
    brickGrid.setCell(3, 4, false)

    // small room bottom-right with 2-wide entrance
    for (let i = 8; i < 13; i++) brickGrid.setCell(i, 10, true)
    brickGrid.setCell(10, 10, false)
    brickGrid.setCell(11, 10, false)

    // pillars (single cells, player navigates around)
    brickGrid.setCell(2, 2, true)
    brickGrid.setCell(4, 2, true)
    brickGrid.setCell(2, 10, true)
    brickGrid.setCell(4, 10, true)
    brickGrid.setCell(9, 2, true)
    brickGrid.setCell(11, 2, true)
    brickGrid.setCell(9, 11, true)
    brickGrid.setCell(11, 11, true)
}

function level1Setup()
{
    const CELLSIZE = 50;
    player = new Player(5,height/2,attackSheet,walkSheet)
    enemy1 = new Enemy(random(500), random(500), 2, enemyWalk,100) 
    enemy2 = new Enemy(random(500), random(500), 2, enemyWalk, 100) 
    brickGrid = new TextureGrid(CELLSIZE,bricks)
    colGrid = new Grid(CELLSIZE) 
    enemyGrid = new Grid(CELLSIZE)

    createLevel()
    mergeGrids(brickGrid,colGrid)
}

function level1Draw()
{

}
