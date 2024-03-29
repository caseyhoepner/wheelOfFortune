const players = [];

const playerSubmitBtns = document.querySelectorAll(".player-submit");
playerSubmitBtns.forEach(btn => {
    btn.addEventListener("click", submitPlayer);
});

const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.addEventListener('click', startNewGame);

document.addEventListener("DOMContentLoaded", function() {
  const blockNumber = 1;
  for (var i = blockNumber; i < 49; i++) {
    loadInitialPuzzle(i);
  }
});

function Player(name) {
  this.name = name;
  this.winnings = 0;
}

function submitPlayer(e) {
  e.preventDefault();
  const playerNumber = e.toElement.name;
  const nextPlayerNumber = (parseInt(e.toElement.name) + 1).toString();
  const playerName = document.querySelector(`#player${playerNumber}-name`).value;
  const form = document.querySelector(`#player${playerNumber}-form`);
  form.classList.add('hide');
  const newPlayer = new Player(playerName)
  players.push(new Player(playerName));

  if(nextPlayerNumber < 4) {
    const nextForm = document.querySelector(`#player${nextPlayerNumber}-form`);
    nextForm.classList.remove('hide');
  }
  appendPlayer(newPlayer);
  if (nextPlayerNumber > 3) {
    loadNewPuzzle();
  }
}

function appendPlayer(player) {
  const playerContainer = document.querySelector('#players');
  const playerDiv = document.createElement('div');

  playerDiv.innerHTML = `
    <div class='player-card'>
      <h3 class=''>${player.name}</h3>
      <h4>$${player.winnings}</h4>
    </div>`
  playerContainer.appendChild(playerDiv);
}

function startNewGame() {
  location.reload();
}

function loadInitialPuzzle(blockNumber) {
  const puzzleContainer = document.querySelector('#puzzle-cont');
  const blockDiv = document.createElement('div');
  
  blockDiv.innerHTML = `
    <div id='block${blockNumber}' class='block'>
      <p id='block${blockNumber}-text'class='block-text'></p>
    </div>`
  puzzleContainer.appendChild(blockDiv);
}

function loadNewPuzzle() {
  const puzzleBankLength = puzzleData.puzzles.puzzle_bank.length - 1;
  const randomPuzzleNumber = Math.floor(Math.random() * Math.floor(puzzleBankLength));
  const puzzle = puzzleData.puzzles.puzzle_bank[randomPuzzleNumber];
  const correctAnswerArray = puzzle.correct_answer.split('');
  const activeBlocks = correctAnswerArray.map((letter, index) => letter !== ' ');

  activeBlocks.forEach((block, index) => {
    if(block === true) {
      document.querySelector(`#block${index + 1}`).classList.add('active-block');
    }
  });
  document.getElementById('category').innerText = puzzle.category;

  playPuzzleReveal();
}

function playPuzzleReveal() {
  const audio = new Audio('./assets/sounds/puzzle-reveal.mp3');
  audio.play();
}