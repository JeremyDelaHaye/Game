function setup()
{
    pixelDensity(1)
    initializeGame() 
}

function draw()
{   
    console.log(gameState)
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

function mouseDragged()
{
    if (gameState===9)
    {
        levelEdit.paint(paintVal)
    }
    
}

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
    
    //escape
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
        //pause
        if (gameState === 1)
        {
            resetGame()
            gameState = pastState
        }

        if (gameState === 2)
        {
            gameState++
        }

        if (gameState === 0)
        {
            gameState = pastState
        }

        if (gameState === 9)
        {
            levelEdit.exportLevel()
        }
    }

    //level editor keys 
    if (key >= '0' && key <= '6')
    {
        if (gameState === 9)
        {
            paintVal = Number(key)
        }
    }
}

function windowResized()
{
    scaleFactor = Math.min(windowWidth / 1500, (windowHeight - 4) / 1500)
    let cnv = document.querySelector('canvas')
    cnv.style.width  = (1500 * scaleFactor) + 'px'
    cnv.style.height = (1500 * scaleFactor) + 'px'
}



