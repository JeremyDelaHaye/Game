class Bullet extends gameObject
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
        /*
        let xx = this.getX()
        let yy = this.getY()
        xx += this.#speed * Math.cos(this.#angle + Math.PI / 2);
        yy += this.#speed * Math.sin(this.#angle + Math.PI / 2);

        push();
            translate(xx + 25, xx+ 25); 
            rotate(this.#angle - Math.PI / 2);
            noStroke();
            rectMode(CENTER);
            rect(0, 0, 50, 10);
        pop();
        */

        
    }
}
