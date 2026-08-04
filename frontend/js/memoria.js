const cartasBase = [

    "🍎",
    "🍎",

    "🍌",
    "🍌",

    "🍇",
    "🍇",

    "🍓",
    "🍓",

    "🍉",
    "🍉",

    "🥝",
    "🥝"

];

const tabuleiro = document.getElementById("tabuleiro");
const contadorTentativas = document.getElementById("tentativas");
const cronometro = document.getElementById("cronometro");
const botaoReiniciar = document.getElementById("reiniciar");


let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let tentativas = 0;
let paresEncontrados = 0;
let tempo = 0;
let intervalo;

function iniciarJogo() {
    tabuleiro.innerHTML = "";

    primeiraCarta = null;
    
    segundaCarta = null;
    
    bloqueado = false;
    
    tentativas = 0;
    
    paresEncontrados = 0;
    
    tempo = 0;
    
    contadorTentativas.textContent = 0;
    
    cronometro.textContent = 0;
    
    clearInterval(intervalo);
    iniciarTempo();

    let cartas = [...cartasBase];

    cartas.sort(() => Math.random() - 0.5);

    cartas.forEach(valor => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.valor = valor;
        carta.textContent = "?";
        carta.addEventListener(
            "click",
            virarCarta
        );
        tabuleiro.appendChild(carta);
    });
}

function iniciarTempo() {
    intervalo = setInterval(() => {
        tempo++;
        cronometro.textContent = tempo;
    }, 1000);
}

function virarCarta() {
    if (bloqueado)
        return;
    if (this === primeiraCarta)
        return;
    this.textContent = this.dataset.valor;
    if (!primeiraCarta) {
        primeiraCarta = this;
        return;
    }
    segundaCarta = this;
    tentativas++;
    contadorTentativas.textContent = tentativas;
    verificarPar();
}

function verificarPar() {

    if (
        primeiraCarta.dataset.valor ===
        segundaCarta.dataset.valor
    ) {
        primeiraCarta.classList.add("correta");
        segundaCarta.classList.add("correta");
        paresEncontrados++;
        primeiraCarta = null;
        segundaCarta = null;
        verificarVitoria();
    }
    else {
        bloqueado = true;
        setTimeout(() => {
            primeiraCarta.textContent = "?";
            segundaCarta.textContent = "?";
            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;
        }, 1000);
    }
}

function verificarVitoria() {


    if (paresEncontrados === cartasBase.length / 2) {


        clearInterval(intervalo);
        setTimeout(() => {
            alert(
                "Parabéns! Você terminou em "
                + tentativas +
                " tentativas!"
            );
        }, 500);
    }
}


botaoReiniciar.addEventListener(
    "click",
    iniciarJogo
);

iniciarJogo();