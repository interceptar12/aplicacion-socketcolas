// Comando para establecer la conexión
let socket = io();

// Clase para poder obtener los argumentos del URL (Los que son mandados con POST)
let searchParams = new URLSearchParams(window.location.search);

// searchParams.has('escritorio'), es para verificar si el argumento 'escritorio' existe en la URL
if (!searchParams.has('escritorio')) {
    // Si no viene, te manda al index
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

// Obteniendo el argumento 'escritorio'
let escritorio = searchParams.get('escritorio');
let label = document.querySelector('small');
document.querySelector('h1').textContent = `Escritorio ${escritorio}`;

document.querySelector('button').addEventListener('click', () => {
    socket.emit('atenderTicket', { escritorio: escritorio }, function (respuesta) {
        console.log(respuesta);
        if (respuesta === 'No hay tickets') {
            label.textContent = respuesta.numero;
            alert(respuesta);
            return;
        }
        label.textContent = `Ticket ${respuesta.numero}`;
    });
});