const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        console.log(siguiente);

        // Por si no vienen ningún callback
        if (!callback) return;
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback) => {
        // Por si no vienen ningún callback
        if (!callback) return;

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        actualizarPublica(client);

        callback(atenderTicket);

        // Actualizar/Notificar cambios en los Últimos 4

    });

});

function actualizarPublica(client) {
    // Se actualizan todos los clientes
    client.broadcast.emit('ultimosCuatro', {
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });
}