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
    speed: 0
};


start.addEventListener('click', startGame);

function startGame() {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame)
};

function playGame() {
    console.log('Yo');
    if (setting.start) {
        requestAnimationFrame(playGame)
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
