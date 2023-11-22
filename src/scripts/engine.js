//Apanha tudo da tela
const state = {
    //variaveis globais visuais
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    //Variaveis para calculos
    values: {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    //Ações de forma visual
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown(){
    //Cuida do tempo interno
    state.values.currentTime --;
    //Cuida do tempo visual
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! O seu resultado foi: "+state.values.result)
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

//Sorteia um quadrado para o inimigo ficar
function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    //sorteia um numero de 1 a 9 inteiro
    let randomNumber = Math.floor(Math.random()*9);

    //Adiciona o numero sorteado no objeto state na propriedade view, definindo um dos 9 quadrados da tela
    let randomSquare = state.view.squares[randomNumber];

    //Adiciona a classe inimigo no quadrado sorteado a cima
    randomSquare.classList.add("enemy");

    //Guarda a posição sorteada para validar condições
    state.values.hitPosition = randomSquare.id;
}

//Movimenta o inimigo em um determinado tempo
// function moveEnemy(){
//     //Criando um intervalo sendo chamado a cada x segundos do game velocity
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }

//Listener: "Alguem que espera alguma ação a ser executado"
function addListenerHitBox(){
    //verificar se onde é clicado é onde o inimigo ta
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=>{
            //Verificando se onde clicou é igual onde o personagem ta
           if(square.id===state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result
                state.values.hitPosition=null;
                playSound("hit");
           }
        });
    });
}

//Função principal para chamar funções principais
function initialize(){
    // moveEnemy();
    addListenerHitBox();
}

initialize();
