class SnakePart {
    constructor (row, column , direction) {
        this.row = row;
        this.column = column;
    }

    moveUp() {
        this.row -= 1;
    }

    moveDown() {
        this.row += 1;
    }

    moveRight() {
        this.column += 1;
    }

    moveLeft() {
        this.column -= 1;
    }
}

class Joint {
    constructor (index, direction) {
        this.index = index;
        this.direction = direction;
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
        this.parts_ = [
            new SnakePart(Math.floor(boardDimension / 2), 1),
            new SnakePart(Math.floor(boardDimension / 2), 2)
        ];
        this.boardDimension_ = boardDimension;
        this.joints_ = [new Joint(1, Snake.DIRECTION.RIGHT)];
        this.justChangedDirection = false;
    }

    collidesWithSnake(row, column) {
        return this.parts_.some(e => e.row === row && e.column === column);
    }

    getHeadPosition() {
        const head = this.parts_[this.parts_.length - 1];
        return [head.row, head.column];
    }

    isGameOver() {
        const snakeHead = this.parts_[this.parts_.length - 1];
        if (snakeHead.row === this.boardDimension_ || snakeHead.row === -1 || snakeHead.column === this.boardDimension_ || snakeHead.column === -1) {
            return true;
        } 
        for (let i = 0; i < this.parts_.length - 1; ++i) {
            if (snakeHead.row === this.parts_[i].row && snakeHead.column === this.parts_[i].column) {
                return true;
            }
        }
        return false;
    }

    getRenderingInfo() {
        const lastJoint = this.joints_[0]; 
        const firstJoint = this.joints_.length === 1 ? lastJoint : this.joints_[this.joints_.length - 1];
        return this.parts_.map((part, i) => {
            let renderingType = RenderingInfo.Type.CORNER_NONE;
            if (i === this.parts_.length - 1) {
                switch (lastJoint.direction) {
                    case Snake.DIRECTION.UP:
                        renderingType = RenderingInfo.Type.CORNER_TOP;
                        break;
                    case Snake.DIRECTION.RIGHT:
                        renderingType = RenderingInfo.Type.CORNER_RIGHT;
                        break;
                    case Snake.DIRECTION.DOWN:
                        renderingType = RenderingInfo.Type.CORNER_DOWN;
                        break;
                    case Snake.DIRECTION.LEFT:
                        renderingType = RenderingInfo.Type.CORNER_LEFT;
                        break; 
                }
            } else if (i === 0) {
                switch (firstJoint.direction) {
                    case Snake.DIRECTION.UP:
                        renderingType = RenderingInfo.Type.CORNER_DOWN;
                        break;
                    case Snake.DIRECTION.RIGHT:
                        renderingType = RenderingInfo.Type.CORNER_LEFT;
                        break;
                    case Snake.DIRECTION.DOWN:
                        renderingType = RenderingInfo.Type.CORNER_TOP;
                        break;
                    case Snake.DIRECTION.LEFT:
                        renderingType = RenderingInfo.Type.CORNER_RIGHT;
                        break; 
                }
            }
            return new RenderingInfo(part.row, part.column, renderingType);
        });
    }

    addOneLength() {
        const lastJoint = this.joints_[0];
        const lastPart = this.parts_[0];
        let newPartRow = lastPart.row;
        let newPartColumn = lastPart.column;
        switch (lastJoint.direction) {
            case Snake.DIRECTION.UP:
                newPartRow += 1;
                break;
            case Snake.DIRECTION.RIGHT:
                newPartColumn -= 1;
                break;
            case Snake.DIRECTION.DOWN:
                newPartRow -= 1; 
                break;
            case Snake.DIRECTION.LEFT:
                newPartColumn += 1;
                break; 
        }
        this.parts_.unshift(new SnakePart(newPartRow, newPartColumn, lastJoint.direction));
        this.joints_.forEach(e => {
            e.index += 1;
        });
        console.log('adding one length', this.parts_, this.joints_);
    }

    moveForwardOne() {
        let jointIndex = this.joints_.length - 1;
        let nextJointIndex = this.joints_.length - 2;
        for (let i = this.parts_.length - 1; i >= 0; --i) {
            let joint = this.joints_[jointIndex];
            
            if (nextJointIndex >= 0 && i === this.joints_[nextJointIndex].index) {
                joint = this.joints_[nextJointIndex];
                jointIndex = nextJointIndex;
                nextJointIndex--;
            } 
            console.log('joints', this.joints_, joint);

            for (let i = 0; i < this.joints_.length - 1; ++i) {
                this.joints_[i].index += 1;
            }
            if (this.joints_[0].index === this.parts_.length) {
                this.joints_.shift();
            }

            const part = this.parts_[i];
            switch (joint.direction) {
                case Snake.DIRECTION.UP:
                    part.moveUp();
                    break;
                case Snake.DIRECTION.RIGHT:
                    part.moveRight();
                    break;
                case Snake.DIRECTION.DOWN:
                    part.moveDown();    
                    break;
                case Snake.DIRECTION.LEFT:
                    part.moveLeft();
                    break; 
            }
        }
    }

    allowDirectionChange() {
        this.justChangedDirection = false;
    }

    changeDirection(direction) {
        if (this.justChangedDirection) {
            return;
        }
        const newHeadJoint = this.joints_.pop();
        if (newHeadJoint.direction !== direction) {
            this.joints_.push(new Joint(this.parts_.length - 2, newHeadJoint.direction));
            this.justChangedDirection = true;
        }
        newHeadJoint.direction = direction;
        this.joints_.push(newHeadJoint);

    }
};

module.exports = {RenderingInfo, Snake};