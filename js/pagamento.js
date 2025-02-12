import { fetchBrinquedo, criarAgendamento } from './api/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const dataReserva = urlParams.get('dataReserva');
  const horaInicio = urlParams.get('horaInicio');
  const horaFim = urlParams.get('horaFim');
  const idBrinquedo = urlParams.get('idBrinquedo');
  const precoTotal = urlParams.get('precoTotal');

  const dataReservaFormatada = new Date(dataReserva).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  document.getElementById('data-reserva').innerText = `Data da Reserva: ${dataReservaFormatada}`;
  document.getElementById('hora-reserva').innerText = `Hora da Reserva: ${horaInicio}h - ${horaFim}h`;
  document.getElementById('preco-item').innerText = precoTotal;

  try {
    const brinquedo = await fetchBrinquedo(idBrinquedo);
    document.querySelector('.item-carrinho img').src = brinquedo.imagem;
    document.getElementById('titulo-item').innerText = brinquedo.nome;
    document.getElementById('subtitulo-item').innerText = brinquedo.dono;
  } catch (error) {
    alert('Erro ao carregar informações do brinquedo.');
  }

  document.getElementById('botaoconfirmar').addEventListener('click', async () => {
    const endereco = "Rua Exemplo, 123, Bairro, Cidade, CEP 12345-678"; // Você pode obter isso de outro lugar, se necessário

    const agendamento = {
      dataReserva,
      endereco,
      hora_fim: `${horaFim}:00`,
      hora_inicio: `${horaInicio}:00`,
      idBrinquedo,
    };

    try {
      await criarAgendamento(agendamento);
      document.getElementById('successMessage').style.display = 'block';
      setTimeout(() => {
        // Redirecionar após sucesso
        window.location.href = "/html/main-locatario.html";
      }, 2000);
    } catch (error) {
      alert('Erro ao confirmar o agendamento');
    }
  });
});