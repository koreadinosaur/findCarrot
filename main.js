const playBtn = document.querySelector(".timer__playBtn");
const stopBtn = document.querySelector(".timer__stopBtn");
const time = document.querySelector(".timer__time");
const restartBtn = document.querySelector(".restart__button");
const gameField = document.querySelector("#gameField");
const bugsContainer = document.querySelector("#bug");
const result = document.querySelector("#result");
const carrotCountBox = document.querySelector(".carrotCount");
const resultContainer = document.querySelector("#resultContainer");

//sound
const pullCarrotSound = new Audio(`sound/carrot_pull.mp3`);
const pullBugSound = new Audio(`sound/bug_pull.mp3`);
const winSound = new Audio(`sound/game_win.mp3`);
const backgroundMusic = new Audio(`sound/bg.mp3`);
const alertSound = new Audio(`sound/alert.wav`);

let startSeconds = 10;
let carrotCount;
let ispaused = false;
let intervalId;
function countDown() {
  ispaused = true;
  if (ispaused && startSeconds) {
    startSeconds--;
  }
  time.innerHTML = `${startSeconds}초`;
  !startSeconds && winOrLose(`lost`);
}
function showPlayBtn() {
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
}
function showStopBtn() {
  playBtn.classList.add("hide");
  stopBtn.classList.remove("hide");
}
function addItem(className, imgsrc, count, imgSize) {
  const maxWidth = gameField.getBoundingClientRect().width;
  const maxHeight = gameField.getBoundingClientRect().height;
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * (maxWidth - imgSize));
    const y = Math.floor(Math.random() * (maxHeight - imgSize));
    const item = document.createElement("img");
    item.src = `${imgsrc}`;
    gameField.appendChild(item);
    item.classList.add(className);
    item.id = `${className}${i}`;
    item.style.transform = `translate(${x}px,${y}px)`;
  }
}

playBtn.addEventListener("click", () => {
  alertSound.play();
  carrotCount = 10;
  carrotCountBox.innerHTML = `${carrotCount}`;

  if (!intervalId) {
    intervalId = setInterval(countDown, 1000);
  }
  showStopBtn();

  if (gameField.classList.contains(`show`)) {
    return;
  } else {
    gameField.classList.add(`show`);
    addItem(`carrot`, `img/carrot.png`, 10, 80);
    addItem(`bug`, `img/bug.png`, 10, 50);
  }
});

function stopGame(e) {
  ispaused = false;
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  clearInterval(intervalId);
  intervalId = null;
}

stopBtn.addEventListener("click", (e) => {
  stopGame(e);
});
// restartBtn.addEventListener("click", () => {});

window.addEventListener("click", (e) => {
  if (e.target.className == "carrot") {
    const targetElement = document.querySelector(`#${e.target.id}`);
    pullCarrotSound.play();
    gameField.removeChild(targetElement);
    carrotCount--;
    carrotCountBox.innerHTML = `${carrotCount}`;
  }
  if (e.target.className == "bug") {
    pullBugSound.play();
    winOrLose(`lost`);
  }
  if (carrotCount == 0) {
    winOrLose(`win`);
    winSound.play();
  }
});
function winOrLose(gameresult) {
  clearInterval(intervalId);
  resultContainer.innerHTML = `<section id="result">
  <div class="result__${gameresult}">you ${gameresult}</div>
  <button class="restart__button">
    <i class="fa-solid fa-rotate-left"></i>
  </button>
  </section>
  `;
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  ispaused = false;
}

function readyToRegame() {
  alertSound.play();
  clearInterval(intervalId);
  intervalId = null;
  ispaused = false;
  startSeconds = 10;
  time.innerHTML = `${startSeconds}초`;
  carrotCount = 1;
  carrotCountBox.innerHTML = `0`;
  gameField.classList.remove(`show`);
  resultContainer.innerHTML = "";
  gameField.innerHTML = "";
  showPlayBtn();
}

resultContainer.addEventListener("click", (e) => {
  console.log(e.target.className);
  if (
    e.target.className == `restart__button` ||
    e.target.classList.contains(`fa-rotate-left`)
  ) {
    readyToRegame();
  }
});
