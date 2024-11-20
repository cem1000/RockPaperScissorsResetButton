var gamesPlayed = 0;
var playerWins = 0;
var isGameRunning = true;

function showChoices() {
    document.getElementById('choices').style.display = 'flex';
}

function computerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    var computerChoiceValue = choices[randomIndex];
    return computerChoiceValue;
}

async function gameLoop(playerChoice) {
    while (isGameRunning && gamesPlayed < 3 && playerWins === 0) {
        const computerChoiceValue = computerChoice();
        console.log('Player chose: ' + playerChoice);
        console.log('Computer chose: ' + computerChoiceValue);
        
        determineWinner(playerChoice, computerChoiceValue);
        gamesPlayed++;
        
        if (gamesPlayed >= 3 || playerWins > 0) {
            isGameRunning = false;
            document.getElementById('choices').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'block';
            const finalMessage = playerWins > 0 
                ? "\nGame Over - You won!" 
                : "\nGame Over - You played 3 games!";
            document.getElementById('result').textContent += finalMessage;
        }
        
        break;
    }
}

function playGame(playerChoice) {
    if (!isGameRunning) {
        return;
    }
    gameLoop(playerChoice);
}

function determineWinner(playerChoice, computerChoice) {
    const resultElement = document.getElementById('result');
    var resultMessage;

    if (playerChoice === computerChoice) {
        resultMessage = `Game ${gamesPlayed + 1}: It's a tie!`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerWins++;
        resultMessage = `Game ${gamesPlayed + 1}: Player wins!`;
    } else {
        resultMessage = `Game ${gamesPlayed + 1}: Computer wins!`;
    }

    resultElement.textContent = resultElement.textContent 
        ? `${resultElement.textContent}\n${resultMessage}`
        : resultMessage;
        
    displayChoices(computerChoice, playerChoice);
}

function displayChoices(computerChoiceValue, playerChoice) {
    document.getElementById('computerChoiceDisplay').style.display = 'flex';
    document.getElementById('computerChoiceDisplay').innerHTML = "Computer chose: " + computerChoiceValue + "<br><br>You chose: " + playerChoice;
}

function resetGame() {
    gamesPlayed = 0;
    playerWins = 0;
    isGameRunning = true;
    
    document.getElementById('result').textContent = '';
    document.getElementById('computerChoiceDisplay').textContent = '';
    
    document.getElementById('choices').style.display = 'flex';
    document.getElementById('resetBtn').style.display = 'none';
}
