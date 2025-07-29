function getComputerChoice() {
  let computerChoice = getRandomInt(3);
  if (computerChoice === 0) {
    return "Rock";
  } else if (computerChoice === 1) {
    return "Scissors";
  } else {
    return "Paper";
  }
}

// Returns a random number between 0 and max (inclusive of 0, exclusive of max)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getHumanChoice() {
  let humanChoice = prompt("What will you pick — rock, scissors, or paper?");
  humanChoice =
    humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1).toLowerCase();
  return humanChoice;
}

let computerScore = 0;
let humanScore = 0;

function playRound(humanChoice, computerChoice) {
  if (humanChoice == computerChoice) {
    console.log("Draw!");
  } else {
    if (humanChoice === "Rock" && computerChoice === "Scissors") {
      console.log("You win! Rock beats Scissors!");
      humanScore++;
    } else if (humanChoice === "Rock" && computerChoice === "Paper") {
      console.log("You lose! Paper beats Rock!");
      computerScore++;
    } else if (humanChoice === "Paper" && computerChoice === "Rock") {
      console.log("You win! Paper beats Rock!");
      humanScore++;
    } else if (humanChoice === "Paper" && computerChoice === "Scissors") {
      console.log("You lose! Scissors beat Paper!");
      computerScore++;
    } else if (humanChoice === "Scissors" && computerChoice === "Paper") {
      console.log("You win! Scissors beat Paper!");
      humanScore++;
    } else if (humanChoice === "Scissors" && computerChoice === "Rock") {
      console.log("You lose! Rock beats Scissors!");
      computerScore++;
    }
  }
}

function playGame() {
  for (i = 0; i < 5; i++) {
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  }
  console.log(`Final score \nHuman: ${humanScore} Computer: ${computerScore}`);
  humanScore = 0;
  computerScore = 0;
}

playGame();
