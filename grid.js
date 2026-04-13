class Grid
{
    #cells
    #cellSize

    constructor(cellSize)
    {
        this.#cellSize = cellSize
        this.createEmptyGrid()
    }

    getCells()
    {
        return this.#cells
    }

    getCellSize()
    {
        return this.#cellSize
    }

    createEmptyGrid()
    {

        const rows = Math.ceil(height/this.#cellSize);
        const cols = Math.ceil(width/this.#cellSize);
        this.#cells = [];
        for (let row = 0; row < rows; row++)
        {
            this.#cells[row] = []

            for (let col = 0; col < cols; col++)
            {
                this.#cells[row][col] = false;
            }
        }
    }

    addToGrid(x,y)
    {
        //const rows = Math.ceil(y/this.#cellSize);
        //const cols = Math.ceil(x/this.#cellSize);
        this.#cells[x][y] = true
    } 

    

    drawGrid()
    {
        const rows = Math.ceil(height/this.#cellSize);
        const cols = Math.ceil(width/this.#cellSize);
        for (let row = 0; row < rows; row++)
        {
            for (let col = 0; col < cols; col++)
            {
                if(this.#cells[row][col] === true)
                {
                    fill(255)
                    rect(col * this.#cellSize, row * this.#cellSize, this.#cellSize, this.#cellSize);
                }
            }
        }

    }

    isOccupied(x,y)
    {
        if (x < 0 || x >= width || y < 0 || y >= height)
        {
            return true;
        }

        const row = this.#getIndexOfCoord(y)
        const col = this.#getIndexOfCoord(x)
        if (this.#cells[row][col] === true)
        {
            return true
        }
        else 
        {
            return false
        }
    }

    #getIndexOfCoord(coord) 
    {
        return Math.floor(coord / this.#cellSize);
    }


}

class TextureGrid extends Grid
{
    #texture
    constructor(cellSize,texture)
    {
        super(cellSize)
        this.#texture = texture
        this.createEmptyGrid()
    }

    drawTexture()
    {
        const rows = Math.ceil(height/this.getCellSize());
        const cols = Math.ceil(width/this.getCellSize());
        for (let row = 0; row < rows; row++)
        {
            
            for (let col = 0; col < cols; col++)
            {
                //console.log(this.getCells()[row])

                /*
                if(this.getCells[row][col] === true)
                {
                   // image(this.#texture,col * this.getCellSize, row * this.getCellSize, this.getCellSize, this.getCellSize)  
                   
                   fill(255)
                    rect(col * this.getCellSize, row * this.getCellSize, this.getCellSize, this.getCellSize);         
                }
                    */
            }
        }
    }
}