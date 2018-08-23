const socket = io();
const params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
  window.location = 'index.html';
  throw new Error('El nombre y la sala son necesarios');
}

const usuario = {
  nombre: params.get('nombre'),
  sala: params.get('sala'),
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

socket.on('mensajePrivado', (mensaje) => {
  console.log('Mensaje privado: ', mensaje);
});
