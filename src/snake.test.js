/**
 * @jest-environment jsdom
 */

const { Snake, RenderingInfo } = require("./snake");

describe('Test Snake API', () => {
    expect.extend({
        toHaveCorrectRendering(snake, expectedRendering) {
            const renderingInfo = snake.getRenderingInfo();
            const missing = [];
            const erroneous = [];
            let pass = expectedRendering.every(value => {
                const found = renderingInfo.find(info => {
                    return info.row === value.row
                    && info.column === value.column
                    && info.type === value.type
                });
                if (!found) {
                    missing.push(value);
                }
                return found;
            }) && renderingInfo.every(info => {
                const isExpected = expectedRendering.find(value => {
                    return info.row === value.row
                    && info.column === value.column
                    && info.type === value.type
                });
                if (!isExpected) {
                    erroneous.push(info);
                }
                return isExpected;
            });
            let message = `The following expected rendering elements were not found: ${JSON.stringify(missing)}.`;
            message += ` The following in the rendering elements should not be present: ${JSON.stringify(erroneous)}`;
            return {
                pass: pass,
                message: () => message,
            };
        }
    })
    const dimension = 10;
    const startRow = Math.floor(dimension / 2);
    let snake;

    beforeEach(() => {
        snake = new Snake(dimension);
    });

    test('Constructor should create a length 2 snake at the right position', () => {
        expect(snake.head_).not.toBeUndefined();
        expect(snake.head_).not.toBeNull();
        expect(snake.tail_).not.toBeUndefined();
        expect(snake.tail_).not.toBeNull();
        expect(snake.head_.next).toBe(snake.tail_);

        expect(snake.head_.row).toBe(startRow);
        expect(snake.head_.column).toBe(2);
        expect(snake.head_.direction).toBe(Snake.DIRECTION.RIGHT);
        expect(snake.tail_.row).toBe(startRow);
        expect(snake.tail_.column).toBe(1);
        expect(snake.tail_.direction).toBe(Snake.DIRECTION.RIGHT);
    });

    test('Test getRenderingInfo for a length 2 snake', () => {
        expect(snake).toHaveCorrectRendering([{
            row: startRow, column: 2, type: RenderingInfo.Type.CORNER_RIGHT
        }, {
            row: startRow, column: 1, type: RenderingInfo.Type.CORNER_LEFT
        }]);
    });
    
    test('AddOneLength should add a node to the chain of snake parts, ' +
            'and the tail_ property should point to the new tail', () => {
        snake.addOneLength();
        expect(snake).toHaveCorrectRendering([{
            row: startRow, column: 2, type: RenderingInfo.Type.CORNER_RIGHT
        }, {
            row: startRow, column: 1, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 0, type: RenderingInfo.Type.CORNER_LEFT
        }]);
    });

    test('MoveForwardOne when there are no turns', () => {
        snake.addOneLength();
        snake.moveForwardOne();
        snake.addOneLength();
        snake.moveForwardOne();
        expect(snake).toHaveCorrectRendering([{
            row: startRow, column: 4, type: RenderingInfo.Type.CORNER_RIGHT
        }, {
            row: startRow, column: 3, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 2, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 1, type: RenderingInfo.Type.CORNER_LEFT
        }]);
    });

    test('Change direction and moveForward', () => {
        snake.addOneLength();
        snake.moveForwardOne();
        snake.addOneLength();
        snake.moveForwardOne();
        snake.changeDirection(Snake.DIRECTION.UP);
        snake.moveForwardOne();
        expect(snake).toHaveCorrectRendering([{
            row: startRow - 1, column: 4, type: RenderingInfo.Type.CORNER_TOP
        }, {
            row: startRow, column: 4, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 3, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 2, type: RenderingInfo.Type.CORNER_LEFT
        }]);
    });

    test('After changing direction, the snake ignores further change direction ' +
            'instructions until allowDirectionChange is called', () => {
        snake.addOneLength();
        snake.moveForwardOne();
        snake.addOneLength();
        snake.moveForwardOne();
        snake.changeDirection(Snake.DIRECTION.UP);
        snake.changeDirection(Snake.DIRECTION.RIGHT);
        snake.moveForwardOne();
        expect(snake).toHaveCorrectRendering([{
            row: startRow - 1, column: 4, type: RenderingInfo.Type.CORNER_TOP
        }, {
            row: startRow, column: 4, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 3, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 2, type: RenderingInfo.Type.CORNER_LEFT
        }]);
    });

    test('Move length 5 snake with two changes of directions', () => {
        snake.addOneLength();
        snake.moveForwardOne();
        snake.addOneLength();
        snake.moveForwardOne();
        snake.changeDirection(Snake.DIRECTION.UP);
        snake.moveForwardOne();
        snake.addOneLength();
        snake.allowDirectionChange();
        snake.changeDirection(Snake.DIRECTION.RIGHT);
        snake.moveForwardOne();
        expect(snake).toHaveCorrectRendering([{
            row: startRow - 1, column: 5, type: RenderingInfo.Type.CORNER_RIGHT
        }, {
            row: startRow - 1, column: 4, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 4, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 3, type: RenderingInfo.Type.CORNER_NONE
        }, {
            row: startRow, column: 2, type: RenderingInfo.Type.CORNER_LEFT
        }]);
    });

    test('After the snake runs into the wall, isGameOver should be true', () => {
        // Moving the snake 8 times will cause it to hit the right wall
        for (let i = 0; i < 8; ++i) {
            snake.moveForwardOne();
        }
        expect(snake.isGameOver()).toBe(true);
    });

    test('After the snake runs into itself, isGameOver should be true', () => {
        snake.addOneLength();
        snake.moveForwardOne();
        snake.addOneLength();
        snake.moveForwardOne();
        snake.changeDirection(Snake.DIRECTION.UP);
        snake.moveForwardOne();
        snake.allowDirectionChange();
        snake.addOneLength();
        snake.addOneLength();
        snake.changeDirection(Snake.DIRECTION.LEFT);
        snake.moveForwardOne();
        snake.allowDirectionChange();
        snake.changeDirection(Snake.DIRECTION.DOWN);
        snake.moveForwardOne();
        expect(snake.isGameOver()).toBe(true);
    });

    test('Get head position should return an array with the first element being the row, the second element being the column', () => {
        expect(snake.getHeadPosition()).toEqual([startRow, 2]);
    });

    test('Colides with snake should return true for where the snake is, otherwise returns false', () => {
        for (let i = 0; i < dimension; ++i) {
            for (let j = 0; j < dimension; ++j) {
                if (i === startRow && (j === 1 || j === 2)) {
                    expect(snake.collidesWithSnake(i,j )).toBe(true);
                } else {
                    expect(snake.collidesWithSnake(i,j )).toBe(false);
                }
            }
        }
    });
});