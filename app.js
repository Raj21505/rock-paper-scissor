let totalRounds = 0;
let currentRound = 0;
let playerScore = 0;
let computerScore = 0;

const handSymbols = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Start game with selected number of rounds
function startGame(rounds) {
    totalRounds = rounds;
    currentRound = 0;
    playerScore = 0;
    computerScore = 0;

    document.getElementById("totalRounds").textContent = totalRounds;

    document.getElementById("roundSelection").classList.add("hidden");
    document.getElementById("gameArea").classList.remove("hidden");

    showHands();
}

// Show hands boxes
function showHands() {
    document.getElementById("playerHand").classList.add("show");
    document.getElementById("computerHand").classList.add("show");
}

// Player selects a choice
function playerChoose(choice) {
    currentRound++;
    document.getElementById("roundNumber").textContent = currentRound;

    const computerChoice = randomComputerChoice();
    animateHands(choice, computerChoice);

    setTimeout(() => {
        decideWinner(choice, computerChoice);
    }, 600);

    if (currentRound === totalRounds) {
        setTimeout(showFinalResult, 900);
    }
}

// Random choice for computer
function randomComputerChoice() {
    const options = ["rock","paper","scissors"];
    return options[Math.floor(Math.random()*3)];
}

// Animate hands with shake
function animateHands(player, computer) {
    const pHand = document.getElementById("playerHand");
    const cHand = document.getElementById("computerHand");

    pHand.classList.remove("shake");
    cHand.classList.remove("shake");

    void pHand.offsetWidth;
    void cHand.offsetWidth;

    pHand.classList.add("shake");
    cHand.classList.add("shake");

    setTimeout(() => {
        pHand.textContent = handSymbols[player];
        cHand.textContent = handSymbols[computer];
    }, 300);
}

// Decide round winner
function decideWinner(player, computer) {
    let resultText = "";

    if (player === computer) resultText = "It's a Tie!";
    else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        resultText = "You Win!";
        playerScore++;
    } else {
        resultText = "Computer Wins!";
        computerScore++;
    }

    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;
    document.getElementById("resultText").textContent = resultText;
}

// Show final result after all rounds
function showFinalResult() {
    document.getElementById("gameArea").classList.add("hidden");
    const endScreen = document.getElementById("endScreen");
    endScreen.classList.remove("hidden");

    let finalText = "";
    if (playerScore > computerScore) finalText = "🎉 You Won the Match!";
    else if (computerScore > playerScore) finalText = "💻 Computer Won the Match!";
    else finalText = "🤝 Match Draw!";
    
    document.getElementById("finalResult").textContent = finalText;
}

// Restart game
function restartGame() {
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("roundSelection").classList.remove("hidden");
}

// Exit game: terminate UI and show message
function exitGame() {
    const confirmExit = confirm("Are you sure you want to exit the game?");
    if (!confirmExit) return;

    // Hide all game sections
    document.getElementById("roundSelection").classList.add("hidden");
    document.getElementById("gameArea").classList.add("hidden");
    document.getElementById("endScreen").classList.add("hidden");

    // Show terminated message
    const container = document.querySelector(".game-container");
    container.innerHTML = `
        <h1 style="font-family: 'Fredoka One', cursive; font-size: 42px; color:#222; margin-top:50px;">
            🛑 Game Terminated
        </h1>
        <p style="font-size: 22px; color:#555; margin-top:20px;">Thanks for playing!</p>
    `;
}
