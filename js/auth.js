import { autenticarUsuario, cadastraUsuario, cadastraLocador, editaDadosBancarios } from './api/api.js';

export function logout() {
    localStorage.clear("bearerToken");
    localStorage.setItem("logado", false)   
    
    window.location.href = "/html/primeira-tela.html";
}

document.getElementById("form-login")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (email && senha) {
        console.log("entrou aqui");
        autenticarUsuario(email, senha);
    } else {
        alert("Preencha todos os campos.");
    }
});

document.getElementById("form-cadastro-locatario")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value.toString();
    const cpf = document.getElementById("cpf").value.toString();
    const celular = document.getElementById("celular").value.toString();
    const endereco = document.getElementById("endereco").value.toString();
    const email = document.getElementById("email").value.toString();
    const senha = document.getElementById("senha").value.toString();

    if (email && senha && nome && cpf && celular && endereco) {
        cadastraUsuario(nome, cpf, celular, endereco, email, senha);
    } else {
        alert("Preencha todos os campos.");
    }
});

document.getElementById("form-cadastro-locador")?.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("evento - submit locador");
    const nome = document.getElementById("nome").value.toString();
    const documento = document.getElementById("cpf").value.toString();
    const nomeFantasia = document.getElementById("nomefantasia").value.toString();
    const celular = document.getElementById("celular").value.toString();
    const endereco = document.getElementById("endereco").value.toString();
    const email = document.getElementById("email").value.toString();
    const senha = document.getElementById("senha").value.toString();
    const check = document.getElementById("checkIdade").checked;

    if (check) {
        if (nome && documento && nomeFantasia && celular && endereco && email && senha) {
            cadastraLocador(nome, documento, nomeFantasia, celular, endereco, email, senha);
        } else {
            alert("Preencha todos os campos.");
        }
    } else {
        alert("Você precisa concordar com os termos de uso para continuar.");
    }
});

//mandar seus dadoss bancarios
document.getElementById("btnSalvar")?.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Clicou no botão Salvar!");

    const token = localStorage.getItem("bearerToken"); // O nome salvo no localStorage
    const nomeDoTitular = document.getElementById("nomeTitular").value;
    const chavePix = document.getElementById("pix").value;

    const dados = {
        dadosBancarios: { nomeDoTitular, chavePix }
    };

    if (nomeDoTitular && chavePix) {
        editaDadosBancarios(token, dados);
    } else {
        alert("Preencha todos os campos.");
    }

});

document.getElementById("botaoconfirmar").addEventListener("click", function () {
    let button = this;
    let modal = document.getElementById("successMessage");

    // Muda estado para carregando
    button.textContent = "Processando...";
    button.classList.add("loading");

    setTimeout(() => {
        // Altera para sucesso
        button.innerHTML = "Pedido Confirmado ✅";
        button.classList.remove("loading");
        button.classList.add("success");

        // Exibe modal de sucesso
        modal.style.display = "block";

        setTimeout(() => {
            modal.style.display = "none"; // Esconde modal
            window.location.href = "pedidos.html"; // Redireciona para pedidos.html
        }, 2000); // Tempo total antes do redirecionamento (2s)
    }, 2000); // Tempo do processamento fake (2s)
});