const values = ['rock', 'paper', 'scissors'];
const wins = {
  rock: ['scissors'],
  paper: ['rock'],
  scissors: ['paper']
};
computerPlay = () => {
  let randomVal = Math.ceil(Math.random() * 3) + 1;
  return values[randomVal];
};

playRound = (playerSelection, computerSelection) => {
    let playerWin = wins[playerSelection] == computerSelection;
    console.log(`You ${playerWin?'Win':'Lose'} ! `);
};

computerTurn = computerPlay();
console.log(`Computer turn is ${computerTurn}`);
playRound('paper','rock');
