let score = 0;

function startGame() {
    score = 0;
    document.getElementById('score').innerText = 'Skor: ' + score;

    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        createBall(gameArea);
    }
}

function createBall(gameArea) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    const x = Math.floor(Math.random() * 180);
    const y = Math.floor(Math.random() * 180);
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
    ball.addEventListener('click', function() {
        score++;
        document.getElementById('score').innerText = 'Skor: ' + score;
        gameArea.removeChild(ball);
        createBall(gameArea);
    });
    gameArea.appendChild(ball);
}

