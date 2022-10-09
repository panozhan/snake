const Game = require('./game');

function initApplication() {
    const game = new Game(15,1);
    const rootNode = game.getRootNodeForDimension();
    document.getElementById('game').append(rootNode);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApplication();
    }); 
} else if (document.readyState === 'complete') {
    initApplication();
}