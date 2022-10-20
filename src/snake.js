class SnakePart {
    constructor (row, column, direction, next = null) {
        this.row = row;
        this.column = column;
        this.direction = direction;
        this.pivot = null;
        this.pivotNext = null;
        this.next = next;
    }

    move() {
        if (this.pivot !== null) {
            this.direction = this.pivot;
            if (this.next !== null) {
                this.next.pivotNext = this.pivot;
            }
        }
        if (this.pivotNext !== null) {
            this.pivot = this.pivotNext;
            this.pivotNext = null;
        }
        switch (this.direction) {
            case Snake.DIRECTION.DOWN:
                this.row += 1;
                break;
            case Snake.DIRECTION.UP:
                this.row -= 1;
                break;
            case Snake.DIRECTION.LEFT:
                this.column -= 1;
                break;
            case Snake.DIRECTION.RIGHT:
                this.column += 1;
                break;
        }
    }
}

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
        let node = this.head_;
        while (node !== null) {
            if (node.row === row && node.column === column) {
                return true;
            }
            node = node.next;
        }
        return false;
    }

    /**
     * Returns true if the head of the snake is beyond the board limits OR
     * if the head of the snake is hitting a different part of the snake 
     * @returns {boolean}
     */
    isGameOver() {
        if (this.head_.row === this.boardDimension_ || this.head_.row === -1 || 
            this.head_.column === this.boardDimension_ || this.head_.column === -1) {
            return true;
        }
        let node = this.head_.next;
        while (node !== null) {
            if (this.head_.row === node.row && this.head_.column === node.column) {
                return true;
            }
            node = node.next;
        }
        return false;
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
        const result = [];
        switch (this.head_.direction) {
            case Snake.DIRECTION.UP:
                result.push(new RenderingInfo(this.head_.row, this.head_.column, RenderingInfo.Type.CORNER_TOP));
                break;
            case Snake.DIRECTION.RIGHT:
                result.push(new RenderingInfo(this.head_.row, this.head_.column, RenderingInfo.Type.CORNER_RIGHT));
                break;
            case Snake.DIRECTION.DOWN:
                result.push(new RenderingInfo(this.head_.row, this.head_.column, RenderingInfo.Type.CORNER_DOWN));
                break;
            case Snake.DIRECTION.LEFT:
                result.push(new RenderingInfo(this.head_.row, this.head_.column, RenderingInfo.Type.CORNER_LEFT));
                break; 
        }
        let node = this.head_.next;
        while (node !== null) {
            if (node.next !== null) {
                result.push(new RenderingInfo(node.row, node.column, RenderingInfo.Type.CORNER_NONE));
                node = node.next;
            } else {
                let directionOfNextTick = node.direction;
                if (node.pivot !== null) {
                    directionOfNextTick = node.pivot;
                }
                switch (directionOfNextTick) {
                    case Snake.DIRECTION.UP:
                        result.push(new RenderingInfo(node.row, node.column, RenderingInfo.Type.CORNER_DOWN));
                        break;
                    case Snake.DIRECTION.RIGHT:
                        result.push(new RenderingInfo(node.row, node.column, RenderingInfo.Type.CORNER_LEFT));
                        break;
                    case Snake.DIRECTION.DOWN:
                        result.push(new RenderingInfo(node.row, node.column, RenderingInfo.Type.CORNER_TOP));
                        break;
                    case Snake.DIRECTION.LEFT:
                        result.push(new RenderingInfo(node.row, node.column, RenderingInfo.Type.CORNER_RIGHT));
                        break; 
                }
                return result;
            }
        }
        return result;
    }

    /**
     * Appends a new SnakePart to the current tail. Then sets the tail
     * variable to the new SnakePart just created
     */
    addOneLength() {
        let newTailRow = this.tail_.row;
        let newTailColumn = this.tail_.column;
        switch (this.tail_.direction) {
            case Snake.DIRECTION.UP:
                newTailRow += 1;
                break;
            case Snake.DIRECTION.RIGHT:
                newTailColumn -= 1;
                break;
            case Snake.DIRECTION.DOWN:
                newTailRow -= 1; 
                break;
            case Snake.DIRECTION.LEFT:
                newTailColumn += 1;
                break; 
        }
        this.tail_.next = new SnakePart(newTailRow, newTailColumn, this.tail_.direction);
        this.tail_ = this.tail_.next;
    }

    /**
     * Returns [row, column] of the head of the snake
     * @returns {Array<Number>}
     */
    getHeadPosition() {
        return [this.head_.row, this.head_.column];
    }

    /**
     * Moves the position of the snake forward by one.
     * This function will respect all the points of pivots that was 
     * created by previous ChangeDirection calls
     */
    moveForwardOne() {
        let node = this.head_;
        while (node !== null) {
            node.move();
            node = node.next;
        }
    }

    /**
     * This allows changeDirection to actually change the direction of the snake
     */
    allowDirectionChange() {
        this.justChangedDirection = false;
    }

    /**
     * Changes the direction of the snake. It should prevent any further calls to this
     * function to do anything before "allowDirectionChange" gets called again.
     * This is so that if the user decides to spam the arrow key buttons really fast,
     * the game would only listen to the first button press every X amount of milliseconds
     * @param {Snake.Direction}
     */
    changeDirection(direction) {
        if (this.justChangedDirection) {
            return;
        }
        if (this.head_.direction === Snake.DIRECTION.LEFT && direction === Snake.DIRECTION.RIGHT) {
            return;
        }
        if (this.head_.direction === Snake.DIRECTION.RIGHT && direction === Snake.DIRECTION.LEFT) {
            return;
        }
        if (this.head_.direction === Snake.DIRECTION.UP && direction === Snake.DIRECTION.DOWN) {
            return;
        }
        if (this.head_.direction === Snake.DIRECTION.DOWN && direction === Snake.DIRECTION.UP) {
            return;
        }
        this.head_.pivot = direction;
        this.justChangedDirection = true;
    }
};

module.exports = {RenderingInfo, Snake};