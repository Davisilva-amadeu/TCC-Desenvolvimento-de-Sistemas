const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");


// Informações

const pontuacaoHTML =
document.getElementById("pontuacao");

const tempoHTML =
document.getElementById("tempo");

const botaoReiniciar =
document.getElementById("reiniciar");


// ==================================
// CONFIGURAÇÕES
// ==================================


let jogoAtivo = true;


let pontuacao = 0;


let tempo = 0;



// Física

const gravidade = 0.3;


// ==================================
// JOGADOR
// ==================================


const jogador = {


    x:100,


    y:350,


    largura:40,


    altura:40,


    velocidadeY:0,


    forcaPulo:-19,


    noChao:false


};



// ==================================
// CHÃO
// ==================================


const chao = {


    x:0,


    y:450,


    largura:900,


    altura:50


};



// ==================================
// CONTROLES
// ==================================


document.addEventListener(

"keydown",

(e)=>{


    if(
        e.code === "Space" &&
        jogador.noChao
    ){


        jogador.velocidadeY =
        jogador.forcaPulo;


        jogador.noChao=false;


    }


}

);



// ==================================
// ATUALIZAR JOGADOR
// ==================================

function atualizarJogador(){



    jogador.velocidadeY += gravidade;



    jogador.y += jogador.velocidadeY;



    // colisão com chão


    if(
        jogador.y + jogador.altura >= chao.y
    ){


        jogador.y =
        chao.y - jogador.altura;



        jogador.velocidadeY = 0;



        jogador.noChao = true;


    }



}



// ==================================
// DESENHAR JOGADOR
// ==================================

function desenharJogador(){


    ctx.fillStyle = "blue";


    ctx.fillRect(

        jogador.x,

        jogador.y,

        jogador.largura,

        jogador.altura

    );


}



// ==================================
// DESENHAR CENÁRIO
// ==================================

function desenharCenario(){


    // fundo


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );



    // chão


    ctx.fillStyle="green";


    ctx.fillRect(

        chao.x,

        chao.y,

        chao.largura,

        chao.altura

    );



}



// ==================================
// LOOP PRINCIPAL
// ==================================

function loop(){



    if(!jogoAtivo)
        return;



    desenharCenario();


    atualizarJogador();


    desenharJogador();



    requestAnimationFrame(loop);


}



// ==================================
// TEMPO
// ==================================

setInterval(()=>{


    if(jogoAtivo){


        tempo++;


        tempoHTML.textContent = tempo;


    }


},1000);



// ==================================
// REINICIAR
// ==================================

botaoReiniciar.addEventListener(

"click",

()=>{


    location.reload();


}

);



// COMEÇAR

loop();

// ==================================
// PARTE 2 - OBSTÁCULOS E COLISÃO
// ==================================


// Lista de obstáculos

let obstaculos = [];


// Velocidade inicial

let velocidadeObstaculo = 5;



// ==================================
// CRIAR OBSTÁCULO
// ==================================

function criarObstaculo(){


    if(!jogoAtivo)
        return;



    const obstaculo = {


        x: canvas.width,


        y: 410,


        largura:40,


        altura:40



    };



    obstaculos.push(obstaculo);



}



// Criar obstáculo a cada tempo

let intervaloObstaculo = setInterval(()=>{


    criarObstaculo();



},2000);



// ==================================
// ATUALIZAR OBSTÁCULOS
// ==================================

function atualizarObstaculos(){



    obstaculos.forEach((obstaculo)=>{


        obstaculo.x -= velocidadeObstaculo;



    });



    // remover obstáculos fora da tela


    obstaculos = obstaculos.filter((obstaculo)=>{


        return obstaculo.x + obstaculo.largura > 0;


    });



}



// ==================================
// DESENHAR OBSTÁCULOS
// ==================================

function desenharObstaculos(){



    ctx.fillStyle="red";



    obstaculos.forEach((obstaculo)=>{


        ctx.fillRect(

            obstaculo.x,

            obstaculo.y,

            obstaculo.largura,

            obstaculo.altura

        );



    });



}



// ==================================
// COLISÃO
// ==================================

function verificarColisao(){



    obstaculos.forEach((obstaculo)=>{


        if(

            jogador.x < obstaculo.x + obstaculo.largura &&

            jogador.x + jogador.largura > obstaculo.x &&

            jogador.y < obstaculo.y + obstaculo.altura &&

            jogador.y + jogador.altura > obstaculo.y

        ){


            finalizarJogo();



        }



    });



}



// ==================================
// PONTUAÇÃO
// ==================================

function atualizarPontuacao(){



    pontuacao++;


    pontuacaoHTML.textContent = pontuacao;



}



// A cada segundo ganha ponto

setInterval(()=>{


    if(jogoAtivo){


        atualizarPontuacao();



    }


},1000);



// ==================================
// AUMENTAR DIFICULDADE
// ==================================

setInterval(()=>{


    if(jogoAtivo){



        velocidadeObstaculo += 0.5;



    }



},10000);

// ==================================
// PARTE 3 - FINALIZAÇÃO DO JOGO
// ==================================


// ==================================
// FINALIZAR JOGO
// ==================================

function finalizarJogo(){


    jogoAtivo = false;


    clearInterval(intervaloObstaculo);



    alert(

        "Game Over!\n" +

        "Pontuação: " +

        pontuacao

    );


}



// ==================================
// ALTERAR LOOP PRINCIPAL
// ==================================


// Guardar o loop antigo

function atualizarJogo(){



    if(!jogoAtivo)

        return;



    desenharCenario();



    atualizarJogador();



    atualizarObstaculos();



    verificarColisao();



    desenharJogador();



    desenharObstaculos();



    requestAnimationFrame(atualizarJogo);



}



// ==================================
// REINICIAR JOGO
// ==================================

function reiniciarJogo(){



    jogador.x = 100;

    jogador.y = 350;


    jogador.velocidadeY = 0;



    obstaculos = [];



    pontuacao = 0;


    tempo = 0;



    velocidadeObstaculo = 5;



    pontuacaoHTML.textContent = 0;


    tempoHTML.textContent = 0;



    jogoAtivo = true;



    atualizarJogo();



}



// Alterar botão

botaoReiniciar.onclick = reiniciarJogo;



// ==================================
// INICIAR JOGO FINAL
// ==================================


// Impede o loop antigo

jogoAtivo = true;


atualizarJogo();