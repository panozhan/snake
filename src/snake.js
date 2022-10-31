class SnakePart {
    constructor (row, column, direction, next = null) {
        this.row = row;
        this.column = column;
        this.direction = direction;
        this.next = next;
        this.pivot = -1;
        this.pivotNext = -1;
    }

    move() {
        if (this.pivot !== -1) {
            this.direction = this.pivot;
            if (this.next !== null) {
                this.next.pivotNext = this.pivot;
            }
            this.pivot = -1;
        } else if (this.pivotNext !== -1) {
            this.pivot = this.pivotNext;
            this.pivotNext = -1;
        }
        if (this.direction === Snake.DIRECTION.UP) {
            this.row = this.row - 1;
        } else {
            this.column = this.column + 1
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
     * Each rendering info contains the row and column of that snake part
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

    addOneLength() {
        const rowOfNewTail = Math.floor(this.boardDimension_ / 2);
        const colOfNewTail = this.tail_.column - 1;
        this.tail_.next = new SnakePart(rowOfNewTail, colOfNewTail, Snake.DIRECTION.RIGHT);
        this.tail_ = this.tail_.next;
    }

    /** 
     * As a first step, we will only change direction up
     */
    changeDirection() {
        this.head_.pivot = Snake.DIRECTION.UP;
    }
};

module.exports = {RenderingInfo, Snake};