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

    getFoodPosition_() {
        let row, col;
        do {
            row = Math.floor(this.dimension_ * Math.random());
            col = Math.floor(this.dimension_ * Math.random());
        } while (this.snake_.collidesWithSnake(row, col));

        this.foodRow_ = row;
        this.foodCol_ = col;
        
    }

    handleTimePass_() {
        this.snake_.moveForwardOne();
        if (!this.snake_.isGameOver()) {
            const headPosition = this.snake_.getHeadPosition();
            if (headPosition[0] === this.foodRow_ && headPosition[1] === this.foodCol_) {
                this.snake_.addOneLength();
                this.drawFood();
            }
            this.drawSnake_();
            this.snake_.allowDirectionChange();
            setTimeout(() => {
                this.handleTimePass_();
            }, this.speed_);
        }
    }

    drawFood_() {
        this.getFoodPosition_();
        const currentFood = this.root_.getElementsByClassName('food');
        if (currentFood.length !== 0) {
            currentFood.item(0).remove();
        }
        const tile = this.getTile_(this.foodRow_, this.foodCol_);
        const food = document.createElement('div');
        food.className = 'food';
        tile.append(food);
    }

    handleInput(eventKey) {
        switch (eventKey) {
            case 'ArrowDown':
                this.snake_.changeDirection(Snake.DIRECTION.DOWN);
                break;
            case 'ArrowLeft':
                this.snake_.changeDirection(Snake.DIRECTION.LEFT);
                break;
            case 'ArrowRight':
                this.snake_.changeDirection(Snake.DIRECTION.RIGHT);
                break;
            case 'ArrowUp':
                this.snake_.changeDirection(Snake.DIRECTION.UP);
                break
        }
    }

    startGame() {
        document.addEventListener('keydown', (e) => {
            this.handleInput(e.key);
        });
        setTimeout(() => {
            this.handleTimePass_();
        }, this.speed_);
    }

    getTileColor_(i,j) {
        if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
            return Game.TILE_COLOR.light; 
        } else {
            return Game.TILE_COLOR.dark; 
        }
    }

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
        this.drawFood_();
        return this.root_;
    }

    getTile_(row, col) {
        return this.root_.children.namedItem(`row-${row}`).children.namedItem(`tile-${row}-${col}`);
    }

    drawSnake_() {
        const currentSnakeNodes = this.root_.getElementsByClassName('snake');
        while(currentSnakeNodes.length !== 0) {
            currentSnakeNodes.item(0).remove();
        }
        this.snake_.getRenderingInfo().forEach(info => {
            const node = document.createElement('div');
            let classList = ['snake'];
            switch (info.type) { 
                case RenderingInfo.Type.CORNER_DOWN:
                    classList.push('round-corner-down');
                    break;
                case RenderingInfo.Type.CORNER_TOP:
                    classList.push('round-corner-top');
                    break;
                case RenderingInfo.Type.CORNER_RIGHT: 
                classList.push('round-corner-right');
                    break;
                case RenderingInfo.Type.CORNER_LEFT: 
                classList.push('round-corner-left');
                    break;
            }
            node.className = classList.join(' ');
            this.getTile_(info.row, info.column).append(node);
        });
    }
};

module.exports = Game;