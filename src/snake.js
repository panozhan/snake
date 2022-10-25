class SnakePart {
    constructor (row, column, direction, next = null) {
        this.row = row;
        this.column = column;
        this.direction = direction;
        this.next = next;
    }

}

class RenderingInfo {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

class Snake {
    constructor(boardDimension) {

    }

    /**
     * Maps the parts of the snake into an array of RenderingInfo.
     * Each rendering info contains the row and column of that snake part
     * @returns {Array<!RenderingInfo>}
     */
    getRenderingInfo() {

    }

    /**
     * Moves the position of the snake forward by one.
     * This function will respect all the points of pivots that was 
     * created by previous ChangeDirection calls
     */
    moveForwardOne() {

    }
};

module.exports = {RenderingInfo, Snake};