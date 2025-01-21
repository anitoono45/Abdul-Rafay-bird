const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");
const bird = document.getElementById("bird");
const scoreDisplay = document.getElementById("score");

const jumpSound = document.getElementById("jump-sound");
const hitSound = document.getElementById("hit-sound");

let birdY = 250;
let gravity = 0.2;
let velocity = 0;
let isGameOver = false;
let pipes = [];
let score = 0;

// Start the game
startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  gameLoop();
});

// Bird jump on click
gameContainer.addEventListener("click", () => {
  if (!isGameOver) {
    velocity = -5;
    jumpSound.play();
  }
});

// Create pipes
function createPipe() {
  const pipeGap = 150;
  const pipeHeight = Math.random() * 200 + 100;

  const upperPipe = document.createElement("div");
  upperPipe.classList.add("pipe", "upper");
  upperPipe.style.height = `${pipeHeight}px`;
  upperPipe.style.left = "400px";

  const lowerPipe = document.createElement("div");
  lowerPipe.classList.add("pipe", "lower");
  lowerPipe.style.height = `${600 - pipeHeight - pipeGap}px`;
  lowerPipe.style.left = "400px";

  gameContainer.appendChild(upperPipe);
  gameContainer.appendChild(lowerPipe);

  pipes.push({ upperPipe, lowerPipe });
}

// Update game
function updateGame() {
  if (isGameOver) return;

  velocity += gravity;
  birdY += velocity;
  bird.style.top = `${birdY}px`;

  pipes.forEach((pipe, index) => {
    const pipeLeft = parseInt(pipe.upperPipe.style.left);
    pipe.upperPipe.style.left = `${pipeLeft - 3}px`;
    pipe.lowerPipe.style.left = `${pipeLeft - 3}px`;

    if (
      pipeLeft < 90 &&
      pipeLeft > 40 &&
      (birdY < parseInt(pipe.upperPipe.style.height) ||
        birdY > 600 - parseInt(pipe.lowerPipe.style.height))
    ) {
      isGameOver = true;
      hitSound.play();
      alert(`You lost! The bird tried its best but failed with a score of ${score}.`);
      window.location.reload();
    }

    if (pipeLeft < -60) {
      pipe.upperPipe.remove();
      pipe.lowerPipe.remove();
      pipes.splice(index, 1);
      score++;
      scoreDisplay.textContent = score;
    }
  });

  if (birdY > 570 || birdY < 0) {
    isGameOver = true;
    hitSound.play();
    alert(`Oops! The bird fell down. Final score: ${score}.`);
    window.location.reload();
  }
}

// Game loop
function gameLoop() {
  updateGame();
  requestAnimationFrame(gameLoop);
}

// Generate pipes
setInterval(() => {
  if (!isGameOver) createPipe();
}, 2000);
