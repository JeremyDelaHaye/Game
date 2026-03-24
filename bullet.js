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
        let x = this.getX();
        let y = this.getY();
        x += this.#speed * Math.cos(this.#angle + Math.PI / 2);
        y += this.#speed * Math.sin(this.#angle + Math.PI / 2);

        push();
            translate(x + 25, y + 25); 
            rotate(this.#angle - Math.PI / 2);
            noStroke();
            rectMode(CENTER);
            rect(0, 0, 50, 10);
        pop();
        console.log(this.#angle)

        

    }
}
