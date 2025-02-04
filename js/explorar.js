import { fetchBrinquedos } from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {

    try {
        const token = localStorage.getItem("bearerToken");
        const brinquedos = await fetchBrinquedos(token);
        renderizarBrinquedos(brinquedos);
    } catch (error) {
        alert('Não foi possível carregar os brinquedos.');
        console.log(error)
    }
});

function renderizarBrinquedos(brinquedos) {
    const carouselInner = document.querySelector('.carousel-inner');
    const produtosContainer = document.querySelector('.produtos');

    brinquedos.forEach((brinquedo, index) => {
        const precoFormatado = brinquedo.precoPorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // Adicionar brinquedo no carrossel
        const isActive = index === 0 ? 'active' : '';
        brinquedo.precoPorHora.toString();
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
                                    <p class="card-price">${brinquedo.precoPorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                                <a class="detalhes" href="#">+ VER MAIS DETALHES</a>
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
                        <h5>${brinquedo.precoPorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                        <a href="#"><img class="prox" src="/css/imagens/right-arrow-circle-svgrepo-com.svg"></a>
                    </div>
                </div>
            </div>
        `;
        produtosContainer.insertAdjacentHTML('beforeend', produtoItem);
    });
}