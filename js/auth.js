import { autenticarUsuario, cadastraUsuario, cadastraLocador, cadastraBrinquedo} from './api/api.js';

export function logout() {
    // Remove o token do localStorage
    localStorage.removeItem("bearerToken");

    // Redireciona para a página de login
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

//feat: adiciona brinquedo
document.getElementById("form-cadastro-brinquedo")?.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("evento - submit novo brinquedo");
    const nomeProduto = document.getElementById("product-name").value.toString();
    const categoria = document.getElementById("category").value.toString();
    const descricao = document.getElementById("description").value.toString();
    const preco = document.getElementById("price").value.toString();

    const token = localStorage.getItem("bearerToken"); // Obtém o token do localStorage

    if (nomeProduto && categoria && descricao && preco && token) {
        cadastraBrinquedo(nomeProduto, categoria, descricao, preco, token);
    } else {
        alert("Preencha todos os campos e verifique se você está logado.");
    }
});