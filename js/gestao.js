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
  container.innerHTML = '';

  brinquedos.forEach(brinquedo => {
    const blocoHTML = `
            <div class="bloco">
              <div class="img">
                <img class="img-brinquedo" src="${brinquedo.imagem}" alt="${brinquedo.nome}">
              </div>
              
              <div class="dados">
                <div class="title">
                  <h4>${brinquedo.nome}</h4>
                  <a class="edit" href="editar-brinquedo.html?id=${brinquedo.idBrinquedo}">
                  <img src="/css/imagens/pencil-edit-button-svgrepo-com.svg" alt="editar"></a>
                  <a class="edit" href="#" data-id="${brinquedo.idBrinquedo}"> 
                  <img src="/css/imagens/trash-bin-2-svgrepo-com.svg" alt="delete"> </a>
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
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('brinquedosContainer');

  if (container) {
    container.addEventListener("click", function (event) {
      if (event.target.closest('.edit') && event.target.closest('.edit').hasAttribute('data-id')) {
        event.preventDefault(); 

        const idBrinquedo = event.target.closest('.edit').getAttribute('data-id');

        if (idBrinquedo) {
          fetch(`http://localhost:8080/divertfest/api/v1/locador/brinquedos/${idBrinquedo}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("bearerToken")}`, 
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (response.status === 204) {
              alert('Brinquedo excluído com sucesso!');
              window.location.reload();
            } else {
              return response.json();  
            }
          })
          .catch(error => {
            console.error('Erro ao excluir brinquedo:', error);
            alert('Ocorreu um erro ao tentar excluir o brinquedo.');
          });
        } else {
          alert("ID do brinquedo não encontrado!");
        }
      }
    });
  } else {
    console.error("Contêiner de brinquedos não encontrado.");
  }
});
