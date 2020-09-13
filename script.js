const score = document.querySelector('.score');
const game = document.querySelector('.game');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');

car.classList.add('car');





const key = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 0,
    traffic: 3
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}




start.addEventListener('click', startGame);

function startGame() {
    start.classList.add('hide');
    gameArea.innerHTML = '';

    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    };

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = (Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(./image/enemy.png) center / cover';
        gameArea.appendChild(enemy);
    }

    document.body.style.backgroundColor = 'lightskyblue';
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    setting.score = 0;
    setting.speed = 8;


    requestAnimationFrame(playGame)
};

function newLevel2() {

    if (setting.score > 3000) {
        setting.speed = 12;
        document.body.style.backgroundColor = 'dodgerblue';

    }
};

function newlevel3() {

    if (setting.score > 8000) {
        setting.speed = 15;
        document.body.style.backgroundColor = 'indigo';

    }
}

function newlevel4() {

    if (setting.score > 12000) {
        setting.speed = 18;
        document.body.style.backgroundColor = 'black';

    }
}


function playGame() {
    if (setting.start) {

        setting.score += setting.speed;
        score.innerHTML = `SCORE <br> ${setting.score}`;



        moveRoad();
        moveEnemy();
        if (key.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }

        if (key.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }

        if (key.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        if (key.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame)
        newLevel2();
        newlevel3();
        newlevel4();



    }
};


document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);


function startRun(event) {
    event.preventDefault();
    key[event.key] = true;

};


function stopRun(event) {
    event.preventDefault();
    key[event.key] = false;

};

function moveRoad() {

    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y > document.documentElement.clientHeight) {
            line.y = -100;
        }
    })

};

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {

        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
            setting.start = false;
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y > document.documentElement.clientHeight) {
            item.y = -120 * setting.traffic;
            item.style.left = (Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            item.style.background = 'transparent url(./image/player.png) center / cover';

        }
    })
}