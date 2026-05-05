/**
 * Copies all true cells from inputGrid into colGrid at the same positions.
 * Used to merge a texture grid into the collision grid when loading a level.
 * @param {Grid} inputGrid - The source grid to read from.
 * @param {Grid} colGrid - The target collision grid to write into.
 */
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

/**
 * Parses a 2D string array map and sets grid cells and spawns entities accordingly.
 * @param {string[]} map - The 2D string array representing the level layout.
 * @param {TextureGrid} grid - The wall texture grid to populate.
 * @param {ItemGrid} healthGrid - The health pickup grid to populate.
 */
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
                enemys.push( new Enemy(x,y,2,enemyUnarmed,enemyAttack,bloodSplatter,deadSprite,5))
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

/**
 * Sets all cells in fillGrid to true where checkGrid has false cells.
 * Used to fill floor texture into all non-wall cells.
 * @param {TextureGrid} fillGrid - The grid to fill with true values.
 * @param {Grid} checkGrid - The grid to check against.
 */
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

/**
 * Updates the HTML UI elements with the player's current health and score.
 * Hides the UI when not in an active level state.
 */
function drawUI()
{
    const ui = document.getElementById('gameUI')
    
    if (gameState >= 3 && gameState <= 7)
    {
        ui.style.display = 'block'
        document.getElementById('healthDisplay').innerText = 'Health: ' + player.getHealth()/2
        document.getElementById('scoreDisplay').innerText = 'Score: ' + player.getScore()
    }
    else
    {
        ui.style.display = 'none'
    }
    
}

/**
 * Iterates through all enemies and calls their logic function each frame.
 */
function enemyDraw()
{
    for (let i = 0; i < enemys.length; i++)
    {
        enemys[i].logic(player,colGrid)  
    }
}

/**
 * Iterates through all texture grids and calls their drawTexture function each frame.
 */
function textureDraw()
{
    for (let i = 0; i < textureGrids.length; i++)
    {
        textureGrids[i].drawTexture()
    }
}

/**
 * Resets all game state to defaults. Clears grids, enemy and texture arrays,
 * resets player stats, and clears level created flags.
 */
function resetGame()
{
    player.setHealth(200)
    player.setScore(0)
    player.setState(true)
    colGrid.createEmptyGrid()
    healthGrid.createEmptyGrid()
    doorGrid.createEmptyGrid()
    if (levelEdit) levelEdit.hideUI()
    createdLvl0 = false
    createdLvl1 = false
    createdLvl2 = false
    createdLvl3 = false
    createdLvl4 = false
    createdLvlCreated = false
    createdLvlEditor = false
    levelEdit = null
    enemys = []
    textureGrids = []
}

/**
 * Checks if the level is complete. If all enemies are dead and the player
 * is standing on the door tile, advances the game state to the next level.
 */
function nextLevel()
{
    if (enemyCount <= 0)
    {
        doorGrid.drawTexture()
        if (doorGrid.isOccupied(player.getX() + 25, player.getY() + 25))
        {
            console.log(player.getState())
            if (gameState === 3) createdLvl1 = false
            if (gameState === 4) createdLvl2 = false
            if (gameState === 5) createdLvl3 = false
            if (gameState === 6) createdLvl4 = false
            if (gameState === 8) 
            {
                createdLvlCreated = false
                gameState = 2
                return
            }
            gameState++
        }
    }
}

/**
 * Runs all per-frame level logic: textures, enemies, player, UI, level completion, and death check.
 */
function fullLevelLogic()
{   
    textureDraw()
    enemyDraw()
    player.draw(colGrid,healthGrid)
    drawUI()
    nextLevel()
    dead()
}

function killAll()
{
    enemyCount = 0
    for(let i = 0; i < enemys.length; i++)
    {
        enemys[i].setState(false)
    }
}

/**
 * Clears the canvas each frame using drawingContext to prevent ghosting from rotated sprites.
 */
function refreshCanvas()
{
    drawingContext.save()
    drawingContext.setTransform(1, 0, 0, 1, 0, 0)
    drawingContext.fillStyle = '#000000'
    drawingContext.fillRect(0, 0, 1500, 1500)
    drawingContext.restore()
}