const survival = document.getElementById("btnSurvival");
const memoria = document.getElementById("btnMemoria");
const alvo = document.getElementById("btnAlvo");

const usuario = JSON.parse(

    localStorage.getItem("usuarioLogado")

);

const nomeUsuario = document.getElementById("nomeUsuario");

nomeUsuario.textContent = `Olá, ${usuario.nome}!`;


survival.addEventListener("click", () => {
    window.location.href = "pages/survival.html";
});

memoria.addEventListener("click", () => {
    window.location.href = "pages/memoria/video-11/index.html";
});

alvo.addEventListener("click", () => {
    window.location.href = "pages/alvo.html";
});

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
});