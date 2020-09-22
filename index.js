var startBtn = document.querySelector('#start');
var gameContainer = document.querySelector('#game');
var gameTime = document.querySelector('#time');
var gameResult = document.querySelector('#result');
var timeHeader = document.querySelector('#time-header');
var resultHeader = document.querySelector('#result-header');
var inputTime = document.querySelector('#game-time');

var colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'lightblue',
  'blue',
  'violet',
  'pink',
];
var score = 0;
var isGameStarted = false;

startBtn.addEventListener('click', startGame);
gameContainer.addEventListener('click', handleBoxClick);
inputTime.addEventListener('input', setGameTime);

function hide(el) {
  el.classList.add('hide');
}

function show(el) {
  el.classList.remove('hide');
}

function startGame() {
  score = 0;
  isGameStarted = true;
  setGameTime();
  inputTime.setAttribute('disabled', true);

  hide(startBtn);
  gameContainer.style.backgroundColor = '#ffffff';

  var interval = setInterval(function () {
    var time = parseFloat(gameTime.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      gameTime.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function handleBoxClick(e) {
  if (isGameStarted) {
    if (e.target.dataset.box) {
      renderBox();
      score++;
    }
  } else return;
}

function renderBox() {
  var boxSize = getRandom(30, 100);
  var gameContainerSize = gameContainer.getBoundingClientRect();
  var maxTop = gameContainerSize.height - boxSize;
  var maxLeft = gameContainerSize.width - boxSize;

  gameContainer.innerHTML = '';

  var box = document.createElement('div');
  box.setAttribute('data-box', true);

  box.style.position = 'absolute';
  box.style.height = box.style.width = `${boxSize}px`;
  box.style.backgroundColor = colors[getRandom(0, colors.length)];
  box.style.top = `${getRandom(20, maxTop)}px`;
  box.style.left = `${getRandom(20, maxLeft)}px`;
  box.style.cursor = 'pointer';

  gameContainer.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setGameScore() {
  gameResult.textContent = score.toString();
}

function setGameTime() {
  hide(resultHeader);
  show(timeHeader);
  var timeValue = +inputTime.value;
  gameTime.textContent = timeValue.toFixed(1);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  inputTime.removeAttribute('disabled');
  show(startBtn);
  gameContainer.style.backgroundColor = '#cccccc';
  gameContainer.innerHTML = '';
  hide(timeHeader);
  show(resultHeader);
}
