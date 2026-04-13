function mergeGrids(inputGrid,colGrid)
{
    const inputRow = (Math.ceil(height/inputGrid.getCellSize())-1);
    const inputCol = (Math.ceil(width/inputGrid.getCellSize())-1);

    for (let row = 0; row < inputRow; row++)
    {
        for (let col = 0; col < inputCol; col--)
        {    
            console.log(inputCol)
        }
    }
}

function createClasses()
{
    const CELLSIZE = 50;
    player = new Player(width/2,height/2,attackSheet,walkSheet)
    enemy1 = new Enemy(random(500),random(500),null,null,null,CELLSIZE)
    brickGrid = new TextureGrid(CELLSIZE,bricks)
    colGrid = new Grid(CELLSIZE) 
    enemyGrid = new Grid(CELLSIZE)
}

