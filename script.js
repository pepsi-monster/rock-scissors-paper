const userAsciiMoves = {
  Rock: `    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
`,
  Paper: `    _______
---'   ____)____
          ______)
         _______)
        _______)
---.__________)
`,
  Scissors: `    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
`,
  Unknown: `.-----------.
|    ???    |
|   ?? ??   |
|      ?    |
|     ?     |
|     ⁇     |
'───────────'
`,
};

const computerAsciiMoves = {
  Rock: `  _______    
 (____   '---
(_____)      
(_____)      
 (____)      
  (___)__.---
`,
  Paper: `      _______    
 ____(____   '---
(______          
(_______         
 (_______        
  (__________.---
`,
  Scissors: `       _______    
  ____(____   '---
 (______          
(__________       
      (____)      
       (___)__.---
`,
  Unknown: `.-----------.
|    ???    |
|   ?  ??   |
|      ?    |
|     ?     |
|     ⁇     |
'───────────'
`,
};

const userChoiceButtons = document.querySelectorAll(".rsp-btn");
const statusMessage = document.querySelector(".status .system-out");
const gameScreen = document.querySelector(".game-screen");
const userChoiceAscii = document.querySelector(".user-choice");
const computerChoiceAscii = document.querySelector(".computer-choice");
const battleButton = document.querySelector(".battle-btn");
const roundCounter = document.querySelector(".roundCounter");
const userHealthBar = document.querySelector(".user-hearts pre");
const computerHealthBar = document.querySelector(".computer-hearts pre");
const roundCount = document.createElement("p");

let userChoice = "Unknown";
let computerChoice = "Unknown";

let roundCountNum = 0;
let roundNotice =
  roundCountNum < 10 ? `0${roundCountNum}/10` : `${roundCountNum}/10`;
roundCount.textContent = roundNotice;
roundCounter.append(roundCount);

let userScore = 10;
let computerScore = 10;

const drawHealthBar = (n) => {
  const heart = "❤︎ ";
  return heart.repeat(n).trimEnd();
};
userHealthBar.textContent = drawHealthBar(userScore);
computerHealthBar.textContent = drawHealthBar(computerScore);

userChoiceAscii.textContent = userAsciiMoves[userChoice];
computerChoiceAscii.textContent = computerAsciiMoves[computerChoice];

for (const button of userChoiceButtons) {
  button.addEventListener("click", () => {
    userChoice = button.innerText;
    const message = `${userChoice} has been selected. Click the battle button to play!`;
    userChoiceAscii.textContent = userAsciiMoves[userChoice];
    statusMessage.textContent = message;
  });
}

battleButton.addEventListener("click", () => {
  if (userChoice === "Unknown") {
    statusMessage.textContent = "Please select your moves.";
  } else if (roundCountNum < 8) {
    computerChoice = getComputerChoice();
    computerChoiceAscii.textContent = computerAsciiMoves[computerChoice];

    playRound(userChoice, computerChoice);

    userHealthBar.textContent = drawHealthBar(userScore);
    computerHealthBar.textContent = drawHealthBar(computerScore);

    let roundNotice =
      roundCountNum < 10 ? `0${roundCountNum}/10` : `${roundCountNum}/10`;
    roundCount.textContent = roundNotice;

    setTimeout(() => {
      userChoice = "Unknown";
      userChoiceAscii.textContent = userAsciiMoves[userChoice];
      computerChoice = "Unknown";
      computerChoiceAscii.textContent = computerAsciiMoves[computerChoice];
      statusMessage.textContent = "Choose your move!";
    }, 1500);
  } else if (roundCountNum === 8) {
    computerChoice = getComputerChoice();
    computerChoiceAscii.textContent = computerAsciiMoves[computerChoice];

    playRound(userChoice, computerChoice);

    userHealthBar.textContent = drawHealthBar(userScore);
    computerHealthBar.textContent = drawHealthBar(computerScore);

    let roundNotice =
      roundCountNum < 10 ? `0${roundCountNum}/10` : `${roundCountNum}/10`;
    roundCount.textContent = roundNotice;

    setTimeout(() => {
      userChoice = "Unknown";
      userChoiceAscii.textContent = userAsciiMoves[userChoice];
      computerChoice = "Unknown";
      computerChoiceAscii.textContent = computerAsciiMoves[computerChoice];
      statusMessage.textContent = "Final round! Choose your move wisely!";
    }, 1500);
  } else if (roundCountNum === 9) {
    computerChoice = getComputerChoice();
    computerChoiceAscii.textContent = computerAsciiMoves[computerChoice];

    playRound(userChoice, computerChoice);

    userHealthBar.textContent = drawHealthBar(userScore);
    computerHealthBar.textContent = drawHealthBar(computerScore);

    let roundNotice =
      roundCountNum < 10 ? `0${roundCountNum}/10` : `${roundCountNum}/10`;
    roundCount.textContent = roundNotice;

    setTimeout(() => {
      userChoice = "Unknown";
      userChoiceAscii.textContent = userAsciiMoves[userChoice];
      computerChoice = "Unknown";
      computerChoiceAscii.textContent = computerAsciiMoves[computerChoice];

      const message =
        userScore > computerScore
          ? "You have won the match!"
          : "Computer has won the match!";
      statusMessage.textContent = `${message} You: ${userScore} Computer: ${computerScore}`;
      roundCountNum = 0;
      let roundNotice =
        roundCountNum < 10 ? `0${roundCountNum}/10` : `${roundCountNum}/10`;

      roundCount.textContent = roundNotice;
      userScore = 10;
      computerScore = 10;
      userHealthBar.textContent = drawHealthBar(userScore);
      computerHealthBar.textContent = drawHealthBar(computerScore);
    }, 1500);
  }
});

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

function playRound(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    statusMessage.textContent = "Draw!";
    computerScore--;
    userScore--;
    roundCountNum++;
  } else {
    if (
      (userChoice === "Rock" && computerChoice === "Scissors") ||
      (userChoice === "Paper" && computerChoice === "Rock") ||
      (userChoice === "Scissors" && computerChoice === "Paper")
    ) {
      statusMessage.textContent = `You win! ${userChoice} beat(s) ${computerChoice}!`;
      computerScore--;
      roundCountNum++;
    } else if (
      (userChoice === "Rock" && computerChoice === "Paper") ||
      (userChoice === "Paper" && computerChoice === "Scissors") ||
      (userChoice === "Scissors" && computerChoice === "Rock")
    ) {
      statusMessage.textContent = `You lose! ${computerChoice} beat(s) ${userChoice}!`;
      userScore--;
      roundCountNum++;
    }
  }
}
