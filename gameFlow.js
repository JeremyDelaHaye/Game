let gameState; 
const CELLSIZE = 50;

function initializeGame()
{
    gameState = 0;
    createCanvas(1000,1000)
    player = new Player(width/2,height/2,attackSheet,walkSheet)
    colGrid = new Grid(CELLSIZE)
    healthGrid = new ItemGrid(CELLSIZE,grass)
}

function level0()
{
    player.draw(colGrid,healthGrid)
}

function level1()
{
    background(255,0,0)
    player.draw(colGrid,healthGrid)
}

function level2()
{
    background(0,255,0)
    player.draw(colGrid,healthGrid)
}

function level3()
{
    background(0,0,255)
    player.draw(colGrid,healthGrid)
}

function level4()
{
    background(0,0,255)
    player.draw(colGrid,healthGrid)
}

function gameStateChange(enemyCount)
{
    if (enemyCount === 0)
    {
        gameState++
    }
}

function createLevel2()
{
    // outer walls - 2 thick
    for (let i = 0; i < 20; i++)
    {
        darkWallGrid.setCell(0, i, true)
        darkWallGrid.setCell(1, i, true)
        darkWallGrid.setCell(18, i, true)
        darkWallGrid.setCell(19, i, true)
        darkWallGrid.setCell(i, 0, true)
        darkWallGrid.setCell(i, 1, true)
        darkWallGrid.setCell(i, 18, true)
        darkWallGrid.setCell(i, 19, true)
    }

    // horizontal divider rows 9-10, doorways at cols 5-6 and 13-14
    for (let i = 2; i < 18; i++)
    {
        darkWallGrid.setCell(9, i, true)
        darkWallGrid.setCell(10, i, true)
    }
    darkWallGrid.setCell(9, 5, false)
    darkWallGrid.setCell(9, 6, false)
    darkWallGrid.setCell(10, 5, false)
    darkWallGrid.setCell(10, 6, false)
    darkWallGrid.setCell(9, 13, false)
    darkWallGrid.setCell(9, 14, false)
    darkWallGrid.setCell(10, 13, false)
    darkWallGrid.setCell(10, 14, false)

    // vertical divider cols 9-10, doorways at rows 5-6 and 13-14
    for (let i = 2; i < 18; i++)
    {
        darkWallGrid.setCell(i, 9, true)
        darkWallGrid.setCell(i, 10, true)
    }
    darkWallGrid.setCell(5, 9, false)
    darkWallGrid.setCell(5, 10, false)
    darkWallGrid.setCell(6, 9, false)
    darkWallGrid.setCell(6, 10, false)
    darkWallGrid.setCell(13, 9, false)
    darkWallGrid.setCell(13, 10, false)
    darkWallGrid.setCell(14, 9, false)
    darkWallGrid.setCell(14, 10, false)

    // 2x2 pillars in each quadrant
    // NW
    darkWallGrid.setCell(5, 5, true)
    darkWallGrid.setCell(5, 6, true)
    darkWallGrid.setCell(6, 5, true)
    darkWallGrid.setCell(6, 6, true)
    // NE
    darkWallGrid.setCell(5, 12, true)
    darkWallGrid.setCell(5, 13, true)
    darkWallGrid.setCell(6, 12, true)
    darkWallGrid.setCell(6, 13, true)
    // SW
    darkWallGrid.setCell(12, 5, true)
    darkWallGrid.setCell(12, 6, true)
    darkWallGrid.setCell(13, 5, true)
    darkWallGrid.setCell(13, 6, true)
    // SE
    darkWallGrid.setCell(12, 12, true)
    darkWallGrid.setCell(12, 13, true)
    darkWallGrid.setCell(13, 12, true)
    darkWallGrid.setCell(13, 13, true)

    // health pickup
    healthGrid.setCell(4, 4, true)
}

