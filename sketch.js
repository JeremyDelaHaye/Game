// p5.js entry point, initialises the game
function setup()
{
    pixelDensity(1)
    initializeGame()
}

// called every frame, routes to correct screen via gameState switch
function draw()
{
    refreshCanvas()
    switch(gameState)
    {
        case 0:
            deathScreen()
        break
        case 1:
            pauseScreen()
        break
        case 2:
            level0()
        break
        case 3:
            level1()
        break
        case 4:
            level2()
        break
        case 5:
            level3()
        break
        case 6:
            level4()
        break
        case 7:
            endGame()
        break
        case 8:
            createdlevel()
        break
        case 9:
            levelEditor()
        break
    }
}

// handles mouse click - triggers attack or paints level editor cell
function mousePressed()
{
    if (gameState === 9)
    {
        levelEdit.paint(paintVal)
    }

    if ((gameState>= '2' && gameState <= '6')|| gameState === 8)
    {
        if(player.getHealth()>=0)
        {
            if (player.getAttackFrame() === 0)
            {
                player.startAttack()
            }
        }
    }

    if (player.getState() === false)
    {
        resetGame()
    }
}

// paints level editor cell while mouse is held and dragged
function mouseDragged()
{
    if (gameState===9)
    {
        levelEdit.paint(paintVal)
    }

}

// handles all key input for game state transitions and level editor controls
function keyPressed()
{
    if (keyCode === ENTER)
    {
        if (gameState === 1)
        {
            resetGame()
            gameState = 2
        }
        if (gameState === 7)
        {
            resetGame()
            gameState = 2
        }
    }

    if(key === '1')
    {
        if (gameState === 2)
        {
            gameState = 9
        }
    }

    if(key === '2')
    {
        if (gameState === 2)
        {
            gameState = 8
        }
    }

    //escape - toggles pause
    if (keyCode === 27)
    {
        if (gameState !== 1)
        {
            pastState = gameState
            gameState = 1
        }
        else
        {
            gameState = pastState
        }
    }

    //space
    if (keyCode === 32)
    {
        //resume from pause
        if (gameState === 1)
        {
            resetGame()
            gameState = pastState
        }

        //start game from title
        if (gameState === 2)
        {
            gameState++
        }

        //respawn from death screen
        if (gameState === 0)
        {
            gameState = pastState
        }

        //export level in editor
        if (gameState === 9)
        {
            levelEdit.exportLevel()
        }
    }

    //level editor brush selection keys 0-6
    if (key >= '0' && key <= '6')
    {
        if (gameState === 9)
        {
            paintVal = Number(key)
        }
    }
}

// rescales canvas to fit window on resize
function windowResized()
{
    scaleFactor = Math.min(windowWidth / 1500, (windowHeight - 4) / 1500)
    let cnv = document.querySelector('canvas')
    cnv.style.width  = (1500 * scaleFactor) + 'px'
    cnv.style.height = (1500 * scaleFactor) + 'px'
}
