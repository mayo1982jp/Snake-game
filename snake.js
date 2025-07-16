// ゲーム設定
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    {x: 10, y: 10}
];
let enemy = [
    {x: 5, y: 5}
];
let food = {};
let dx = 0;
let dy = 0;
let enemyDx = 1;
let enemyDy = 0;
let score = 0;
let gameRunning = true;

// 食べ物をランダムな位置に生成
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // スネークの体と重ならないようにチェック
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
    
    // 敵の体と重ならないようにチェック
    for (let segment of enemy) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// ゲーム画面を描画
function drawGame() {
    // 背景をクリア
    ctx.fillStyle = '#1a252f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // スネークを描画
    ctx.fillStyle = '#2ecc71';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    // 頭部を少し違う色で描画
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize - 2, gridSize - 2);
    
    // 敵スネークを描画
    ctx.fillStyle = '#e67e22';
    for (let segment of enemy) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    // 敵の頭部を少し違う色で描画
    ctx.fillStyle = '#d35400';
    ctx.fillRect(enemy[0].x * gridSize, enemy[0].y * gridSize, gridSize - 2, gridSize - 2);
    
    // 食べ物を描画
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// 敵CPUを移動
function moveEnemy() {
    if (!gameRunning) return;
    
    const enemyHead = {x: enemy[0].x + enemyDx, y: enemy[0].y + enemyDy};
    
    // 壁を通り抜ける処理
    if (enemyHead.x < 0) {
        enemyHead.x = tileCount - 1;
    } else if (enemyHead.x >= tileCount) {
        enemyHead.x = 0;
    }
    if (enemyHead.y < 0) {
        enemyHead.y = tileCount - 1;
    } else if (enemyHead.y >= tileCount) {
        enemyHead.y = 0;
    }
    
    // 敵の自分の体との衝突チェック（方向転換）
    for (let segment of enemy) {
        if (enemyHead.x === segment.x && enemyHead.y === segment.y) {
            // ランダムに方向転換
            const directions = [
                {dx: 0, dy: -1}, // 上
                {dx: 0, dy: 1},  // 下
                {dx: -1, dy: 0}, // 左
                {dx: 1, dy: 0}   // 右
            ];
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            enemyDx = randomDir.dx;
            enemyDy = randomDir.dy;
            return;
        }
    }
    
    // プレイヤーとの衝突チェック（敵も死ぬ）
    for (let segment of snake) {
        if (enemyHead.x === segment.x && enemyHead.y === segment.y) {
            // 敵も方向転換
            const directions = [
                {dx: 0, dy: -1}, // 上
                {dx: 0, dy: 1},  // 下
                {dx: -1, dy: 0}, // 左
                {dx: 1, dy: 0}   // 右
            ];
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            enemyDx = randomDir.dx;
            enemyDy = randomDir.dy;
            return;
        }
    }
    
    enemy.unshift(enemyHead);
    
    // 敵が食べ物を食べたかチェック
    if (enemyHead.x === food.x && enemyHead.y === food.y) {
        generateFood();
    } else {
        enemy.pop();
    }
    
    // ランダムに方向転換（10%の確率）
    if (Math.random() < 0.1) {
        const directions = [
            {dx: 0, dy: -1}, // 上
            {dx: 0, dy: 1},  // 下
            {dx: -1, dy: 0}, // 左
            {dx: 1, dy: 0}   // 右
        ];
        const randomDir = directions[Math.floor(Math.random() * directions.length)];
        enemyDx = randomDir.dx;
        enemyDy = randomDir.dy;
    }
}

// スネークを移動
function moveSnake() {
    if (!gameRunning) return;
    
    // 移動していない場合は何もしない
    if (dx === 0 && dy === 0) return;
    
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // 壁を通り抜ける処理
    if (head.x < 0) {
        head.x = tileCount - 1;
    } else if (head.x >= tileCount) {
        head.x = 0;
    }
    if (head.y < 0) {
        head.y = tileCount - 1;
    } else if (head.y >= tileCount) {
        head.y = 0;
    }
    
    // 自分の体との衝突チェック（頭以外の部分）
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
    
    // 敵との衝突チェック
    for (let segment of enemy) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // 食べ物を食べたかチェック
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

// ゲームオーバー処理
function gameOver() {
    gameRunning = false;
    gameOverElement.style.display = 'block';
}

// ゲームリスタート
function restartGame() {
    snake = [{x: 10, y: 10}];
    enemy = [{x: 5, y: 5}];
    dx = 0;
    dy = 0;
    enemyDx = 1;
    enemyDy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameRunning = true;
    gameOverElement.style.display = 'none';
    generateFood();
}

// キーボード入力処理
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    const key = e.key;
    
    // 矢印キー
    if (key === 'ArrowUp' && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (key === 'ArrowDown' && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (key === 'ArrowLeft' && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (key === 'ArrowRight' && dx !== -1) {
        dx = 1;
        dy = 0;
    }
    
    // WASD キー
    else if ((key === 'w' || key === 'W') && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if ((key === 's' || key === 'S') && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if ((key === 'a' || key === 'A') && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if ((key === 'd' || key === 'D') && dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

// ゲームループ
function gameLoop() {
    moveSnake();
    moveEnemy();
    drawGame();
}

// ゲーム初期化
generateFood();
drawGame();

// ゲームループを150msごとに実行
setInterval(gameLoop, 300);