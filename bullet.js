class Bullet extends GameObject
{
    
    #angle 
    #speed

    constructor(x,y,angle,speed)
    {
        super(x,y)
        this.#angle = angle
        this.#speed = speed
    }

    getAngle()
    {
        return(this.#angle)
    }

    draw()
    {
        let sx = this.getX() + this.#speed * Math.cos(this.#angle + Math.PI / 2);
        let sy = this.getY() + this.#speed * Math.sin(this.#angle + Math.PI / 2);

        this.setX(sx)
        this.setY(sy)
        fill(140)
        push();
            translate(this.getX() + 25, this.getY() + 25); 
            rotate(this.#angle - Math.PI / 2);
            noStroke();
            rectMode(CENTER);
            rect(0, 0, 13, 5);
        pop();
    }
}