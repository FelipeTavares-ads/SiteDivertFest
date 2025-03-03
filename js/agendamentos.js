import { fetchBrinquedo } from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idBrinquedo = urlParams.get('idbrinquedo');
  
  if (!idBrinquedo) {
    alert("ID do brinquedo não fornecido.");
    return;
  }

  const brinquedo = await fetchBrinquedo(idBrinquedo);

  if (brinquedo) {
    document.querySelector('.item-img').src = brinquedo.imagem;
    document.querySelector('.title').innerText = brinquedo.nome;
    document.querySelector('.details').innerText = brinquedo.descricao;
    document.querySelector('.price').innerText = `R$${brinquedo.precoPorHora.toFixed(2).replace('.', ',')}`;
    calcularPrecoTotal();
  } else {
    alert("Não foi possível carregar as informações do brinquedo.");
  }
});

function calcularPrecoTotal() {
  const horaInicio = document.getElementById("hora-inicio").value;
  const horaFim = document.getElementById("hora-fim").value;
  const minutosInicio = converterParaMinutos(horaInicio);
  const minutosFim = converterParaMinutos(horaFim);

  if (minutosFim <= minutosInicio) {
    document.getElementById('precototal').innerText = 'R$0,00';
    return;
  }

  const duracaoHoras = (minutosFim - minutosInicio) / 60;
  const precoPorHora = parseFloat(document.querySelector('.price').innerText.replace('R$', '').replace(',', '.'));
  
  if (isNaN(precoPorHora)) {
    document.getElementById('precototal').innerText = 'R$0,00';
    return;
  }
  
  const precoTotal = duracaoHoras * precoPorHora;

  document.getElementById('precototal').innerText = `R$${precoTotal.toFixed(2).replace('.', ',')}`;
}

function converterParaMinutos(hora) {
  const [horas, minutos] = hora.split(":");
  return parseInt(horas) * 60 + parseInt(minutos);
}

document.getElementById("hora-inicio").addEventListener('change', calcularPrecoTotal);
document.getElementById("hora-fim").addEventListener('change', calcularPrecoTotal);

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