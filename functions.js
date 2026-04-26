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
    // --- outer border ---
    for (let i = 0; i < 20; i++)
    {
        brickGrid.setCell(0, i, true)
        brickGrid.setCell(19, i, true)
        brickGrid.setCell(i, 0, true)
        brickGrid.setCell(i, 19, true)
    }
    // top door (cols 9-10)
    brickGrid.setCell(0, 9, false)
    brickGrid.setCell(0, 10, false)

    // --- horizontal dividing wall: rows 9-10, cols 3-16 ---
    // (does not touch outer border: 2-cell gap at cols 1-2 and cols 17-18)
    for (let c = 3; c <= 16; c++)
    {
        brickGrid.setCell(9, c, true)
        brickGrid.setCell(10, c, true)
    }
    // 2-cell-wide doorway through the wall at cols 9-10
    brickGrid.setCell(9, 9, false)
    brickGrid.setCell(9, 10, false)
    brickGrid.setCell(10, 9, false)
    brickGrid.setCell(10, 10, false)

    // --- 2x2 pillars (each has >=2 cells of open space on all sides) ---
    // pillar A: top-left area, rows 4-5, cols 4-5
    brickGrid.setCell(4, 4, true)
    brickGrid.setCell(4, 5, true)
    brickGrid.setCell(5, 4, true)
    brickGrid.setCell(5, 5, true)
    // pillar B: top-right area, rows 4-5, cols 14-15
    brickGrid.setCell(4, 14, true)
    brickGrid.setCell(4, 15, true)
    brickGrid.setCell(5, 14, true)
    brickGrid.setCell(5, 15, true)
    // pillar C: bottom-right area, rows 14-15, cols 14-15
    brickGrid.setCell(14, 14, true)
    brickGrid.setCell(14, 15, true)
    brickGrid.setCell(15, 14, true)
    brickGrid.setCell(15, 15, true)

    // spawns (pixel coords; place these in your spawn logic):
    //   player : (450,  50)   col  9, row  1
    //   enemy1 : (200, 350)   col  4, row  7
    //   enemy2 : (450, 700)   col  9, row 14
    //   enemy3 : (850, 200)   col 17, row  4

    mergeGrids(brickGrid, colGrid)
}

function createLevel2()
{
    // --- outer border ---
    for (let i = 0; i < 20; i++)
    {
        darkWallGrid.setCell(0, i, true)
        darkWallGrid.setCell(19, i, true)
        darkWallGrid.setCell(i, 0, true)
        darkWallGrid.setCell(i, 19, true)
    }
    // top door
    darkWallGrid.setCell(0, 9, false)
    darkWallGrid.setCell(0, 10, false)

    // --- vertical dividing wall: cols 9-10, rows 3-16 ---
    // (2-cell gap at rows 1-2 and rows 17-18 from outer border)
    for (let r = 3; r <= 16; r++)
    {
        darkWallGrid.setCell(r, 9, true)
        darkWallGrid.setCell(r, 10, true)
    }
    // 2-cell-wide doorway through the wall at rows 9-10
    darkWallGrid.setCell(9, 9, false)
    darkWallGrid.setCell(9, 10, false)
    darkWallGrid.setCell(10, 9, false)
    darkWallGrid.setCell(10, 10, false)

    // --- 2x2 pillars ---
    // pillar A: left half, rows 4-5, cols 4-5
    darkWallGrid.setCell(4, 4, true)
    darkWallGrid.setCell(4, 5, true)
    darkWallGrid.setCell(5, 4, true)
    darkWallGrid.setCell(5, 5, true)
    // pillar B: right half, rows 14-15, cols 14-15
    darkWallGrid.setCell(14, 14, true)
    darkWallGrid.setCell(14, 15, true)
    darkWallGrid.setCell(15, 14, true)
    darkWallGrid.setCell(15, 15, true)
    // pillar C: left half lower, rows 14-15, cols 4-5
    darkWallGrid.setCell(14, 4, true)
    darkWallGrid.setCell(14, 5, true)
    darkWallGrid.setCell(15, 4, true)
    darkWallGrid.setCell(15, 5, true)

    // spawns:
    //   player : (450,  50)   col  9, row  1
    //   enemy1 : (200, 400)   col  4, row  8
    //   enemy2 : (700, 400)   col 14, row  8
    //   enemy3 : (850, 850)   col 17, row 17

    mergeGrids(darkWallGrid, colGrid)
}

function createLevel3()
{
    // --- outer border ---
    for (let i = 0; i < 20; i++)
    {
        woodGrid.setCell(0, i, true)
        woodGrid.setCell(19, i, true)
        woodGrid.setCell(i, 0, true)
        woodGrid.setCell(i, 19, true)
    }
    // top door
    woodGrid.setCell(0, 9, false)
    woodGrid.setCell(0, 10, false)

    // --- horizontal wall: rows 9-10, cols 3-16 ---
    for (let c = 3; c <= 16; c++)
    {
        woodGrid.setCell(9, c, true)
        woodGrid.setCell(10, c, true)
    }
    // 2-cell doorway at cols 9-10
    woodGrid.setCell(9, 9, false)
    woodGrid.setCell(9, 10, false)
    woodGrid.setCell(10, 9, false)
    woodGrid.setCell(10, 10, false)

    // --- top vertical wall: rows 3-6, cols 9-10 ---
    // (rows 1-2 gap to top border; rows 7-8 gap before horizontal wall)
    for (let r = 3; r <= 6; r++)
    {
        woodGrid.setCell(r, 9, true)
        woodGrid.setCell(r, 10, true)
    }
    // 2-cell doorway at rows 4-5
    woodGrid.setCell(4, 9, false)
    woodGrid.setCell(4, 10, false)
    woodGrid.setCell(5, 9, false)
    woodGrid.setCell(5, 10, false)

    // --- bottom vertical wall: rows 13-16, cols 9-10 ---
    // (rows 11-12 gap below horizontal wall; rows 17-18 gap to bottom border)
    for (let r = 13; r <= 16; r++)
    {
        woodGrid.setCell(r, 9, true)
        woodGrid.setCell(r, 10, true)
    }
    // 2-cell doorway at rows 14-15
    woodGrid.setCell(14, 9, false)
    woodGrid.setCell(14, 10, false)
    woodGrid.setCell(15, 9, false)
    woodGrid.setCell(15, 10, false)

    // --- 2x2 pillars, one per room ---
    // top-left room
    woodGrid.setCell(3, 3, true)
    woodGrid.setCell(3, 4, true)
    woodGrid.setCell(4, 3, true)
    woodGrid.setCell(4, 4, true)
    // top-right room
    woodGrid.setCell(3, 15, true)
    woodGrid.setCell(3, 16, true)
    woodGrid.setCell(4, 15, true)
    woodGrid.setCell(4, 16, true)
    // bottom-left room
    woodGrid.setCell(14, 3, true)
    woodGrid.setCell(14, 4, true)
    woodGrid.setCell(15, 3, true)
    woodGrid.setCell(15, 4, true)
    // bottom-right room
    woodGrid.setCell(14, 15, true)
    woodGrid.setCell(14, 16, true)
    woodGrid.setCell(15, 15, true)
    woodGrid.setCell(15, 16, true)

    // spawns:
    //   player : (450,  50)   col  9, row  1
    //   enemy1 : (200, 350)   col  4, row  7   (top-left)
    //   enemy2 : (700, 350)   col 14, row  7   (top-right)
    //   enemy3 : (200, 850)   col  4, row 17   (bottom-left)
    //   enemy4 : (700, 850)   col 14, row 17   (bottom-right)

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