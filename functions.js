function mergeGrids(inputGrid, colGrid)
{
    const inputRow = (Math.ceil(height/inputGrid.getCellSize()));
    const inputCol = (Math.ceil(width/inputGrid.getCellSize()));

    for (let row = 0; row < inputRow; row++)
    {
        for (let col = 0; col < inputCol; col++)
        {
            colGrid.setCell(row, col, inputGrid.getCell(row, col))
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
            grid.setCell(row, col, false)
        }
    }
}

function createLevel()
{
    // outer border
    for (let i = 0; i < 60; i++)
    {
        brickGrid.setCell(0, i, true)
        brickGrid.setCell(59, i, true)
        brickGrid.setCell(i, 0, true)
        brickGrid.setCell(i, 59, true)
    }
    // top exit door (4 cells wide at cols 28-31)
    brickGrid.setCell(0, 28, false)
    brickGrid.setCell(0, 29, false)
    brickGrid.setCell(0, 30, false)
    brickGrid.setCell(0, 31, false)

    // horizontal dividing wall: rows 29-30, cols 5-54
    for (let c = 5; c <= 54; c++)
    {
        brickGrid.setCell(29, c, true)
        brickGrid.setCell(30, c, true)
    }
    // 4-cell-wide doorway through the wall at cols 28-31
    for (let c = 28; c <= 31; c++)
    {
        brickGrid.setCell(29, c, false)
        brickGrid.setCell(30, c, false)
    }

    // 2x2 pillars
    // pillar A: top room, rows 10-11 cols 10-11
    brickGrid.setCell(10, 10, true)
    brickGrid.setCell(10, 11, true)
    brickGrid.setCell(11, 10, true)
    brickGrid.setCell(11, 11, true)
    // pillar B: top room, rows 10-11 cols 48-49
    brickGrid.setCell(10, 48, true)
    brickGrid.setCell(10, 49, true)
    brickGrid.setCell(11, 48, true)
    brickGrid.setCell(11, 49, true)
    // pillar C: bottom room, rows 48-49 cols 18-19
    brickGrid.setCell(48, 18, true)
    brickGrid.setCell(48, 19, true)
    brickGrid.setCell(49, 18, true)
    brickGrid.setCell(49, 19, true)

    // health pickups
    healthGrid.setCell(6, 50, true)
    healthGrid.setCell(50, 6, true)
    healthGrid.setCell(35, 35, true)

    // Spawn coords (px) — set these in your spawn logic:
    //   player        : (725, 125)   col 29, row  5
    //   ShootingEnemy : (250, 500)   col 10, row 20
    //   Enemy         : (1250, 1250) col 50, row 50

    mergeGrids(brickGrid, colGrid)
}

function createLevel2()
{
    // outer border
    for (let i = 0; i < 60; i++)
    {
        darkWallGrid.setCell(0, i, true)
        darkWallGrid.setCell(59, i, true)
        darkWallGrid.setCell(i, 0, true)
        darkWallGrid.setCell(i, 59, true)
    }
    // top exit door
    darkWallGrid.setCell(0, 28, false)
    darkWallGrid.setCell(0, 29, false)
    darkWallGrid.setCell(0, 30, false)
    darkWallGrid.setCell(0, 31, false)

    // L-shaped wall: vertical segment cols 29-30, rows 5-29
    for (let r = 5; r <= 29; r++)
    {
        darkWallGrid.setCell(r, 29, true)
        darkWallGrid.setCell(r, 30, true)
    }
    // L-shaped wall: horizontal segment rows 29-30, cols 5-54
    for (let c = 5; c <= 54; c++)
    {
        darkWallGrid.setCell(29, c, true)
        darkWallGrid.setCell(30, c, true)
    }

    // 4-cell doorway in vertical segment at rows 14-17
    for (let r = 14; r <= 17; r++)
    {
        darkWallGrid.setCell(r, 29, false)
        darkWallGrid.setCell(r, 30, false)
    }
    // 4-cell doorway in horizontal segment at cols 44-47
    for (let c = 44; c <= 47; c++)
    {
        darkWallGrid.setCell(29, c, false)
        darkWallGrid.setCell(30, c, false)
    }

    // 2x2 pillars
    // pillar A: Area A (top-left), rows 10-11 cols 10-11
    darkWallGrid.setCell(10, 10, true)
    darkWallGrid.setCell(10, 11, true)
    darkWallGrid.setCell(11, 10, true)
    darkWallGrid.setCell(11, 11, true)
    // pillar B: Area B (top-right), rows 10-11 cols 48-49
    darkWallGrid.setCell(10, 48, true)
    darkWallGrid.setCell(10, 49, true)
    darkWallGrid.setCell(11, 48, true)
    darkWallGrid.setCell(11, 49, true)
    // pillar C: Area C (bottom), rows 48-49 cols 18-19
    darkWallGrid.setCell(48, 18, true)
    darkWallGrid.setCell(48, 19, true)
    darkWallGrid.setCell(49, 18, true)
    darkWallGrid.setCell(49, 19, true)
    // pillar D: Area C (bottom), rows 48-49 cols 40-41
    darkWallGrid.setCell(48, 40, true)
    darkWallGrid.setCell(48, 41, true)
    darkWallGrid.setCell(49, 40, true)
    darkWallGrid.setCell(49, 41, true)

    // health pickups
    healthGrid.setCell(5, 5, true)
    healthGrid.setCell(5, 55, true)
    healthGrid.setCell(55, 30, true)

    // Spawn coords (px):
    //   player        : (725,   50)   col 29, row  2
    //   ShootingEnemy : (350,  350)   col 14, row 14   (Area A)
    //   Enemy         : (1125, 350)   col 45, row 14   (Area B)
    //   Enemy         : (750, 1250)   col 30, row 50   (Area C)

    mergeGrids(darkWallGrid, colGrid)
}

function createLevel3()
{
    // outer border
    for (let i = 0; i < 60; i++)
    {
        woodGrid.setCell(0, i, true)
        woodGrid.setCell(59, i, true)
        woodGrid.setCell(i, 0, true)
        woodGrid.setCell(i, 59, true)
    }
    // top exit door
    woodGrid.setCell(0, 28, false)
    woodGrid.setCell(0, 29, false)
    woodGrid.setCell(0, 30, false)
    woodGrid.setCell(0, 31, false)

    // horizontal wall: rows 29-30, cols 5-54
    for (let c = 5; c <= 54; c++)
    {
        woodGrid.setCell(29, c, true)
        woodGrid.setCell(30, c, true)
    }
    // vertical wall: cols 29-30, rows 5-54
    for (let r = 5; r <= 54; r++)
    {
        woodGrid.setCell(r, 29, true)
        woodGrid.setCell(r, 30, true)
    }

    // 4-cell doorway in horizontal wall at cols 28-31
    for (let c = 28; c <= 31; c++)
    {
        woodGrid.setCell(29, c, false)
        woodGrid.setCell(30, c, false)
    }
    // 4-cell doorway in vertical wall at rows 28-31
    for (let r = 28; r <= 31; r++)
    {
        woodGrid.setCell(r, 29, false)
        woodGrid.setCell(r, 30, false)
    }

    // 2x2 pillars, one centred in each quadrant
    // pillar Q1: rows 10-11 cols 10-11
    woodGrid.setCell(10, 10, true)
    woodGrid.setCell(10, 11, true)
    woodGrid.setCell(11, 10, true)
    woodGrid.setCell(11, 11, true)
    // pillar Q2: rows 10-11 cols 48-49
    woodGrid.setCell(10, 48, true)
    woodGrid.setCell(10, 49, true)
    woodGrid.setCell(11, 48, true)
    woodGrid.setCell(11, 49, true)
    // pillar Q3: rows 48-49 cols 10-11
    woodGrid.setCell(48, 10, true)
    woodGrid.setCell(48, 11, true)
    woodGrid.setCell(49, 10, true)
    woodGrid.setCell(49, 11, true)
    // pillar Q4: rows 48-49 cols 48-49
    woodGrid.setCell(48, 48, true)
    woodGrid.setCell(48, 49, true)
    woodGrid.setCell(49, 48, true)
    woodGrid.setCell(49, 49, true)

    // health pickups
    healthGrid.setCell(6, 6, true)
    healthGrid.setCell(6, 52, true)
    healthGrid.setCell(52, 52, true)

    // Spawn coords (px):
    //   player         : (725,   50)   col 29, row  2
    //   ShootingEnemy  : (350,  500)   col 14, row 20   (Q1)
    //   ShootingEnemy  : (1100, 1100)  col 44, row 44   (Q4)
    //   Enemy          : (1100, 350)   col 44, row 14   (Q2)
    //   Enemy          : (350, 1100)   col 14, row 44   (Q3)

    mergeGrids(woodGrid, colGrid)
}

function drawUI(player)
{
    textSize(25)
    fill(255)
    text('score:' + player.getScore(), 10, 20)
    text('health:' + player.getHealth(), 150, 20)
}

function resetGame()
{
    player.setHealth(100)
    player.setScore(0)
    player.setState(true)
}