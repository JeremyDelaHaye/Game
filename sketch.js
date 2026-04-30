function preload()
{
    walkSheet = loadImage('Assets/playerWalk.png')
    attackSheet = loadImage('Assets/playerAttack.png')
    enemyWalk = loadImage('Assets/enemyUnarmed.png')
    bricks = loadImage('Assets/bricks.jpg')
    darkStoneWall = loadImage('Assets/darkStoneWall.jpg')
    dead1 = loadImage('Assets/dead1.png')
    dead2 = loadImage('Assets/dead2.png')
    dead3 = loadImage('Assets/dead3.png')
    dead4 = loadImage('Assets/dead4.png')
    enemyAttack = loadImage('Assets/enemyAttack.png')
    enemyUnarmed = loadImage('Assets/enemyUnarmed.png')
    enemyArmed = loadImage('Assets/enemyArmed.png')
    grass = loadImage('Assets/grass.jpg')
    playerAttack = loadImage('Assets/playerAttack.png')
    playerWalk = loadImage('Assets/playerWalk.png')
    splatter1 = loadImage('Assets/splatter1.png')
    splatter2 = loadImage('Assets/splatter2.png')
    walls = loadImage('Assets/walls.png')
    wood = loadImage('Assets/wood.jpg')
    med = loadImage('Assets/med.png')
    gunShot = loadSound('Assets/GunShot.mp3')
    swordSwoosh = loadSound('Assets/SwordSwoosh.mp3')
    grunt = loadSound('Assets/Grunt.mp3')
}

function setup()
{
    pixelDensity(1)
    initializeGame() 
}

function draw()
{   
    drawingContext.save()
    drawingContext.setTransform(1, 0, 0, 1, 0, 0)
    drawingContext.fillStyle = '#000000'
    drawingContext.fillRect(0, 0, 1500, 1500)
    drawingContext.restore()
    switch(gameState)
    {
        case 0:
            fill(0)
            rect(1500,1500)
            textAlign(CENTER)
            textSize(50)
            fill(255)
            text("YOU DIED", width/2, height/2)
            textSize(25)
            text("Press SPACE to respawn", width/2, height/1.5)
        break

        case 1:
            fill(0)
            rect(1500,1500)
            textAlign(CENTER)
            textSize(50)
            fill(255)
            text("PAUSE", width/2, height/2)
            textSize(25)
            text("Press SPACE to restart", width/2, height/1.5)
            text("Press ENTER to go to main menu", width/2, height/1.25)
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
        
    }
}

function mousePressed()
{
    if (gameState === 2)
    {
        gameState++
    }
    if(player.getHealth()>=0)
    {
        if (player.getAttackFrame() === 0)
        {
            player.startAttack()
        }
    }

    if (player.getState() === false)
    {
        resetGame()
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
        else
        {
            gameState++
        }
    }

    if (keyCode === 32)
    {
        if (gameState === 0)
        {
            gameState = pastState
        }
    }

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

    if (keyCode === 32)
    {
        if (gameState === 1)
        {
            resetGame()
            gameState = pastState
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


