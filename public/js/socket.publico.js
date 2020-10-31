// Comando para establecer la conexión
let socket = io();

let lblTicket1 = document.querySelector('#lblTicket1');
let lblTicket2 = document.querySelector('#lblTicket2');
let lblTicket3 = document.querySelector('#lblTicket3');
let lblTicket4 = document.querySelector('#lblTicket4');

let lblEscritorio2 = document.querySelector('#lblEscritorio2');
let lblEscritorio1 = document.querySelector('#lblEscritorio1');
let lblEscritorio3 = document.querySelector('#lblEscritorio3');
let lblEscritorio4 = document.querySelector('#lblEscritorio4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function () {
    console.log("Conectado al servidor")
});

socket.on('disconnect', function () {
    console.log("Ha perdido la conexión al servidor, verifique su Internet")
});

socket.on('estadoActual', function (data) {
    actualizaHTML(data.ultimosCuatro);
});

socket.on('ultimosCuatro', function (data) {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.muted = true;
    audio.play();
    audio.muted = false;
    actualizaHTML(data.ultimosCuatro);
});

function actualizaHTML(ultimosCuatro) {
    for (let i = 0; i <= ultimosCuatro.length - 1; i++) {
        lblTickets[i].textContent = `Ticket ${ultimosCuatro[i].numero}`;
        lblEscritorios[i].textContent = `Escritorio ${ultimosCuatro[i].escritorio}`;
    }
}