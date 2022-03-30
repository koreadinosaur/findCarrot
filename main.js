const playBtn = document.querySelector(".timer__playBtn");
const stopBtn = document.querySelector(".timer__stopBtn");
const time = document.querySelector(".timer__time");
const restartBtn = document.querySelector(".restart__button");
const carrotContainer = document.querySelector("#carrot");
const bugsContainer = document.querySelector("#bug");
const resultLost = document.querySelector("#result");
const carrotCountBox = document.querySelector(".carrotCount");
const resultWin = document.querySelector("#resultWin");
const resultContainer = document.querySelector("#resultContainer");

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
  if (ispaused && startSeconds) {
    startSeconds--;
  }
  time.innerHTML = `${startSeconds}초`;
  !startSeconds && loseGame();
}

playBtn.addEventListener("click", () => {
  alertSound.play();
  carrotCount = 10;
  carrotCountBox.innerHTML = `${carrotCount}`;
  const maxWidth = document.body.clientWidth;
  const maxHeight = document.body.clientHeight;
  ispaused = true;
  if (!intervalId) {
    intervalId = setInterval(countDown, 1000);
  }
  playBtn.classList.add("hide");
  stopBtn.classList.remove("hide");

  if (carrotContainer.classList.contains(`show`)) {
    return;
  } else {
    carrotContainer.classList.add(`show`);
    for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * (maxWidth - 80));
      const y = Math.floor(Math.random() * (maxHeight - 80));
      const x2 = Math.floor(Math.random() * (maxWidth - 50));
      const y2 = Math.floor(Math.random() * (maxHeight - 50));
      const carrots = document.createElement("img");
      carrots.src = "img/carrot.png";
      carrotContainer.appendChild(carrots);
      carrots.classList.add(`carrots-position`);
      carrots.id = `carrots-pisition${i}`;
      const carrotsArr = document.querySelectorAll(`.carrots-position`);
      carrotsArr[i].style.transform = `translate(${x}px,${y}px)`;

      const bugs = document.createElement("img");
      bugs.src = "img/bug.png";
      bugsContainer.appendChild(bugs);
      bugs.classList.add(`bugs-position`);
      bugs.id = `bugs-pisition${i}`;
      const bugsArr = document.querySelectorAll(`.bugs-position`);
      bugsArr[i].style.transform = `translate(${x2}px,${y2}px)`;
    }
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
  if (e.target.className == "carrots-position") {
    const targetElement = document.querySelector(`#${e.target.id}`);
    pullCarrotSound.play();
    carrotContainer.removeChild(targetElement);
    carrotCount--;
    carrotCountBox.innerHTML = `${carrotCount}`;
  }
  if (e.target.className == "bugs-position") {
    pullBugSound.play();
    loseGame(e);
  }
  if (carrotCount == 0) {
    winGame();
  }
});

function loseGame(e) {
  resultLost.classList.remove(`hide`);
  resultLost.classList.add(`displayResult`);
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  ispaused = false;
}

function winGame() {
  resultWin.classList.remove(`hide`);
  resultWin.classList.add(`displayResult`);
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  ispaused = false;
  winSound.play();
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
  carrotContainer.classList.remove(`show`);
  while (carrotContainer.hasChildNodes()) {
    carrotContainer.removeChild(carrotContainer.firstChild);
  }
  while (bugsContainer.hasChildNodes()) {
    bugsContainer.removeChild(bugsContainer.firstChild);
  }
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
}

resultContainer.addEventListener("click", (e) => {
  console.log(e.target.className);
  if (
    e.target.className == `restart__button` ||
    e.target.classList.contains(`restart__i--lost`)
  ) {
    readyToRegame();
    resultLost.classList.add(`hide`);
    resultLost.classList.remove(`displayResult`);
  } else if (
    e.target.className == `resultWin__button` ||
    e.target.classList.contains(`restart__i--win`)
  ) {
    readyToRegame();
    resultWin.classList.add(`hide`);
    resultWin.classList.remove(`displayResult`);
  }
});
