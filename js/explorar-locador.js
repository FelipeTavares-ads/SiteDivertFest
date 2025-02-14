import { fetchBrinquedos, buscarBrinquedoPorNome } from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem("bearerToken");
        const brinquedos = await fetchBrinquedos(token);
        renderizarBrinquedos(brinquedos);
    } catch (error) {
        alert('Não foi possível carregar os brinquedos.');
        console.log(error);
    }
});

function renderizarBrinquedos(brinquedos) {
    const carouselInner = document.querySelector('.carousel-inner');
    const produtosContainer = document.querySelector('.produtos');

    brinquedos.forEach((brinquedo, index) => {
        const precoFormatado = brinquedo.precoPorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // Adicionar brinquedo no carrossel
        const isActive = index === 0 ? 'active' : '';
        const carouselItem = `
            <div class="carousel-item ${isActive}">
                <div class="row justify-content-center">
                    <div class="col-md-5">
                        <div class="card">
                            <div class="card-body">
                                <img class="img-card" src="${brinquedo.imagem}" alt="${brinquedo.nome}">
                                <h5 class="card-title">${brinquedo.nome}</h5>
                                <div class="info">
                                    <p class="card-text">${brinquedo.dono}</p>
                                    <p class="card-price">${precoFormatado}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        carouselInner.insertAdjacentHTML('beforeend', carouselItem);

        // Adicionar brinquedo na lista de produtos
        const produtoItem = `
            <div class="bloquinho">
                <img class="img-bloquinho" src="${brinquedo.imagem}" alt="${brinquedo.nome}">
                <div class="dados-bloquinho">
                    <div class="títulos">
                        <h6>${brinquedo.nome}</h6>
                        <p>${brinquedo.dono}</p>
                    </div>
                    <div class="info-inferior">
                        <h5>${precoFormatado}</h5>
                    </div>
                </div>
            </div>
        `;
        produtosContainer.insertAdjacentHTML('beforeend', produtoItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    searchButton.addEventListener('click', async () => {
        const nome = searchBox.value.trim();
        if (nome) {
            try {
                const brinquedos = await buscarBrinquedoPorNome(nome);
                exibirBrinquedos(brinquedos);
            } catch (error) {
                console.error('Erro ao buscar brinquedo:', error);
                alert('Erro ao buscar brinquedo. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, insira um nome para buscar.');
        }
    });
});

function exibirBrinquedos(brinquedos) {
    const produtosContainer = document.querySelector('.produtos');
    produtosContainer.innerHTML = ''; // Limpa os resultados anteriores

    if (brinquedos.length === 0) {
        produtosContainer.innerHTML = '<p>Nenhum brinquedo encontrado.</p>';
        return;
    }

    brinquedos.forEach(brinquedo => {
        const precoFormatado = `R$${brinquedo.precoPorHora.toFixed(2)}`;
        const produtoItem = `
            <div class="bloquinho">
                <img class="img-bloquinho" src="${brinquedo.imagem}" alt="${brinquedo.nome}">
                <div class="dados-bloquinho">
                    <div class="títulos">
                        <h6>${brinquedo.nome}</h6>
                        <p>${brinquedo.dono}</p>
                    </div>
                    <div class="info-inferior">
                        <h5>${precoFormatado}</h5>
                    </div>
                </div>
            </div>
        `;
        produtosContainer.insertAdjacentHTML('beforeend', produtoItem);
    });
}