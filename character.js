class Character
{
    #x; 
    #y; 
    #speed;
    #sprite;
    #angle 

    constructor(x,y,sprite)
    {
        this.#x = x;
        this.#y = y;
        this.#speed = 10;
        this.#sprite = sprite;
        this.#angle = 0;
    }

    moveX(distance)
    {
        this.#x += (this.#speed * distance);
    }

    moveY(distance)
    {
        this.#y += (this.#speed * distance); 
    }

    setX(xPos)
    {
        this.#x = xPos
    }
    setY(yPos)
    {
        this.#y = yPos
    }

    setAngle(value)
    {
        this.#angle = value
    }

    getX()
    {
        return(this.#x)
    }

    getY()
    {
        return(this.#y)
    }

    getAngle()
    {
        return(this.#angle)
    }

    getSprite()
    {
        return(this.#sprite)
    }
}

class Player extends Character
{
    #frameIndex;
    #frameTimer;
    #frameDelay;
    #sheet;
    #movementState

    constructor(x,y,sprite,sheet)
    {
        super(x,y,sprite)
        this.#sheet = sheet;
        this.#movementState = true 
        this.#frameIndex = 0;
        this.#frameTimer = 0;
        this.#frameDelay = 8;
    }

    animateWalk()
    {   
        this.#frameTimer++;
        if (this.#frameTimer >= this.#frameDelay) 
        {
            if (this.#frameIndex < 2) this.#frameIndex = 2; // start at 3rd sprite
            this.#frameIndex = ((this.#frameIndex - 2 + 1) % 9) + 2;
            this.#frameTimer = 0;
        }

    }

    updateRotation()
    {
        this.setAngle(atan2(mouseY - (this.getY()+ 25), mouseX - (this.getX() + 25)) - HALF_PI)
    }

    movement()
    {
        const A = 65, D = 68, W = 87, S = 83;

        this.#movementState = false;
        if (keyIsDown(A)) { player.moveX(-0.3); this.#movementState = true;}
        if (keyIsDown(D)) { player.moveX(0.3);  this.#movementState = true;}
        if (keyIsDown(W)) { player.moveY(-0.3); this.#movementState = true;}
        if (keyIsDown(S)) { player.moveY(0.3);  this.#movementState = true;}

        
    }
                                
    draw() 
    {
        push();
            translate(this.getX() + 25, this.getY() + 25); 
            rotate(this.getAngle());
            rotate(PI)
            noStroke();
            if (this.#movementState === true)
            {
                fill(0,0,255)
                rect(-30,-30,37)
                rect(10,-30,37)
            }
            image(this.getSprite(),-30, -25,80,40)

            
        pop();
    }

}

class Enemy extends Character
{
    #state

    constructor(x,y,speed,sprite,angle)
    {
        super(x,y,speed,sprite,angle)
        this.#state = true;
    }

    kill(incomingX,incomingY)
    {
        const width = 50;
        const height = 50;

        if (incomingX > this.getX() && incomingX < this.getX() + width &&
        incomingY > this.getY() && incomingY < this.getY() + height)
        {
            this.#state = false;
        }
    }

    draw()
    {
        if (this.#state === true)
        {
            rect(this.getX(),this.getY(),50,50)
        }
    }
}