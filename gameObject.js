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

    /**
     * Returns the x position of the object.
     * @returns {number} The x coordinate in pixels.
     */
    getX()
    {
        return(this.#x)
    }

    /**
     * Returns the y position of the object.
     * @returns {number} The y coordinate in pixels.
     */
    getY()
    {
        return(this.#y)
    }

    /**
     * Returns the width of the object.
     * @returns {number} The width in pixels.
     */
    getWidth()
    {
        return(this.#width)
    }

    /**
     * Returns the height of the object.
     * @returns {number} The height in pixels.
     */
    getHeight()
    {
        return(this.#height)
    }

    /**
     * Sets the x position of the object.
     * @param {number} newX - The new x coordinate in pixels.
     */
    setX(newX)
    {
        this.#x = newX
    }

    /**
     * Sets the y position of the object.
     * @param {number} newY - The new y coordinate in pixels.
     */
    setY(newY)
    {
        this.#y = newY
    }

    /**
     * Sets the width of the object.
     * @param {number} newWidth - The new width in pixels.
     */
    setWidth(newWidth)
    {
        this.#width = newWidth
    }

    /**
     * Sets the height of the object.
     * @param {number} newHeight - The new height in pixels.
     */
    setHeight(newHeight)
    {
        this.#height = newHeight
    }
}
