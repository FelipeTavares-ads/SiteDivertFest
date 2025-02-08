import { fetchBrinquedosGestao } from './api/api.js';
const token = localStorage.getItem("bearerToken");

document.addEventListener('DOMContentLoaded', (event) => {
  fetchBrinquedosGestao(token)
    .then(data => {
      renderBrinquedos(data);
    })
    .catch(error => {
      console.error('Error fetching brinquedos:', error);
    });
});

function renderBrinquedos(brinquedos) {
  const container = document.getElementById('brinquedosContainer');
  container.innerHTML = '';  // Limpa o conteúdo existente

  brinquedos.forEach(brinquedo => {
    const blocoHTML = `
            <div class="bloco">
              <div class="img">
                <img class="img-brinquedo" src="${brinquedo.imagem}" alt="${brinquedo.nome}">
              </div>
              
              <div class="dados">
                <div class="title">
                  <h4>${brinquedo.nome}</h4>
                  <!-- Alteração do link para incluir o ID do brinquedo -->
                  <a class="edit" href="editar-brinquedo.html?id=${brinquedo.idBrinquedo}">
                  <img src="/css/imagens/pencil-edit-button-svgrepo-com.svg" alt="editar"></a>
                  <a class="edit" href=""> <img src="/css/imagens/trash-bin-2-svgrepo-com.svg" alt="delete"> </a>
                </div>
                
                <div class="specs">
                  <p><strong>Descrição: </strong>${brinquedo.descricao}</p>
                  <p><strong>Preço: </strong>${brinquedo.precoPorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                  <p><strong>Código: </strong>${brinquedo.idBrinquedo}</p>
                </div>
                
                <div class="status">
                  <p>
                    <strong>Status:</strong> ${brinquedo.status}
                    <img src="/css/imagens/${brinquedo.status === 'DISPONÍVEL'}>
                  </p>
                </div>
              </div>
            </div>
        `;

    container.insertAdjacentHTML('beforeend', blocoHTML);
  });
}

