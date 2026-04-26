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
    legs = loadImage('Assets/legs.png')
    playerAttack = loadImage('Assets/playerAttack.png')
    playerWalk = loadImage('Assets/playerWalk.png')
    splatter1 = loadImage('Assets/splatter1.png')
    splatter2 = loadImage('Assets/splatter2.png')
    splatter3 = loadImage('Assets/splatter3.png')
    walls = loadImage('Assets/walls.png')
    wood = loadImage('Assets/wood.jpg')
}

function setup()
{
    initializeGame()
    
}

function draw()
{
    switch(gameState)
    {
        case 0:
            level0()
        break

        case 1:
            level1()
        break

        case 2:
            level2()
        break

        case 3:
            level3()
        break

        case 4:
            level4()
        case 5:
    
        break
    }
}

function mousePressed()
{
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
        gameState++
    }

    if (keyCode === 32)
    {
        if (gameState === 5)
        {
            gameState = pastState
        }
    }
}


