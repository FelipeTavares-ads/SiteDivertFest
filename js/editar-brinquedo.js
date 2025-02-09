
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("bearerToken");
    if (!token) {
        window.location.href = "/html/login.html";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idBrinquedo = urlParams.get('id');
    if (idBrinquedo) {
        console.log(idBrinquedo);
    } else {
        console.log("Parâmetro 'id' não encontrado");
    }

    // Função para preencher os campos do formulário com os dados do brinquedo
    function preencherCampos(brinquedo) {
        document.getElementById("product-name").value = brinquedo.nome;
        document.getElementById("category").value = brinquedo.categoria;
        document.getElementById("description").value = brinquedo.descricao;
        document.getElementById("price").value = brinquedo.precoPorHora;
    }

    // Carregar as informações do brinquedo a partir do ID
    fetch(`http://localhost:8080/divertfest/api/v1/locador/brinquedos/${idBrinquedo}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na resposta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            preencherCampos(data);
        })
        .catch(error => {
            console.error("Erro ao carregar o brinquedo:", error);
        });

    // Evento para enviar as mudanças para o backend
    document.getElementById("form-editar-brinquedo").addEventListener("submit", function (event) {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const idBrinquedo = urlParams.get('id');


        const nome = document.getElementById("product-name").value;
        const descricao = document.getElementById("description").value;
        const categoria = document.getElementById("category").value;
        const precoPorHora = parseFloat(document.getElementById("price").value);
        const imagem = ""; // Se necessário, adicione um campo de imagem

        const updatedBrinquedo = {
            nome,
            descricao,
            categoria,
            precoPorHora,
            imagem
        };

        fetch(`http://localhost:8080/divertfest/api/v1/locador/brinquedos/${idBrinquedo}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedBrinquedo)
        })
            .then(response => {
                if (response.status == 204) {
                    alert('Brinquedo atualizado com sucesso!');
                    window.location.href = '/html/gestao.html'; // Redireciona para a tela de gestão
                }

            });
    });
});