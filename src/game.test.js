/**
 * @jest-environment jsdom
 */

const Game = require('./game');
const {RenderingInfo, Snake} = require('./snake');

describe('Get Root Node', () => {
    const testBoard = (game, dimension, snakeTestFunction) => {
        const rootNode = game.getRootNodeForDimension();
        expect(rootNode.children.length).toBe(dimension);
        for (let i = 0; i < dimension; ++i) {
            const row = rootNode.children.item(i);
            expect(row.children.length).toBe(dimension);
            for (let j = 0; j < dimension; ++j) {
                const tile = row.children.item(j);
                expect(tile.classList.contains('board-element')).toBe(true);
                expect(tile.id).toBe(`tile-${i}-${j}`);
                if (i % 2 === 0 && j % 2 === 0 || i % 2 === 1 && j % 2 === 1) {
                    expect(tile.classList.contains('dark-tile')).toBe(true);
                } else {
                    expect(tile.classList.contains('light-tile')).toBe(true);
                }

                snakeTestFunction(i, j, tile, dimension);
            }
        }
    };
    test('Should return a 10x10 board with alternating dark and light color', () => {
        const dimension = 10;
        const game = new Game(dimension);
        testBoard(game, dimension, (i, j, tile, dimension) => {
            if (i === Math.floor(dimension / 2)) {
                if (j === 1 || j === 2) {
                    expect(tile.children.length).toBe(1);
                    const snake = tile.children.item(0);
                    expect(snake.classList.contains('snake')).toBe(true);
                    
                    if (j === 1) {
                        expect(snake.classList.contains('round-corner-left')).toBe(true);
                    } else if (j === 2) {
                        expect(snake.classList.contains('round-corner-right')).toBe(true);
                    }
                }
            }
        });
    });

    test('Should return a 10x10 board with alternating dark and light color', () => {
        const dimension = 10;
        const game = new Game(dimension);
        testBoard(game, dimension, (i, j, tile, dimension) => {
            if (i === Math.floor(dimension / 2)) {
                if (j === 1 || j === 2) {
                    expect(tile.children.length).toBe(1);
                    const snake = tile.children.item(0);
                    expect(snake.classList.contains('snake')).toBe(true);
                    
                    if (j === 1) {
                        expect(snake.classList.contains('round-corner-left')).toBe(true);
                    } else if (j === 2) {
                        expect(snake.classList.contains('round-corner-right')).toBe(true);
                    }
                }
            }
        });
    });
})