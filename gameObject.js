class GameObject
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

    /** @returns x position */
    getX()
    {
        return(this.#x)
    }

    /** @returns y position */
    getY()
    {
        return(this.#y)
    }

    /** @returns object width */
    getWidth()
    {
        return(this.#width)
    }

    /** @returns object height */
    getHeight()
    {
        return(this.#height)
    }

    /** @param {number} newX - new x position */
    setX(newX)
    {
        this.#x = newX
    }

    /** @param {number} newY - new y position */
    setY(newY)
    {
        this.#y = newY
    }

    /** @param {number} newWidth - new width */
    setWidth(newWidth)
    {
        this.#width = newWidth
    }

    /** @param {number} newHeight - new height */
    setHeight(newHeight)
    {
        this.#height = newHeight
    }
}
