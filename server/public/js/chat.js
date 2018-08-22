const socket = io();
const params = new URLSearchParams(window.location.search);

if (!params.has('nombre')) {
  window.location = 'index.html';
  throw new Error('El nombre es necesario');
}

const usuario = {
  nombre: params.get('nombre'),
};

socket.on('connect', () => {
  console.log('Conectado al servidor');

  socket.emit('entrarChat', usuario, (resp) => {
    console.log('Usuarios conectados', resp);
  });
});

socket.on('disconnect', () => {
  console.log('Perdimos conexión con el servidor');
});

socket.on('crearMensaje', (mensaje) => {
  console.log('Servidor: ', mensaje);
});

socket.on('listarPersonas', (personas) => {
  console.log(personas);
});
