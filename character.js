// make it so square rotates based on mouse position


class character
{
    #x; 
    #y; 
    #speed;
    #sprite

    constructor(x,y,sprite)
    {
        this.#x = x;
        this.#y = y;
        this.#speed = 10;
        this.#sprite = sprite;
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
    setX(yPos)
    {
        this.#y = yPos
    }

    getX()
    {
        return(this.#x)
    }

    getY()
    {
        return(this.#y)
    }

    draw()
    {
        /*
        let x;
        let y;
        let angle = map(mouseX, 0, width, 0, TWO_PI);
        push();
        translate(x,y);
        rotate(angle);
        rect(0,0, 100, 100);
        pop();
        */
        noStroke()
        rect(this.#x+18.5,this.#y,12.5,100)
        rect(this.#x,this.#y,50)
        
        
    }
}