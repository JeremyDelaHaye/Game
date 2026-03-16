// add wsad movement 
// add colision detection 
// create gun/bullet class 

function setup()
{
    player = new character(300,300)
    createCanvas(600,600)
}

function draw()
{
    background(0)
    player.draw()
}