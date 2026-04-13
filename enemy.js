class Enemy extends Character
{
    #state
    #size
    #destX
    #destY

    constructor(x,y,speed,sprite,angle,size)
    {
        super(x,y,speed,sprite,angle)
        this.#state = true;
        this.#size = size
        this.#destX
        this.#destY
        this.#setPoint
    }

    #setPoint()
    {
        this.#destX = random(500)
        this.#destY = ranom(500)
    }

    draw(p)
    {   
        if (p.getAttackFrame() === 4 && dist(p.getX(), p.getY(), this.getX(), this.getY()) < 80)
        {
            this.#state = false;
        }
        if (this.#state)
        {
            fill(255, 0, 0)
            rect(this.getX(), this.getY(), this.#size)
        }
    }
}