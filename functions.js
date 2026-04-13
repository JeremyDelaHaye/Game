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

function createClasses()
{
    const CELLSIZE = 50;
    player = new Player(width/2,height/2,attackSheet,walkSheet)
    enemy1 = new Enemy(random(500), random(500), null, null, null, CELLSIZE, enemyWalk) 
    enemy2 = new Enemy(random(500), random(500), null, null, null, CELLSIZE, enemyWalk) 
    brickGrid = new TextureGrid(CELLSIZE,bricks)
    colGrid = new Grid(CELLSIZE) 
    enemyGrid = new Grid(CELLSIZE)
}

function createLevel()
{
    for (let i =0; i<9; i++)
    {
        brickGrid.setCell(i,3,true)
    }
}

