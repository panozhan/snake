const Game = require('./game');

function initApplication() {
    const game = new Game(15, 1000);
    const rootNode = game.getRootNodeForDimension();
    document.getElementById('game').append(rootNode);
    document.getElementById('start-game').onclick = () => {
        game.startGame();
    };
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApplication();
    }); 
} else if (document.readyState === 'complete') {
    initApplication();
}