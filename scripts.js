const players = [];

const playerSubmitBtns = document.querySelectorAll(".player-submit");
playerSubmitBtns.forEach(btn => {
    btn.addEventListener("click", submitPlayer);
});

const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.addEventListener('click', startNewGame);

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
}

function appendPlayer(player) {
  const playerContainer = document.querySelector('#players');
  console.log(player.name)
  const playerDiv = document.createElement('div');
  playerDiv.innerHTML = `
    <div class='player-card'>
      <h3 class=''>${player.name}</h3>
      <h4>$${player.winnings}</h4>
    </div>
    `
  playerContainer.appendChild(playerDiv);
}

function startNewGame() {
  location.reload();
}