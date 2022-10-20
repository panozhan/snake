const {RenderingInfo, Snake} = require("./snake");

class Game {
    static DIRECTION =  {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    }

    static TILE_COLOR = {
        light: 0,
        dark:1
    }

    constructor(dimension, speed) {
        if (dimension < 10) {
            throw new RangeError();
        }
        this.dimension_ = dimension;
        this.speed_ = speed;
        this.snake_ = new Snake(dimension);
    }

    /**
     * Deletes any food element currently on the view.
     * Then, creates a new DIV for the a new food element in a position
     * that is not colliding with the snake
     */
    drawFood_() {

    }

    /**
     * Creates a root element that has {dimension} number of rows, where each row i has id 'row-{i}'.
     * Each row has {dimension} number of tiles, where each tile j in row i has id 'row-{i}-{j}'
     * 
     * It will also add a Food Div to a random tile that the snake isn't in
     * 
     * Finally, it will add a Div for the head and tail of the SNAKE at row "dimension / 2" 
     * and columns 2, 1 respectively   
     * @returns {!Element}
     */
    getRootNodeForDimension() {

    }

    /**
     * Deletes any snake element currently on the view.
     * Then, creates new DIVs for the current position of the snake parts,
     * which might have changed since the last time this function was called.
     */
    drawSnake_() {

    }
};

module.exports = Game;