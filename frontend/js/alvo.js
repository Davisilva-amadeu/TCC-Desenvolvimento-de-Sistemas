const areaJogo = document.getElementById("areaJogo");

const alvo = document.getElementById("alvo");

const pontuacaoHTML = document.getElementById("pontuacao");

const tempoHTML = document.getElementById("tempo");

const botaoReiniciar = document.getElementById("reiniciar");


// Variáveis

let pontuacao = 0;

let tempo = 30;

let jogoAtivo = false;

let intervaloTempo;


// ==================================
// INICIAR JOGO
// ==================================

function iniciarJogo(){


    pontuacao = 0;

    tempo = 30;


    pontuacaoHTML.textContent = pontuacao;

    tempoHTML.textContent = tempo;


    jogoAtivo = true;


    moverAlvo();


    clearInterval(intervaloTempo);


    intervaloTempo = setInterval(()=>{


        tempo--;


        tempoHTML.textContent = tempo;



        if(tempo <= 0){


            finalizarJogo();


        }


    },1000);



}



// ==================================
// MOVER ALVO
// ==================================

function moverAlvo(){


    if(!jogoAtivo)
        return;



    const largura = areaJogo.clientWidth;

    const altura = areaJogo.clientHeight;



    const posX = Math.random() *

        (largura - 60);



    const posY = Math.random() *

        (altura - 60);



    alvo.style.left = posX + "px";


    alvo.style.top = posY + "px";



}



// ==================================
// CLICAR NO ALVO
// ==================================

alvo.addEventListener(

    "click",

    ()=>{


        if(!jogoAtivo)
            return;



        pontuacao++;


        pontuacaoHTML.textContent =
            pontuacao;



        moverAlvo();



    }

);



// ==================================
// DIFICULDADE
// ==================================


setInterval(()=>{


    if(jogoAtivo){


        moverAlvo();


    }


},800);



// ==================================
// FINALIZAR
// ==================================

function finalizarJogo(){


    jogoAtivo = false;


    clearInterval(intervaloTempo);


    alvo.style.left = "50%";

    alvo.style.top = "50%";



    alert(

        "Fim de jogo!\nPontuação: "

        + pontuacao

    );



}



// ==================================
// REINICIAR
// ==================================

botaoReiniciar.addEventListener(

    "click",

    iniciarJogo

);



// COMEÇAR

iniciarJogo();