let score = 0;
let pointsPerClick = 1;
let autoClickerCount = 0;
let autoClickerCost = 100;
let multiClickCost = 200;
let autoClickerInterval;


const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const autoClickerButton = document.getElementById('autoClickerButton');
const multiClickButton = document.getElementById('multiClickButton');

// Load game state from localStorage
function loadGame() {
    const savedScore = localStorage.getItem('score');
    const savedPointsPerClick = localStorage.getItem('pointsPerClick');
    const savedAutoClickerCount = localStorage.getItem('autoClickerCount');
    const savedAutoClickerCost = localStorage.getItem('autoClickerCost');
    const savedMultiClickCost = localStorage.getItem('multiClickCost');

    if (savedScore !== null) score = parseFloat(savedScore);
    if (savedPointsPerClick !== null) pointsPerClick = parseFloat(savedPointsPerClick);
    if (savedAutoClickerCount !== null) autoClickerCount = parseInt(savedAutoClickerCount);
    if (savedAutoClickerCost !== null) autoClickerCost = parseInt(savedAutoClickerCost);
    if (savedMultiClickCost !== null) multiClickCost = parseInt(savedMultiClickCost);

    if (autoClickerCount > 0) {
        autoClickerInterval = setInterval(() => {
            score += autoClickerCount * pointsPerClick;
            updateScore();
        }, 1000); // 1 раз в секунду
    }

    updateButtons();
    updateScore();
}

// Save game state to localStorage
function saveGame() {
    localStorage.setItem('score', score);
    localStorage.setItem('pointsPerClick', pointsPerClick);
    localStorage.setItem('autoClickerCount', autoClickerCount);
    localStorage.setItem('autoClickerCost', autoClickerCost);
    localStorage.setItem('multiClickCost', multiClickCost);
}

function updateScore() {
    scoreDisplay.textContent = Math.round(score);
    saveGame();
    updateButtons();
}

function updateButtons() {
    autoClickerButton.textContent = `Автокликер (${autoClickerCost} очков)`;
    autoClickerButton.disabled = score < autoClickerCost;
    multiClickButton.textContent = `Многократный клик (${multiClickCost} очков)`;
    multiClickButton.disabled = score < multiClickCost;
}

clickButton.addEventListener('click', () => {
    score += pointsPerClick;
    updateScore();
});

autoClickerButton.addEventListener('click', () => {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickerCount++;
        autoClickerCost *= 2;
        if (autoClickerCount === 1) {
            autoClickerInterval = setInterval(() => {
                score += autoClickerCount * pointsPerClick;
                updateScore();
            }, 1000); // 1 раз в секунду
        }
        updateScore();
    } else {
        alert("Недостаточно очков для покупки автокликера");
    }
});

multiClickButton.addEventListener('click', () => {
    if (score >= multiClickCost) {
        score -= multiClickCost;
        pointsPerClick *= 2;
        multiClickCost *= 2;
        updateScore();
    } else {
        alert("Недостаточно очков для покупки многократного клика");
    }
});

// Update buttons every second to check for changes in button state
setInterval(updateButtons, 1000);

// Load the game state when the page loads
window.onload = loadGame;

// Save the game state when the page unloads
window.onbeforeunload = saveGame;
