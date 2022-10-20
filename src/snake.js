class RenderingInfo {
    static Type = {
        CORNER_NONE: 0,
        CORNER_TOP: 1,
        CORNER_RIGHT: 2,
        CORNER_DOWN: 3,
        CORNER_LEFT: 4
    }
    constructor(row, column, type) {
        this.row = row;
        this.column = column;
        this.type = type;
    }
}

class Snake {
    static DIRECTION = {
        UP:0,
        RIGHT:1,
        DOWN:2,
        LEFT:3
    }
    constructor(boardDimension) {
        this.tail_ = new SnakePart(Math.floor(boardDimension / 2), 1, Snake.DIRECTION.RIGHT);
        this.head_ = new SnakePart(Math.floor(boardDimension / 2), 2, Snake.DIRECTION.RIGHT, this.tail_);
        this.boardDimension_ = boardDimension;
        this.justChangedDirection = false;
    }

    /**
     * Returns whether or not a part of the snake is at the location indicated by
     * the parameters. This function is used to see if we can place a food item
     * at the row, column.
     * @param {number} row 
     * @param {number} column 
     * @returns {boolean}
     */
    collidesWithSnake(row, column) {

    }

    /**
     * Returns true if the head of the snake is beyond the board limits OR
     * if the head of the snake is hitting a different part of the snake 
     * @returns {boolean}
     */
    isGameOver() {

    }

    /**
     * Maps the parts of the snake into an array of RenderingInfo.
     * For the head of the snake: 
     *  1. if it's moving up, the type of the rendering info is CORNER_TOP
     *  2. if it's moving right, the type of the rendering info is CORNER_RIGHT
     *  3. if it's moving down, the type of the rendering info is CORNER_DOWN
     *  4. if it's moving left, the type of the rendering info is CORNER_LEFT
     * For the tail of the snake: 
     *  1. if it's moving up, the type of the rendering info is CORNER_DOWN
     *  2. if it's moving right, the type of the rendering info is CORNER_LEFT
     *  3. if it's moving down, the type of the rendering info is CORNER_UP
     *  4. if it's moving left, the type of the rendering info is CORNER_RIGHT
     * For the interior part of the snake (neither head nor tail), the type is CORNER_NONE
     * @returns {Array<!RenderingInfo>}
     */
    getRenderingInfo() {
        
    }

    /**
     * Appends a new SnakePart to the current tail. Then sets the tail
     * variable to the new SnakePart just created
     */
    addOneLength() {
        
    }

    /**
     * Returns [row, column] of the head of the snake
     * @returns {Array<Number>}
     */
    getHeadPosition() {
        
    }

    /**
     * Moves the position of the snake forward by one.
     * This function will respect all the points of pivots that was 
     * created by previous ChangeDirection calls
     */
    moveForwardOne() {
        
    }

    /**
     * This allows changeDirection to actually change the direction of the snake
     */
    allowDirectionChange() {
       
    }

    /**
     * Changes the direction of the snake. It should prevent any further calls to this
     * function to do anything before "allowDirectionChange" gets called again.
     * This is so that if the user decides to spam the arrow key buttons really fast,
     * the game would only listen to the first button press every X amount of milliseconds
     * @param {Snake.Direction}
     */
    changeDirection(direction) {
      
    }
};

module.exports = {RenderingInfo, Snake};