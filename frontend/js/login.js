const login = document.getElementById("login");
const cadastro = document.getElementById("cadastro");

const mostrarCadastro = document.getElementById("mostrarCadastro");
const mostrarLogin = document.getElementById("mostrarLogin");

const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");

// =============================
// ALTERNAR TELAS
// =============================

mostrarCadastro.addEventListener("click", function(e){

    e.preventDefault();

    login.style.display = "none";
    cadastro.style.display = "block";

});

mostrarLogin.addEventListener("click", function(e){

    e.preventDefault();

    cadastro.style.display = "none";
    login.style.display = "block";

});

// =============================
// PEGAR USUÁRIOS
// =============================

function obterUsuarios(){

    const usuarios = localStorage.getItem("usuarios");

    if(usuarios){

        return JSON.parse(usuarios);

    }

    return [];

}

// =============================
// SALVAR USUÁRIOS
// =============================

function salvarUsuarios(lista){

    localStorage.setItem("usuarios", JSON.stringify(lista));

}

// =============================
// CADASTRO
// =============================

cadastroForm.addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value;

    const email = document.getElementById("cadastroEmail").value;

    const senha = document.getElementById("cadastroSenha").value;

    const confirmar = document.getElementById("confirmarSenha").value;

    if(senha != confirmar){

        alert("As senhas são diferentes.");

        return;

    }

    const usuarios = obterUsuarios();

    const existe = usuarios.find(usuario => usuario.email === email);

    if(existe){

        alert("Este e-mail já está cadastrado.");

        return;

    }

    usuarios.push({

        nome,
        email,
        senha

    });

    salvarUsuarios(usuarios);

    alert("Cadastro realizado com sucesso!");

    cadastroForm.reset();

    cadastro.style.display = "none";
    login.style.display = "block";

});

// =============================
// LOGIN
// =============================

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;

    const senha = document.getElementById("loginSenha").value;

    const usuarios = obterUsuarios();

    const usuario = usuarios.find(user => {

        return user.email === email &&
               user.senha === senha;

    });

    if(!usuario){

        alert("Email ou senha incorretos.");

        return;

    }

    localStorage.setItem(

        "usuarioLogado",

        JSON.stringify(usuario)

    );

    window.location.href = "home.html";

});