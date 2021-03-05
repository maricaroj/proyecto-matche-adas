// MODAL SELECCION NIVELES
const levelSelect = () => {
  optionWelcome = false;
  swal({
    title: "Nuevo Juego",
    text: "Selecciona una dificultad",
    buttons: {
      easy: {
        text: "Fácil",
        value: "easy",
      },
      middle: {
        text: "Medio",
        value: "middle",
      },
      hard: {
        text: "Difícil",
        value: "hard",
      },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch (value) {
      case "easy":
        level = 9;
        break;
      case "middle":
        level = 8;
        break;
      case "hard":
        level = 7;
        break;
    }
    generateGrid();
  });
};

// MODAL BIENVENIDA
const welcomeModal = () => {
  stopTimer();
  swal({
    title: "¡Welcome!",
    text: ` En MatcheADAs tu objetivo es juntar tres o más figuras del mismo tipo, ya sea en fila o columna. Para eso, selecciona una figura y a continuación una figura adyacente para intercambiarlas de lugar.
        
        Si se forma un grupo, esas figuras se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes que se acabe el tiempo!
        
        Controles
        Click izquierdo: selección
        Enter o Espaciado: selección
        Flechas o WASD: movimiento e intercambio
        `,
    button: "A jugar",
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then(()=>{
    if(optionWelcome){
      levelSelect();
    }else if(!optionWelcome){
      startTimer = setInterval(timer, 1000);
    };
  });
}
// MODAL REINICIAR JUEGO
const restartModal = () => {
  stopTimer();
  swal({
    title: "¿Reiniciar Juego?",
    text: "¡Perderás todo tu puntaje acumulado!",
    buttons: {
      cancel: "Cancelar",
      confirm: "Nuevo Juego",
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch (value) {
      case null:
        startTimer = setInterval(timer, 1000);
        break;
      case true:
        levelSelect();
        break;
    }
  });
};

// MODAL JUEGO TERMINADO
const gameOverModal = () => {
  swal({
    title: "¡Juego Terminado!",
    text: `Puntaje Final: 0`,
    buttons: {
      newGame: {
        text: "Nuevo Juego",
        value: "newGame",
      },
      reStart: {
        text: "Reiniciar",
        value: "reStart",
      },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch (value) {
      case "newGame":
        levelSelect();
        break;
      case "reStart":
        generateGrid(level);
        break;
    }
  });
  stopTimer();
};
