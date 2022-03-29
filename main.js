const playBtn = document.querySelector(".timer__playBtn");
const stopBtn = document.querySelector(".timer__stopBtn");
const time = document.querySelector(".timer__time");
const restartBtn = document.querySelector(".restart__button");
const carrotContainer = document.querySelector("#carrot");
const bugsContainer = document.querySelector("#bug");

let startSeconds = 10;
let ispaused = false;
let intervalId;
function countDown() {
  if (ispaused && startSeconds) {
    time.innerHTML = `${startSeconds}`;
    startSeconds--;
  }
}

playBtn.addEventListener("click", () => {
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
      const carrots = document.createElement("img");
      carrots.src = "img/carrot.png";
      carrotContainer.appendChild(carrots);
      carrots.classList.add(`carrots-position`);
      const item = document.querySelectorAll(`.carrots-position`);
      console.log(item);
      item[i].style.transform = `translate(${x}px,${y}px)`;

      const bugs = document.createElement("img");
      bugs.src = "img/bug.png";
      bugsContainer.appendChild(bugs);
      bugs.classList.add(`bugs-position${i}`);
    }
  }
});

stopBtn.addEventListener("click", (e) => {
  ispaused = false;
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  e.preventDefault();

  //   clearInterval(setIntervalId);
});
restartBtn.addEventListener("click", (intervalId) => {
  clearInterval(intervalId);
  ispaused = false;
  startSeconds = 10;
  time.innerHTML = `${startSeconds}`;
});
