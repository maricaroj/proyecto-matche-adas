const grid = document.getElementById("grid");
const infoButton = document.getElementById("info-button");
const undoButton = document.getElementById("undo-button");
const remaningTime = document.getElementById("remaining-time");
const gridContainer = document.getElementById("grid-container");
const counterCombo = document.getElementById("score-combo");
const counterScore = document.getElementById("score-numb");

const emojis = ["🧠", "🩹", "💉", "\uD83E\uDEC0", "👩🏼‍⚕️", "🏥"];
let level;
let size;
let startTimer;
let time;
let optionWelcome = true;
let gridArr = [];
let dataRestart = [];
let contadorPuntosHorizontal = 0;
let contadorPuntosVertical = 0;

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
  counterScore.innerHTML = 0;
  counterCombo.innerHTML = 1;
  for (i = 0; i < level; i++) {
    gridArr[i] = [];
    for (j = 0; j < level; j++) {
      gridArr[i][j] = getRandom();
      getBox(i, j);
      horizontalBlock();
      verticalBlock();
    }
  }
  timer();
  dataRestart.push(level, time);
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
  if (clickedItem) {
    if (isAdjancent(clickedItem, e.path[1])) {
      swapBox(clickedItem, e.path[1]);
      const horizontal = horizontalBlock();
      const vertical = verticalBlock();
      if (horizontal === false && vertical === false) {
        setTimeout(() => {
          swapBox(clickedItem, e.path[1]);
        }, 500);
      }
    } else {
      if (e.target.classList.contains("emoji")) {
        e.path[1].classList.add("select");
        clickedItem.classList.remove("select");
      }
    }
    clickedItem.classList.remove("select");
  } else {
    if (e.target.classList.contains("emoji")) {
      e.path[1].classList.add("select");
    }
  }
    horizontalBlock()
    verticalBlock()
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

// Intercambiar iconos
const swapBox = (box1, box2) => {
  const x1 = Number(box1.dataset.x);
  const x2 = Number(box2.dataset.x);
  const y1 = Number(box1.dataset.y);
  const y2 = Number(box2.dataset.y);

  // modificar la grilla en js
  let change = gridArr[x1][y1];
  gridArr[x1][y1] = gridArr[x2][y2];
  gridArr[x2][y2] = change;

  // modificar el html
  let change2 = box1.innerHTML;
  box1.innerHTML = box2.innerHTML;
  box2.innerHTML = change2;
};
// Buscando coincidencias horizontales, eliminando y rellenando
const horizontalBlock = () => {
  let result;
  let booleano = false;
  for (let i = 0; i < gridArr.length; i++) {
    for (let j = 0; j < gridArr[i].length; j++) {
      let match = 0;
      for (let k = j; k <= gridArr[i].length; k++) {
        if (gridArr[i][j] === gridArr[i][k]) {
          match++;
        } else {
          if (match >= 3) {
            result = { x: i, y: j, match: match };
            let a = 0;
            while (a < result.match) {
              a++;
              let box = document.querySelector(
                `div[data-x="${result.x}"][data-y="${result.y}"]`
              );
              box.innerHTML = "";
              gridArr[result.x][result.y] = null;
              gridArr[result.x][result.y] = getRandom();
              box.innerHTML = gridArr[result.x][result.y];
              twemoji.parse(document.body);
              result.y = result.y + 1;
            }
            booleano = true;
          } else {
            match = 1;
            j = k;
          }
        }
      }
    }
  }
  return booleano;
};

// Buscando coincidencias verticales, eliminando y rellenando

const verticalBlock = () => {
  let result;
  let booleano = false;
  for (let j = 0; j < gridArr[0].length; j++) {
    for (let i = 0; i < gridArr.length; i++) {
      let match = 0;
      for (let k = i; k <= gridArr.length; k++) {
        if (gridArr[k] && gridArr[i][j] === gridArr[k][j]) {
          match++;
        } else {
          if (match >= 3) {
            result = { x: i, y: j, match: match };
            let a = 0;
            while (a < result.match) {
              a++;
              let box = document.querySelector(
                `div[data-x="${result.x}"][data-y="${result.y}"]`
              );
              box.innerHTML = "";
              gridArr[result.x][result.y] = null;
              gridArr[result.x][result.y] = getRandom();
              box.innerHTML = gridArr[result.x][result.y];
              twemoji.parse(document.body);
              result.x = result.x + 1;
            }
            booleano = true;
          } else {
            match = 1;
            i = k;
          }
        }
      }
    }
  }
  return booleano;
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
