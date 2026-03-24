let idle, sheet; 
function preload()
{
    idle = loadImage('assets/sprite_01.png');
    sheet = loadImage('assets/character_template-Sheet.png')
}

function setup()
{
    createCanvas(750,600) 
    player = new Player(300,300,idle,sheet)
    enemy = new Enemy(random(600),random(600),10)
    grid = new Grid(50)
    grid.createEmptyGrid()
    for (i = 0; i < 12;i++)
    {
        grid.addToGrid(i,13)
    }
    for (i = 0; i < 15;i++)
    {
        grid.addToGrid(10,i)
    }
     
}

function draw() 
{
    
    background(0)
    player.draw(grid) 
    grid.drawGrid()

    try{bullet.draw()}
    catch{}
    
    
    
    
}

function mousePressed()
{
    bullet = new Bullet(player.getX(),player.getY(),player.getAngle(),30)
}
