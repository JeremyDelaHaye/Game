class Grid extends GameObject
{
    #cells
    #cellSize

    constructor(cellSize)
    {
        super()
        this.#cellSize = cellSize
        this.createEmptyGrid()
    }

    /**
     * Returns the full 2D cells array.
     * @returns {Array} The 2D array of cell values.
     */
    getCells()
    {
        return this.#cells
    }

    /**
     * Returns the value of a cell at the given row and column.
     * @param {number} x - The row index.
     * @param {number} y - The column index.
     * @returns {boolean} The cell value.
     */
    getCell(x,y)
    {
        return(this.#cells[x][y])
    }

    /**
     * Returns the size of each cell in pixels.
     * @returns {number} The cell size in pixels.
     */
    getCellSize()
    {
        return this.#cellSize
    }

    /**
     * Sets the value of a cell at the given row and column.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @param {*} input - The value to set.
     */
    setCell(row,col,input)
    {
        this.#cells[row][col] = input
    }

    /**
     * Sets a cell value using pixel coordinates.
     * @param {number} x - The x pixel coordinate.
     * @param {number} y - The y pixel coordinate.
     * @param {*} input - The value to set.
     */
    setCellFromCord(x,y,input)
    {
        this.setCell(this.getIndexOfCoord(x),this.getIndexOfCoord(y),input)
    }

    /**
     * Returns the value of a cell using pixel coordinates.
     * @param {number} x - The x pixel coordinate.
     * @param {number} y - The y pixel coordinate.
     * @returns {*} The cell value.
     */
    getCellFromCord(x,y)
    {
        return(getCell(this.getIndexOfCoord(x),this.getIndexOfCoord(y)))
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

        const row = this.getIndexOfCoord(y)
        const col = this.getIndexOfCoord(x)
        if (this.#cells[row][col] === true)
        {
            return true
        }
        else 
        {
            return false
        }
    }

    /**
     * Converts a pixel coordinate to a grid index.
     * @param {number} coord - The pixel coordinate.
     * @returns {number} The grid cell index.
     */
    getIndexOfCoord(coord)
    {
        return Math.floor(coord / this.#cellSize);
    }

    /**
     * Returns the grid column index for a given x pixel coordinate.
     * @param {number} x - The x pixel coordinate.
     * @returns {number} The column index.
     */
    getGridPosX(x)
    {
        return(this.getIndexOfCoord(x))
    }

    /**
     * Returns the grid row index for a given y pixel coordinate.
     * @param {number} y - The y pixel coordinate.
     * @returns {number} The row index.
     */
    getGridPosY(y)
    {
        return(this.getIndexOfCoord(y))
    }  

    /**
     * Returns the pixel coordinates of a random empty cell in the grid.
     * @returns {{x: number, y: number}} An object with x and y pixel coordinates.
     */
    getEmptyCoord()
    {  
        const rows = Math.ceil(height/this.#cellSize);
        const cols = Math.ceil(width/this.#cellSize);
        const emptyCells = [];

        for (let row = 0; row < rows; row++)
        {
            for (let col = 0; col < cols; col++)
            {
                if(this.#cells[row][col] === false)
                {
                    emptyCells.push({x: col * this.#cellSize, y: row * this.#cellSize});
                }
            }
        }
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    
    
}

class TextureGrid extends Grid
{
    #texture
    constructor(cellSize,texture)
    {
        super(cellSize)
        this.#texture = texture  
    }

    /**
     * Returns the texture image assigned to this grid.
     * @returns {p5.Image} The texture image.
     */
    getTexture()
    {
        return(this.#texture)
    }

    drawTexture()
    {
        const rows = Math.ceil(height/this.getCellSize());
        const cols = Math.ceil(width/this.getCellSize());
        for (let row = 0; row < rows; row++)
        {
            for (let col = 0; col < cols; col++)
            {    
                if((this.getCells()[row][col]) === true)
                {
                    fill(255,0,0)
                    image(this.#texture,col * this.getCellSize(), row * this.getCellSize(), this.getCellSize(), this.getCellSize())
                }
            }
        }
    }
}

class uniqueTextureGrid extends TextureGrid 
{
    constructor(cellSize,texture,width,height,x,y)
    {
        super(cellSize,texture,width,height,x,y)

    }

    setOccupied()
    {
        for (let row = this.getIndexOfCoord(this.getY()); row <= this.getIndexOfCoord(this.getY() + this.getHeight()); row++)
        {
            for (let col = this.getIndexOfCoord(this.getX()); col <= this.getIndexOfCoord(this.getX()+ this.getWidth()); col++)
            {
                this.setCell(row, col, true)
            }
        }
    }

    drawTexture()
    {
        image(this.getTexture(),this.getX(),this.getY(),this.getWidth(),this.getHeight())
    }
}

class ItemGrid extends TextureGrid
{
    constructor(cellSize,texture)
    {
        super(cellSize,texture)
    }

    isOccupied(x,y)
    {
        if (x < 0 || x >= width || y < 0 || y >= height)
        {
            return true;
        }

        const row = this.getIndexOfCoord(y)
        const col = this.getIndexOfCoord(x)
        if (this.getCells()[row][col] === true)
        {
            this.setCell(row,col,false)
            return true
        }
        else 
        {
            return false
        }
    }
}

class LevelEditorGrid extends Grid
{
    constructor(cellSize)
    {
        super(cellSize)
        this.createEditorGrid()
    }

    createEditorGrid()
    {
        const rows = Math.ceil(height / this.getCellSize())
        const cols = Math.ceil(width / this.getCellSize())
        for (let row = 0; row < rows; row++)
        {
            for (let col = 0; col < cols; col++)
            {
                this.setCell(row, col, 0)
            }
        }
    }

    drawGrid()
    {
        const rows = Math.ceil(height / this.getCellSize())
        const cols = Math.ceil(width / this.getCellSize())
        stroke(30)

        for (let row = 0; row < rows; row++)
        {
            for (let col = 0; col < cols; col++)
            {
                let val = this.getCell(row, col)

                let x = col * this.getCellSize()
                let y = row * this.getCellSize()

                if (val === 1)      fill(255)
                else if (val === 2) fill(0, 255, 0)
                else if (val === 3) fill(255, 140, 0)
                else if (val === 4) fill(255, 0, 0)
                else if (val === 5) fill(0, 150, 255)
                else if (val === 6) fill(255, 255, 0)
                else                fill(0)

                rect(x, y, this.getCellSize(), this.getCellSize())
            }
        }

        noStroke()
    }

    fillPerimeter()
    {
        const rows = Math.ceil(height / this.getCellSize())
        const cols = Math.ceil(width / this.getCellSize())

        for (let col = 0; col < cols; col++)
        {
            this.setCell(0, col, 1)
            this.setCell(rows - 1, col, 1)
        }

        for (let row = 0; row < rows; row++)
        {
            this.setCell(row, 0, 1)
            this.setCell(row, cols - 1, 1)
        }
    }

    paint(currentValue)
    {
        let col = Math.floor(mouseX / this.getCellSize())
        let row = Math.floor(mouseY / this.getCellSize())

        const rows = Math.ceil(height / this.getCellSize())
        const cols = Math.ceil(width / this.getCellSize())

        if (row < 0 || row >= rows || col < 0 || col >= cols) return
        this.setCell(row, col, currentValue)   
    }

    exportLevel()
    {
        const rows = Math.ceil(height / this.getCellSize())
        const cols = Math.ceil(width / this.getCellSize())
    
        CREATEDLEVEL = []

        for (let row = 0; row < rows; row++)
        {
            let line = ""
            for (let col = 0; col < cols; col++)
            {
                let val = this.getCell(row, col)
                if (val === 0) line += " "
                if (val === 1) line += "#"
                if (val === 2) line += "."
                if (val === 3) line += "+"
                if (val === 4) line += "@"
                if (val === 5) line += "^"
                if (val === 6) line += "$"
            }
            CREATEDLEVEL.push(line)
        }
        console.log(CREATEDLEVEL)
    }

    createUI()
    {
        this.uiDiv = createDiv()
        this.uiDiv.position(10, 10)
        this.uiDiv.style("color", "white")
        this.uiDiv.style("font-family", "monospace")
        this.uiDiv.style("font-size", "14px")
        this.uiDiv.style("line-height", "18px")
        this.uiDiv.style("z-index", "20")
        this.uiDiv.style("position", "fixed")

        this.uiDiv.html(`
            <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
                <div>0 <span style="display:inline-block;width:12px;height:12px;background:#000;border:1px solid #555"></span> empty</div>
                <div>1 <span style="display:inline-block;width:12px;height:12px;background:#ffffff"></span> wall</div>
                <div>2 <span style="display:inline-block;width:12px;height:12px;background:#00ff00"></span> health</div>
                <div>3 <span style="display:inline-block;width:12px;height:12px;background:#ff8c00"></span> enemy</div>
                <div>4 <span style="display:inline-block;width:12px;height:12px;background:#ff0000"></span> shooting enemy</div>
                <div>5 <span style="display:inline-block;width:12px;height:12px;background:#00aaff"></span> spawn</div>
                <div>6 <span style="display:inline-block;width:12px;height:12px;background:#ffff00"></span> end</div>
                <div style="margin-left:20px;">SPACE = export</div>
            </div>
        `)

        this.perimeterButton = createButton("Fill Perimeter")
        this.perimeterButton.position(10, height + 70)
        this.perimeterButton.mousePressed(() => this.fillPerimeter())
    }

    hideUI()
    {
        if (this.uiDiv) this.uiDiv.remove()
        if (this.perimeterButton) this.perimeterButton.remove()
    }

    fullLogic()
    {
        this.drawGrid()
    }
}



