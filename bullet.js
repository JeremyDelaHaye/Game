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
}
