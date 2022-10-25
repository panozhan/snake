const {RenderingInfo, Snake} = require("./snake");

class Game {
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

        this.countMoved_ = 0;
    }

    handleTimePass() {
        if (this.countMoved_ < 7) {
            this.snake_.moveForwardOne();
            this.drawSnake_();
            this.countMoved_++;
            setTimeout(() => {
                this.handleTimePass();
            }, this.speed_);
        }
    }

    startGame() {
        this.handleTimePass();
    }

    getTileColor_(i,j) {
        if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
            return Game.TILE_COLOR.light; 
        } else {
            return Game.TILE_COLOR.dark; 
        }
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
        if (this.root_ !== undefined) {
            return this.root_
        }
        this.root_ = document.createElement('div');
        this.root_.id = 'root';

        for (let i = 0; i < this.dimension_; ++i) {
            const rowNode = document.createElement('div');
            rowNode.id = `row-${i}`;
            rowNode.className = 'row';
            for (let j = 0; j < this.dimension_; ++j) {
                const tile = document.createElement('div');
                tile.id = `tile-${i}-${j}`;
                let className = ['board-element'];
                className.push(this.getTileColor_(i,j) === Game.TILE_COLOR.dark ? 'dark-tile' : 'light-tile');
                tile.className = className.join(' ');
                rowNode.appendChild(tile);           
            }
            this.root_.appendChild(rowNode);
        }
        this.drawSnake_();
        return this.root_;
    }

    getTile_(row, col) {
        return this.root_.children.namedItem(`row-${row}`).children.namedItem(`tile-${row}-${col}`);
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