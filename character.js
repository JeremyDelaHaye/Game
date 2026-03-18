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
    constructor(x,y,speed,sprite,angle)
    {
        super(x,y,speed,sprite,angle)
    }

    updateRotation()
    {
        this.setAngle(atan2(mouseY - (this.getY()+ 25), mouseX - (this.getX() + 25)) - HALF_PI)
    }

    movement()
    {
        const A = 65, D = 68, W = 87, S = 83;
        if (keyIsDown(A)) { player.moveX(-0.3); }
        if (keyIsDown(D)) { player.moveX(0.3);  }
        if (keyIsDown(W)) { player.moveY(-0.3); }
        if (keyIsDown(S)) { player.moveY(0.3);  }
    }
                                
    draw() 
    {
        push();
            translate(this.getX() + 25, this.getY() + 25); 
            rotate(this.getAngle());
            noStroke();
            rect(-25, -25, 50, 50);           
            rect(-6.25, 0, 12.5, 50);         
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