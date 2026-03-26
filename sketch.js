let idle, sheet; 
function preload()
{
    idle = loadImage('assets/sprite_01.png');
    walkSheet = loadImage('Assets/sprPWalkUnarmed_strip8.png')
    attackSheet = loadImage('Assets/sprPAttackSword_strip7.png')
}

function setup()
{
    createCanvas(750,600) 
    player = new Player(300,300,idle,attackSheet,walkSheet)
    enemy = new Enemy(random(600),random(600),10)
    grid = new Grid(20)
    grid.createEmptyGrid()
}

function draw() 
{
    background(0)
    player.draw(grid) 
    grid.drawGrid()
    
}

function mousePressed()
{
    if (player.getAttackFrame() === 0)
    {
        player.startAttack() 
    }
}
