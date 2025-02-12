import { fetchReservasLocador } from './api/api.js';

let todasReservas = [];

async function carregarReservas() {
    try {
        todasReservas = await fetchReservasLocador();
        exibirReservas(todasReservas);
    } catch (error) {
        console.error('Erro ao carregar reservas:', error);
    }
}

function exibirReservas(reservas) {
    const container = document.querySelector('.reservas-container');
    container.innerHTML = '';

    reservas.forEach(reserva => {
        const card = document.createElement('div');
        card.className = 'reservation-card';

        card.innerHTML = `
            <img src="${reserva.imagem}" alt="Imagem do Brinquedo">
            <div class="reservation-details">
                <p><strong>Pedido Nº:</strong> ${reserva.idAgendamento}</p>
                <p><strong>Nome de Usuário:</strong> ${reserva.nomeLocatario}</p>
                <p><strong>Endereço:</strong> ${reserva.endereco}</p>
                <p><strong>Contato:</strong> +557340028922</p>
                <p><strong>Data da Reserva:</strong> ${reserva.dataReserva} - ${reserva.horaInicio}h - ${reserva.horaFim}h</p>
                <div class="reservation-actions">
                    <button class="btn-finalize">${reserva.status}</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function filtrarReservas() {
    const statusFiltro = document.getElementById('statusFiltro').value;
    if (statusFiltro === 'TODOS') {
        exibirReservas(todasReservas);
    } else {
        const reservasFiltradas = todasReservas.filter(reserva => reserva.status === statusFiltro);
        exibirReservas(reservasFiltradas);
    }
}

document.addEventListener('DOMContentLoaded', carregarReservas);
document.getElementById('filtrar').addEventListener('click', filtrarReservas);