const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('Perdimos conexión con el servidor');
});

socket.emit('enviarMensaje', {
  usuario: 'Juan Pablo',
  mensaje: 'Hola mundo',
}, (respuesta) => {
  console.log('Respuesta del servidor: ', respuesta);
});

socket.on('enviarMensaje', (mensaje) => {
  console.log('Servidor: ', mensaje);
});
