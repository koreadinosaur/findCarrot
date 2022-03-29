const playBtn = document.querySelector(".timer__playBtn");
const stopBtn = document.querySelector(".timer__stopBtn");
const time = document.querySelector(".timer__time");
const restartBtn = document.querySelector(".restart__button");
let startSeconds = 10;
let ispaused = false;
function countDown() {
  if (ispaused) {
    time.innerHTML = `${startSeconds}`;
    startSeconds--;
  }
}
const intervalId = setInterval(countDown, 1000);
playBtn.addEventListener("click", () => {
  playBtn.classList.add("hide");
  stopBtn.classList.remove("hide");
  ispaused = true;
});

stopBtn.addEventListener("click", (e) => {
  stopBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  e.preventDefault();
  ispaused = false;

  //   clearInterval(setIntervalId);
});
restartBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  ispaused = false;
  startSeconds = 10;
  time.innerHTML = `${startSeconds}`;
  setInterval(countDown, 1000);
});
