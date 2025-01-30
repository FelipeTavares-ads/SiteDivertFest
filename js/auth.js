const API_URL = "http://localhost:8080/divertfest/api/v1/public/";

async function autenticarUsuario(email, senha) {
    try {
        const response = await fetch(API_URL+"autentica", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario: email, senha: senha })
        });

        if (response.ok) {
            const dados = await response.json();
            const token = dados.token;
            const role = dados.role;

            localStorage.setItem("role", role);
            localStorage.setItem("bearerToken", token);

            if(role == "LOCATARIO" || role == "ADMIN"){
                window.location.href = "/html/main-locatario.html";
            } else if(role == "LOCADOR"){
                window.location.href = "/html/main-locador.html"
            }
            
        } else {
            alert("Falha ao autenticar. Verifique seus dados.");
        }
    } catch (error) {
        console.error("Erro ao autenticar:", error);
        alert("Erro de conexão.");
    }
}

function logout() {
    // Remove o token do localStorage
    localStorage.removeItem("bearerToken");

    // Redireciona para a página de login
    window.location.href = "/html/primeira-tela.html";
}

async function cadastraUsuario(nomeCompleto, cpf, celular, endereco, email, senha){
    try{
        const response = await fetch(API_URL+"locatario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        body: JSON.stringify({documentoIdentificador: cpf, endereco: endereco, nome: nomeCompleto, telefone: celular, email: email, senha: senha})
    });  
    if(response.ok){
        autenticarUsuario(email, senha);
        }else{
        alert("falha ao realizar cadastro. Verifique os dados e tente novamente.");
        } 
    } catch (error) {
        console.error("Erro ao cadastrar locatário: ", error);
        alert("Erro de conexão.");
    }
    

}

async function cadastraLocador(razaoSocial, documento, nomeFantasia, celular, endereco, email, senha) {
    try {
        const response = await fetch(API_URL + "locador", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                razaoSocial: razaoSocial,
                documentoIdentificador: documento,
                endereco: endereco,
                telefone: celular,
                email: email,
                senha: senha,
                nome: nomeFantasia
            })
        });

        const statusCode = response.status;
        console.log(`Código de status: ${statusCode}`);

        if (statusCode === 201) {
            autenticarUsuario(email, senha);
        } else if (statusCode === 409) {
            alert("Falha ao realizar cadastro. O CPF já está cadastrado.");
        } else {
            alert("Falha ao realizar cadastro. Verifique os dados e tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar locador: ", error);
        alert("Erro de conexão.");
    }
}


document.getElementById("form-login")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (email && senha) {
        console.log("entrou aqui")
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
    
    if(email && senha && nome && cpf && celular && endereco){
        cadastraUsuario(nome, cpf, celular, endereco, email, senha)
    } else {
        alert("Preencha todos os campos.")
    }
})

document.getElementById("form-cadastro-locador")?.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("evento - submit locador")
    const nome = document.getElementById("nome").value.toString();  
    const documento = document.getElementById("cpf").value.toString();   
    const nomeFantasia = document.getElementById("nomefantasia").value.toString(); 
    const celular = document.getElementById("celular").value.toString(); 
    const endereco = document.getElementById("endereco").value.toString(); 
    const email = document.getElementById("email").value.toString();   
    const senha = document.getElementById("senha").value.toString();
    const check = document.getElementById("checkIdade").checked;
    
    if(check){
        if(nome && documento && nomeFantasia && celular && endereco && email && senha){
            cadastraLocador(nome, documento, nomeFantasia, celular, endereco, email, senha)
        } else{
            alert("Preencha todos os campos.")
        }
    } else{
        alert("Você precisa concordar com os termos de uso para continuar.")
    }
})



