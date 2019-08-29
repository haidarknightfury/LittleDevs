const values = ['rock', 'paper', 'scissors'];
const wins = {
  rock: ['scissors'],
  paper: ['rock'],
  scissors: ['paper']
};

const times = 5;

computerPlay = () => {
  let randomVal = Math.ceil(Math.random() * 3) - 1;
  return values[randomVal];
};

playRound = (playerSelection, computerSelection) => {
  let playerWin = wins[playerSelection] == computerSelection;
  return playerWin;
};

game = () => {
  let playerPoints = 0;
  let compPoints = 0;
  for (let index = 0; index < times; index++) {
    let compPlay = computerPlay();
    let playPlay = prompt("Enter rock | paper | scissors: ").toLowerCase();

    if (compPlay != playPlay) {
      let playerWin = playRound(playPlay, compPlay);
      playerPoints += playerWin ? 1 : 0;
      compPoints += !playerWin ? 1 : 0;
    }

  }

  let results = (`You ${playerPoints > compPoints ? 'Win' : playerPoints == compPoints ? 'Draw' : 'Lose'} ! `);
  console.log(results);
}

game();