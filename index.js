const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timer = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

const startGame = () => {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

const decreaseTime = () => {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) current = `0${current}`;
        setTime(current);
    }
}

const setTime = (value) => {
    timer.innerHTML = `00:${value}`;
}

const finishGame = () => {
    timer.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}

const createRandomCircle = () => {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomColor();
    board.append(circle);
}

const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const getRandomColor = () => {
    const symbolsOfColours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let colour = [];
    for (let i = 0; i < 6; i++) {
        colour.push(symbolsOfColours[Math.floor(Math.random() * symbolsOfColours.length)])
    }
    return '#' + colour.join('');
}