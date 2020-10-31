// Comando para establecer la conexión
let socket = io();

let label = document.getElementById('lblNuevoTicket');

socket.on('connect', function () {
    console.log("Conectado al servidor")
});

socket.on('disconnect', function () {
    console.log("Desconectado del servidor")
});

socket.on('estadoActual', function(ticket){
    label.textContent = ticket.actual;
});

document.querySelector('button').addEventListener('click', () => {
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.textContent = siguienteTicket;
    });
});