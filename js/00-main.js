const grid = document.getElementById("grid");
const infoButton = document.getElementById("info-button");
const undoButton = document.getElementById("undo-button");
const remaningTime = document.getElementById("remaining-time");

const emojis = ["🧠", "🩹", "💉", "\uD83E\uDEC0", "👩🏼‍⚕️", "🏥"];
let level;
let startTimer;
let time;
let optionWelcome = true;

// Generando Grilla
const generateGrid = () => {
  time = 30;
  remaningTime.innerHTML = `00:${time}`;
  grid.innerHTML = "";
  for (i = 0; i < level; i++) {
    for (j = 0; j < level; j++) {
      const box = document.createElement("div");
      box.dataset.x = i;
      box.dataset.y = j;
      box.innerHTML =
        emojis[(Math.random() * (emojis.length - 1 - 0 + 0)).toFixed(0)];
      box.style.width = `${450 / level}px`;
      box.style.height = `${450 / level}px`;
      grid.appendChild(box);
      box.addEventListener("click", () => {
        box.classList.add("select");
      });
      twemoji.parse(document.body);
    }
  }
  startTimer = setInterval(timer, 1000);
  return level;
};

// Timer
const timer = () => {
  if (time > 0) {
    time--;
    let seconds = time % 60;
    let minutes = ((time - seconds) / 60) % 60;
    let txtSeconds = seconds < 10 ? "0" + seconds : seconds;
    let txtMinutes = minutes < 10 ? "0" + minutes : minutes;
    remaningTime.innerHTML = `${txtMinutes}:${txtSeconds}`;
  } else {
    gameOverModal();
  }
};

const stopTimer = () => {
  clearInterval(startTimer);
};

// Mostrar modal Bienvenida
window.onload = welcomeModal();

// Eventos botones
infoButton.addEventListener("click", welcomeModal);
undoButton.addEventListener("click", restartModal);

// Seleccionar items
