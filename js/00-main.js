const grid = document.getElementById('grid');


const emojis = ['🧠', '🩹', '💉', '\uD83E\uDEC0','👩🏼‍⚕️','🏥'];  
let level = 7;



// Generando Grilla
const generateGrid = () =>{
    grid.innerHTML = '';
    const newArr = [];
    for(i=0; i < level ; i ++ ){
        for(j=0; j < level ; j++){
            newArr.push(emojis[(Math.random() * (((emojis.length -1) - 0) + 0)).toFixed(0)]);
        };
    };
    for(k=0; k < newArr.length; k ++ ){
        const box = document.createElement('div');
        box.innerHTML = newArr[k];
        grid.appendChild(box);
        twemoji.parse(document.body);
        box.style.width = `${450 / level}px`;
       
    };
};

generateGrid();