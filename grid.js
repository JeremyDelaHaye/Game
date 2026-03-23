class grid
{
    #cells
    #cellSize

    constructor(cellSize)
    {
        this.#cellSize = cellSize
        this.createEmptyGrid()
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


}