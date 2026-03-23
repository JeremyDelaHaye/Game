class gameObject
{
    #x
    #y
    #width
    #height

    constructor(x,y,width,height)
    {
        this.#x = x
        this.#y = y
        this.#width = width
        this.#height = height
    }

    getX()
    {
        return(this.#x)
    }

    getY()
    {
        return(this.#y)
    }

    getWidth()
    {
        return(this.#width)
    }

    getHeight()
    {
        return(this.#height)
    }

    setX(newX)
    {
        this.#x = newX
    }

    setY(newY)
    {
        this.#y = newY
    }

    setWidth(newWidth)
    {
        this.#width = newWidth
    }

    setHeight(newHeight)
    {
        this.#height = newHeight
    }


}