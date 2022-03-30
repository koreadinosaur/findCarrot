const playBtn = document.querySelector(".timer__playBtn");
const stopBtn = document.querySelector(".timer__stopBtn");
const time = document.querySelector(".timer__time");
const restartBtn = document.querySelector(".restart__button");
const carrotContainer = document.querySelector("#carrot");
const bugsContainer = document.querySelector("#bug");
const result = document.querySelector("#result");
const carrotCountBox = document.querySelector(".carrotCount");

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
      const x = Math.floor(Math.random() * maxWidth);
      const y = Math.floor(Math.random() * maxHeight);
      const x2 = Math.floor(Math.random() * maxWidth);
      const y2 = Math.floor(Math.random() * maxHeight);
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
restartBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  ispaused = false;
  startSeconds = 10;
  time.innerHTML = `${startSeconds}초`;
  result.classList.add(`hide`);
  result.classList.remove(`displayResult`);
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  carrotCount = 0;
  carrotCountBox.innerHTML = `${carrotCount}`;
  while (carrotContainer.hasChildNodes()) {
    carrotContainer.removeChild(carrotContainer.firstChild);
  }
  while (bugsContainer.hasChildNodes()) {
    bugsContainer.removeChild(bugsContainer.firstChild);
  }
  carrotContainer.classList.remove(`show`);
});

window.addEventListener("click", (e) => {
  if (e.target.className == "carrots-position") {
    const targetElement = document.querySelector(`#${e.target.id}`);
    carrotContainer.removeChild(targetElement);
    carrotCount--;
    carrotCountBox.innerHTML = `${carrotCount}`;
  }
  if (e.target.className == "bugs-position") {
    loseGame(e);
  }
  if (carrotCount == 0) {
    console.log(`hi`);
  }
});

function loseGame(e) {
  result.classList.remove(`hide`);
  result.classList.add(`displayResult`);
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  ispaused = false;
}
