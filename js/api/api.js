const API_URL = "http://localhost:8080/divertfest/api/v1/";

export async function autenticarUsuario(email, senha) {
    try {
        const response = await fetch(API_URL + "public/autentica", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ usuario: email, senha: senha })
        });

        if (response.ok) {
            const dados = await response.json();
            const token = dados.token;
            const role = dados.role;

            localStorage.setItem("role", role);
            localStorage.setItem("bearerToken", token);

            if (role === "LOCATARIO" || role === "ADMIN") {
                window.location.href = "/html/main-locatario.html";
            } else if (role === "LOCADOR") {
                window.location.href = "/html/main-locador.html";
            }

        } else {
            alert("Falha ao autenticar. Verifique seus dados.");
        }
    } catch (error) {
        console.error("Erro ao autenticar:", error);
        alert("Erro de conexão.");
    }
}

export async function cadastraUsuario(nomeCompleto, cpf, celular, endereco, email, senha) {
    try {
        const response = await fetch(API_URL + "public/locatario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ documentoIdentificador: cpf, endereco: endereco, nome: nomeCompleto, telefone: celular, email: email, senha: senha })
        });
        if (response.ok) {
            autenticarUsuario(email, senha);
        } else {
            alert("falha ao realizar cadastro. Verifique os dados e tente novamente.");
            window.location.href = "/html/login.html"
        }
    } catch (error) {
        console.error("Erro ao cadastrar locatário: ", error);
        alert("Erro de conexão.");
    }
}

export async function cadastraLocador(razaoSocial, documento, nomeFantasia, celular, endereco, email, senha) {
    try {
        const response = await fetch(API_URL + "public/locador", {
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
            window.location.href = "/html/login.html"
        } else {
            alert("Verifique os dados e tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar locador: ", error);
        alert("Erro de conexão.");
    }
}

export async function cadastraBrinquedo(nomeProduto, categoria, descricao, preco, imagemUrl, token) {
    try {
        const response = await fetch("http://localhost:8080/divertfest/api/v1/locador/brinquedos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                nome: nomeProduto,
                categoria: categoria,
                descricao: descricao,
                precoPorHora: preco,
                imagem: imagemUrl
            })
        });

        const statusCode = response.status;
        console.log(`Código de status: ${statusCode}`);
        console.log(`Authorization: Bearer ${token}`);

        if (response.ok) {
            alert("Brinquedo cadastrado com sucesso!");
            limparFormulario();
        } else if (statusCode === 203) {
            alert("Usuário não autenticado, faça login novamente!");
            window.location.href = "/html/login.html"
        } else {
            alert("Falha ao cadastrar brinquedo. Verifique os dados e tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar brinquedo: ", error);
        alert("Erro de conexão.");
    }
}

function limparFormulario() {
    document.getElementById("product-name").value = ""; // Limpa o campo do nome
    document.getElementById("category").value = ""; // Limpa o campo da categoria
    document.getElementById("description").value = ""; // Limpa o campo da descrição
    document.getElementById("price").value = ""; // Limpa o campo do preço
    document.getElementById("upload-image").value = ""; // Limpa o campo de upload de imagem
}


export async function fetchBrinquedos(token) {
    try {
        const response = await fetch('http://localhost:8080/divertfest/api/v1/brinquedos', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'  // Inclui cookies na requisição
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar brinquedos');
        }

        const brinquedos = await response.json();
        return brinquedos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(API_URL + "public/upload/", {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Erro ao carregar a imagem');
    }

    // Tratar a resposta como texto simples
    const imageUrl = await response.text();
    return imageUrl; // A URL da imagem
}

export function fetchBrinquedosGestao(token) {
    return fetch("http://localhost:8080/divertfest/api/v1/locador/meus-brinquedos", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error fetching brinquedos:', error);
        throw error;
    });
}

export async function editaDadosBancarios(token, dados) {
    const response = await fetch(API_URL+"locador/dados-bancario", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(dados)
    });

    const statusCode = response.status;
    console.log(`Código de status: ${statusCode}`);

    if (response.ok) {
        alert("Atualização salva!");
    } else if (statusCode === 203) {
        alert("Usuário não autenticado, faça login novamente!");
        window.location.href = "/html/login.html"
    } else {
        alert("Falha ao salvar seus dados. Tente novamente mais tarde.");
    }
    
}