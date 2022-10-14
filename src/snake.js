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

    getHeadPosition() {
        return [this.head_.row, this.head_.column];
    }

    moveForwardOne() {
        let node = this.head_;
        while (node !== null) {
            node.move();
            node = node.next;
        }
    }

    allowDirectionChange() {
        this.justChangedDirection = false;
    }

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