import { fetchAgendamentos, cancelarPedido } from './api/api.js';
const role = localStorage.getItem("role");
if (role == 'LOCATARIO') {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const agendamentos = await fetchAgendamentos();
            const listPedidos = document.querySelector('.list-pedidos');
            listPedidos.innerHTML = ''; // Limpar conteúdo existente

            agendamentos.forEach(agendamento => {
                const pedidoDiv = document.createElement('div');
                pedidoDiv.classList.add('pedido');


                const img = document.createElement('img');
                img.src = agendamento.imagem; // Ajuste a imagem conforme necessário
                img.alt = agendamento.nomeBrinquedo;
                pedidoDiv.appendChild(img);
                const detalhesDiv = document.createElement('div');
                detalhesDiv.classList.add('detalhes');
                detalhesDiv.innerHTML = `
              <h3>${agendamento.nomeBrinquedo}<div id="num1">Nº: ${agendamento.idAgendamento}</div></h3>
              <p>Data da Reserva: ${new Date(agendamento.dataReserva).toLocaleDateString('pt-BR')} - ${agendamento.horaInicio}h - ${agendamento.horaFim}h</p>
              <p>Status: ${agendamento.status}</p>
            `;
                pedidoDiv.appendChild(detalhesDiv);

                const acoesDiv = document.createElement('div');
                acoesDiv.classList.add('acoes');
                if (agendamento.status === 'AGUARDANDO_PAGAMENTO') {
                    const btnAndamento = document.createElement('button');
                    btnAndamento.classList.add('btn-andamento');
                    btnAndamento.textContent = 'Processando';
                    acoesDiv.appendChild(btnAndamento);
                } else if (agendamento.status === 'FINALIZADO') {
                    const pFinalizado = document.createElement('p');
                    pFinalizado.textContent = 'PEDIDO FINALIZADO';
                    acoesDiv.appendChild(pFinalizado);
                    const btnNovo = document.createElement('button');
                    btnNovo.id = 'btn-novo';
                    btnNovo.textContent = 'PEDIR NOV';
                    acoesDiv.appendChild(btnNovo);
                } else if (agendamento.status === 'CONFIRMADO') {
                    const pConfirmado = document.createElement('p');
                    pConfirmado.textContent = 'PEDIDO CONFIRMADO';
                    acoesDiv.appendChild(pConfirmado);
                    const btnCancelar = document.createElement('button');
                    btnCancelar.textContent = 'Cancelar Pedido';
                    btnCancelar.style.marginLeft = '10px';
                    btnCancelar.addEventListener('click', () => cancelarPedido(agendamento.idAgendamento));

                    acoesDiv.appendChild(btnCancelar);
                }
                pedidoDiv.appendChild(acoesDiv);

                listPedidos.appendChild(pedidoDiv);
            });
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        }
    });

} //aqui deveria haver uma implementação dos pedidos gerais do locador, mas a tela foi separada para gestão  do locador. - rick