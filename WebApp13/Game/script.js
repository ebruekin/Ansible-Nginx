const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');

const boardWidth = 30;
const boardHeight = 30;
const cellSize = 20;

let ebru = [{x: 10, y: 10}];
let ege = {x: 5, y: 5};
let dx = 0;
let dy = 0;
let score = 0;
let lastRenderTime = 0;
let gameOver = false;

document.addEventListener('keydown', changeDirection);

function main(currentTime) {
    if (gameOver) {
        if (confirm('Game over. Press OK to restart.')) {
            window.location = '/';
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 5) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

main();

function update() {
    if (isGameOver()) {
        gameOver = true;
        return;
    }

    const head = {x: ebru[0].x + dx, y: ebru[0].y + dy};
    ebru.unshift(head);
    if (head.x === ege.x && head.y === ege.y) {
        score += 1;
        scoreElement.textContent = 'Score: ' + score;
        ege = getRandomEgePosition();
    } else {
        ebru.pop();
    }
}

function draw() {
    gameBoard.innerHTML = '';
    drawEbru();
    drawEge();
}

function drawEbru() {
    ebru.forEach(segment => {
        const ebruElement = document.createElement('div');
        ebruElement.style.gridRowStart = segment.y;
        ebruElement.style.gridColumnStart = segment.x;
        ebruElement.classList.add('ebru');
        gameBoard.appendChild(ebruElement);
    });
}

function drawEge() {
    const egeElement = document.createElement('div');
    egeElement.style.gridRowStart = ege.y;
    egeElement.style.gridColumnStart = ege.x;
    egeElement.classList.add('ege');
    gameBoard.appendChild(egeElement);
}

function changeDirection(event) {
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;

    const keyPressed = event.keyCode;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === leftKey && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === upKey && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === rightKey && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === downKey && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function getRandomEgePosition() {
    return {
        x: Math.floor(Math.random() * boardWidth) + 1,
        y: Math.floor(Math.random() * boardHeight) + 1
    };
}

function isGameOver() {
    if (
        ebru[0].x < 1 || ebru[0].x > boardWidth ||
        ebru[0].y < 1 || ebru[0].y > boardHeight
    ) {
        return true;
    }
    for (let i = 1; i < ebru.length; i++) {
        if (ebru[i].x === ebru[0].x && ebru[i].y === ebru[0].y) {
            return true;
        }
    }
    return false;
}
