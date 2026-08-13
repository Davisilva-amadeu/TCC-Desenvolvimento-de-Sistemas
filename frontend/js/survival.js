const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const pontuacaoHTML = document.getElementById("pontuacao");
const tempoHTML = document.getElementById("tempo");
const botaoReiniciar = document.getElementById("reiniciar");
let jogoAtivo = true;
let pontuacao = 0;
let tempo = 0;
const gravidade = 0.3;
const jogador = {
  x: 100,
  y: 350,
  largura: 40,
  altura: 40,
  velocidadeY: 0,
  forcaPulo: -12,
  noChao: false,
};

const chao = {
  x: 0,
  y: 450,
  largura: 900,
  altura: 50,
};

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && jogador.noChao) {
    jogador.velocidadeY = jogador.forcaPulo;
    jogador.noChao = false;
  }
});

function atualizarJogador() {
  jogador.velocidadeY += gravidade;
  jogador.y += jogador.velocidadeY;

  if (jogador.y + jogador.altura >= chao.y) {
    jogador.y = chao.y - jogador.altura;
    jogador.velocidadeY = 0;
    jogador.noChao = true;
  }
}

function desenharJogador() {
  ctx.fillStyle = "blue";

  ctx.fillRect(jogador.x, jogador.y, jogador.largura, jogador.altura);
}

function desenharCenario() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";

  ctx.fillRect(chao.x, chao.y, chao.largura, chao.altura);
}
function loop() {
  if (!jogoAtivo) return;

  desenharCenario();
  atualizarJogador();
  desenharJogador();
  requestAnimationFrame(loop);
}

setInterval(() => {
  if (jogoAtivo) {
    tempo++;
    tempoHTML.textContent = tempo;
  }
}, 1000);

botaoReiniciar.addEventListener("click", () => {
  location.reload();
});

loop();

let obstaculos = [];
let velocidadeObstaculo = 5;

function criarObstaculo() {
  if (!jogoAtivo) return;
  const obstaculo = {
    x: canvas.width,
    y: 410,
    largura: 40,
    altura: 40,
  };
  obstaculos.push(obstaculo);
}
let intervaloObstaculo = setInterval(() => {
  criarObstaculo();
}, 2000);

function atualizarObstaculos() {
  obstaculos.forEach((obstaculo) => {
    obstaculo.x -= velocidadeObstaculo;
  });

  obstaculos = obstaculos.filter((obstaculo) => {
    return obstaculo.x + obstaculo.largura > 0;
  });
}

function desenharObstaculos() {
  ctx.fillStyle = "red";
  obstaculos.forEach((obstaculo) => {
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
  });
}

function verificarColisao() {
  obstaculos.forEach((obstaculo) => {
    if (
      jogador.x < obstaculo.x + obstaculo.largura &&
      jogador.x + jogador.largura > obstaculo.x &&
      jogador.y < obstaculo.y + obstaculo.altura &&
      jogador.y + jogador.altura > obstaculo.y
    ) {
      finalizarJogo();
    }
  });
}

function atualizarPontuacao() {
  pontuacao++;
  pontuacaoHTML.textContent = pontuacao;
}

setInterval(() => {
  if (jogoAtivo) {
    atualizarPontuacao();
  }
}, 1000);

setInterval(() => {
  if (jogoAtivo) {
    velocidadeObstaculo += 0.5;
  }
}, 10000);

function finalizarJogo() {
  jogoAtivo = false;
  clearInterval(intervaloObstaculo);
  alert("Game Over!\n" + "Pontuação: " + pontuacao);
}

function atualizarJogo() {
  if (!jogoAtivo) return;

  desenharCenario();
  atualizarJogador();
  atualizarObstaculos();
  verificarColisao();
  desenharJogador();
  desenharObstaculos();
  requestAnimationFrame(atualizarJogo);
}


function reiniciarJogo() {
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

botaoReiniciar.onclick = reiniciarJogo;
jogoAtivo = true;

atualizarJogo();