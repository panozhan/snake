class SnakePart {
    constructor (row, column, direction, next = null) {
        this.row = row;
        this.column = column;
        this.direction = direction;
        this.next = next;
    }

    move() {
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
    constructor(row, column) {
        this.row = row;
        this.column = column;
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
        const result = [new RenderingInfo(this.head_.row, this.head_.column)];
        let node = this.head_.next;
        while (node !== null) {
            result.push(new RenderingInfo(node.row, node.column));
            node = node.next;
        }
        return result;
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
};

module.exports = {RenderingInfo, Snake};