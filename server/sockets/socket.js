const { io } = require('../index');

io.on('connect', (cliente) => {
  // console.log('Nueva conexion', socket.id);
  console.log('Usuario conectado');

  cliente.emit('enviarMensaje', {
    usuario: 'Administrador',
    mensaje: 'Bienvenido a la aplicación',
  });

  cliente.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  cliente.on('enviarMensaje', (mensaje, callback) => {
    console.log(mensaje);

    cliente.broadcast.emit('enviarMensaje', mensaje);
    /* if (mensaje.usuario) {
      callback({respuesta: 'Todo salió bien'});
    } else {
      callback({respuesta: 'Todo salió mal!'});
    } */
  });
});
