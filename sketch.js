// add wsad movement 
// add colision detection 
// create gun/bullet class 

function setup()
{
    player = new Player(300,300)
    createCanvas(600,600)
}

function draw()
{
    background(0)
    player.updateRotation()
    player.draw()
    player.movement()
    
}



