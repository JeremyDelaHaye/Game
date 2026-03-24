class Character extends GameObject
{
    
    #speed;
    #sprite;
    #angle 

    constructor(x,y,sprite)
    {
        super(x,y,width,height)
        this.#speed = 10;
        this.#sprite = sprite;
        this.#angle = 0;
    }

    moveX(distance)
    {
        let val = this.getX()
        this.setX(val += (this.#speed * distance)) ;
    }

    moveY(distance)
    {
        let val = this.getY()
        this.setY(val += (this.#speed * distance)) ; 
    }

    setAngle(value)
    {
        this.#angle = value
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
    #movementState

    constructor(x,y,sprite)
    {
        super(x,y,sprite)
        this.#movementState = true 
    }


    updateRotation()
    {
        this.setAngle(atan2(mouseY - (this.getY()+ 25), mouseX - (this.getX() + 25)) - HALF_PI)
    }

    movement()
    {
        const A = 65, D = 68, W = 87, S = 83;

        this.#movementState = false;
        if (keyIsDown(A)) 
        { 
            let int = (this.getY()+= (this.getSpeed() * distance))
            player.moveX(-0.3); this.#movementState = true;
        }

        if (keyIsDown(D)) 
        { 
            player.moveX(0.3);  this.#movementState = true;
        }

        if (keyIsDown(W)) 
        { 
            player.moveY(-0.3); this.#movementState = true;
        }

        if (keyIsDown(S)) 
        { 
            player.moveY(0.3);  this.#movementState = true;
        }

        
    }
                                
    draw() 
    {
        this.updateRotation()
        this.movement()
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