class Bullet 
{
    #x
    #y
    #angle 
    #speed

    constructor(x,y,angle,speed)
    {
        this.#x = x
        this.#y = y
        this.#angle = angle
        this.#speed = speed
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

    draw()
    {
        this.#x += this.#speed * Math.cos(this.#angle + Math.PI / 2);
        this.#y += this.#speed * Math.sin(this.#angle + Math.PI / 2);

        push();
            translate(this.#x + 25, this.#y + 25); 
            rotate(this.#angle - Math.PI / 2);
            noStroke();
            rectMode(CENTER);
            rect(0, 0, 50, 10);
        pop();
    }
}
