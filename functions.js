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

function loadMap(map, grid,healthGrid)
{
    for (let row = 0; row < map.length; row++)
    {
        for (let col = 0; col < map[row].length; col++)
        {
            const x = col * CELLSIZE
            const y = row * CELLSIZE

            const deadSprites = [dead1, dead2, dead3, dead4]
            const splatSprites = [splatter1, splatter2]
            const deadSprite = deadSprites[Math.floor(Math.random() * deadSprites.length)]
            const bloodSplatter = splatSprites[Math.floor(Math.random() * splatSprites.length)]

            if (map[row][col] ==='#'){grid.setCell(row,col,true)}
            if (map[row][col] ==='.'){healthGrid.setCell(row,col,true);}
            
            if (map[row][col] ==='+')
            {
                enemys.push( new Enemy(x,y,2,enemyUnarmed,enemyAttack,bloodSplatter,deadSprite,10))
            }
            if (map[row][col] === '@')
            {
                enemys.push(new ShootingEnemy(x,y,1,enemyArmed,bloodSplatter,deadSprite,2))
            } 
            if (map[row][col] === '^')
            {
                player.setX(x)
                player.setY(y)
            }
            if (map[row][col] === '$')
            {
                doorGrid.setCell(row,col,true)
            }
        }
    }
}

function occupyEmptyGrid(fillGrid, checkGrid)
{
    try{
    const checkRow = (Math.ceil(height/checkGrid.getCellSize()));
    const checkCol = (Math.ceil(width/checkGrid.getCellSize()));

    for (let row = 0; row < checkRow; row++)
    {
        for (let col = 0; col < checkCol; col++)
        {
            if (!checkGrid.getCell(row,col))
            {
                fillGrid.setCell(row,col,true)
            }
        }
    }  
    }
    catch{}
}

function drawUI()
{
    textSize(25)
    fill(255)
    text('score:' + player.getScore(), 10, 20)
    text('health:' + player.getHealth(), 150, 20)
}

function enemyDraw()
{
    for (let i = 0; i < enemys.length; i++)
    {
        enemys[i].logic(player,colGrid)  
    }
}

function textureDraw()
{
    for (let i = 0; i < textureGrids.length; i++)
    {
        textureGrids[i].drawTexture()
    }
}

function resetGame()
{
    player.setHealth(100)
    player.setScore(0)
    player.setState(true)
    colGrid.createEmptyGrid()
    healthGrid.createEmptyGrid()
    doorGrid.createEmptyGrid()
    enemys = []
    textureGrids = []
}

function nextLevel()
{
    if (enemyCount <= 0)
    {
        //doorGrid.drawTexture()
        if (doorGrid.isOccupied(player.getX() + 25, player.getY() + 25))
        {
            if (gameState === 1) createdLvl1 = false
            if (gameState === 2) createdLvl2 = false
            if (gameState === 3) createdLvl3 = false
            gameState++
        }
    }
}

function fullLevelLogic()
{   
    background(0)
    textureDraw()
    enemyDraw()
    player.draw(colGrid,healthGrid)
    drawUI()
    dead()
    nextLevel()
}

function killAll()
{
    enemyCount = 0
}