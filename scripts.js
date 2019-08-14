const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', startGame);

function startGame() {
  const gameElements = document.querySelector('.game-view');
  const welcomePage = document.querySelector('.welcome-page');

  gameElements.classList.remove('hide');
  welcomePage.classList.add('hide');

  var audio = new Audio('assets/sounds/puzzle-reveal.mp3');
  audio.play();
}

