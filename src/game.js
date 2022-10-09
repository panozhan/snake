class Game {
    static DIRECTION =  {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    }

    static BOARD_ELEMENTS = {
        EMPTY: 0,
        SNAKE_MID: 1,
        SNAKE_EDGE: 2,
        FOOD: 3
    }

    constructor(dimension, speed) {
        if (dimension < 10) {
            throw new RangeError();
        }
        this.dimension_ = dimension;
        this.speed_ = speed;
        this.initializeBoard();
    }

    initializeBoard() {
        const result = Array(this.dimension_);
        for(let i = 0; i < this.dimension_; ++i) {
            result[i] = Array(this.dimension_);
            result[i].fill(Game.BOARD_ELEMENTS.EMPTY);
        }
        result[Math.floor(this.dimension_ / 2)][1] = Game.BOARD_ELEMENTS.SNAKE_EDGE;
        result[Math.floor(this.dimension_ / 2)][2] = Game.BOARD_ELEMENTS.SNAKE_EDGE;
        
        this.board_ = result;
        this.setFoodPosition();
        console.log(this.board_);
    }

    setFoodPosition() {
        let row, col;
        do {
            row = Math.floor(this.dimension_ * Math.random());
            col = Math.floor(this.dimension_ * Math.random());
        } while (this.board_[row][col] === Game.BOARD_ELEMENTS.SNAKE)

        this.board_[row][col] = Game.BOARD_ELEMENTS.FOOD;
    }

    handleTimePass() {
    
    }

    handleInput(direction) {

    }

    getRootNodeForDimension() {
        if (this.root_ !== undefined) {
            return this.root_
        }
        this.root_ = document.createElement('div');
        this.root_.id = 'root';

        this.board_.forEach((row, i) => {
            const rowNode = document.createElement('div');
            rowNode.id = `row-${i}`;
            rowNode.className = 'row';
            row.forEach((e, j) => {
                const tile = document.createElement('div');
                tile.id = `tile-${i}-${j}`;
                let className = ['board-element'];
                if (e === Game.BOARD_ELEMENTS.SNAKE_EDGE) {
                    className.push('snake-edge');
                } else if (e === Game.BOARD_ELEMENTS.SNAKE_MID) {
                    className.push('snake-mid');
                } else if (e === Game.BOARD_ELEMENTS.FOOD) {
                    className.push('food'
)                } else if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
                    className.push('light-tile');
                } else {
                    className.push('dark-tile');
                }
                tile.className = className.join(' ');
                rowNode.appendChild(tile);
            });
            this.root_.appendChild(rowNode);
        })
        return this.root_;
    }  
};

module.exports = Game;