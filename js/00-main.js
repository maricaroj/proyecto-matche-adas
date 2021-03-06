const grid = document.getElementById("grid");
const infoButton = document.getElementById("info-button");
const undoButton = document.getElementById("undo-button");
const remaningTime = document.getElementById("remaining-time");
const gridContainer = document.getElementById("grid-container");

const emojis = ["🧠", "🩹", "💉", "\uD83E\uDEC0", "👩🏼‍⚕️", "🏥"];
let level;
let size;
let startTimer;
let time;
let optionWelcome = true;
let gridArr = [];
let dataRestart = [];

// Generar item random
const getRandom = () =>
  emojis[(Math.random() * (emojis.length - 1)).toFixed(0)];

// Generando contenedor emoji
const getBox = (x, y) => {
  const box = document.createElement("div");
  box.dataset.x = x;
  box.dataset.y = y;
  box.innerHTML = gridArr[x][y];
  box.style.width = `${(size / level - 5).toFixed(0)}px`;
  box.style.height = `${(size / level - 5).toFixed(0)}px`;
  grid.appendChild(box);
  box.addEventListener("click", selectBox);
  twemoji.parse(document.body);
};

// Generando Grilla
const generateGrid = () => {
  dataRestart = [];
  secondsToMinutes(time);
  gridArr = [];
  grid.innerHTML = "";
  for (i = 0; i < level; i++) {
    gridArr[i] = [];
    for (j = 0; j < level; j++) {
      gridArr[i][j] = getRandom();
      getBox(i, j);
    }
  }
  timer(time);
  dataRestart.push(level, time);
  console.log(dataRestart);
  return dataRestart;
};

// Timer
const secondsToMinutes = (time) => {
  let seconds = time % 60;
  let minutes = ((time - seconds) / 60) % 60;
  let txtSeconds = seconds < 10 ? "0" + seconds : seconds;
  let txtMinutes = minutes < 10 ? "0" + minutes : minutes;
  return (remaningTime.innerHTML = `${txtMinutes}:${txtSeconds}`);
};

const timer = () => {
  startTimer = setInterval(() => {
    if (time > 0) {
      time--;
      secondsToMinutes(time);
    } else {
      gameOverModal();
    }
  }, 1000);
  return time;
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
const selectBox = (e) => {
  let clickedItem = document.querySelector(".select");
  console.log(clickedItem);
  if (clickedItem) {
    console.log(isAdjancent(clickedItem, e.path[1]));
  } else {
    if (e.target.classList.contains("emoji")) {
      e.path[1].classList.add("select");
    }
  }
};

const isAdjancent = (box1, box2) => {
  const datax1 = Number(box1.dataset.x);
  const datax2 = Number(box2.dataset.x);
  const datay1 = Number(box1.dataset.y);
  const datay2 = Number(box2.dataset.y);
  if (
    (datax1 === datax2 && datay1 === datay2 - 1) || //arriba
    (datax1 === datax2 && datay1 === datay2 + 1) || //abajo
    (datay1 === datay2 && datax1 === datax2 + 1) || //derecha
    (datay1 === datay2 && datax1 === datax2 - 1) //izquierda
  ) {
    return true;
  }
  return false;
};

// Ajustando tamaño grilla responsive
const resize = () => {
  size = gridContainer.getBoundingClientRect().width;
  if (innerWidth > 550) {
    return;
  } else {
    gridContainer.style.width = `${size}px`;
    gridContainer.style.height = `${size}px`;
  }
  return size;
};
window.onload = resize;
