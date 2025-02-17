import { editaDadosBancarios } from "./api/api.js";
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