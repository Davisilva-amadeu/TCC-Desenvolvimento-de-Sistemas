const survival = document.getElementById("btnSurvival");
const memoria = document.getElementById("btnMemoria");
const alvo = document.getElementById("btnAlvo");

const usuario = JSON.parse(

    localStorage.getItem("usuarioLogado")

);

// ================================
// VERIFICAR LOGIN
// ================================


// ================================
// MOSTRAR NOME
// ================================

const nomeUsuario = document.getElementById("nomeUsuario");

nomeUsuario.textContent = `Olá, ${usuario.nome}!`;

// ================================
// BOTÕES DOS JOGOS
// ================================

const survival = document.getElementById("btnSurvival");

const memoria = document.getElementById("btnMemoria");

const alvo = document.getElementById("btnAlvo");

// ================================
// ABRIR SURVIVAL
// ================================

survival.addEventListener("click", () => {

    window.location.href = "pages/survival.html";

});

// ================================
// ABRIR MEMÓRIA
// ================================

memoria.addEventListener("click", () => {

    window.location.href = "pages/memoria.html";

});

// ================================
// ABRIR ALVO
// ================================

alvo.addEventListener("click", () => {

    window.location.href = "pages/alvo.html";

});

// ================================
// LOGOUT
// ================================

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {

    localStorage.removeItem("usuarioLogado");

    window.location.href = "index.html";

});