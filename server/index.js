const express = require('express');
const morgan = require('morgan');
const socketIO = require('socket.io');
const path = require('path');

const app = express();

/*                  Ajustes                     */
// Use the default port or use port 3000
app.set('port', process.env.PORT || 3000);

/*                 Middleware                   */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// Convierte los datos que llegan a través de solicitudes HTTP al tipo JSON
app.use(express.json());

/*                    Rutas                      */

/*             Archivos Estáticos                */
app.use(express.static(path.join(__dirname, 'public')));

// Escucha en el puerto establecido
const servidor = app.listen(app.get('port'), () => {
  console.log('Servidor en puerto', app.get('port'));
});

/*                  Socket                      */
const io = socketIO(servidor);

/* io.on('connection', (socket) => {
  console.log('Nueva conexion', socket.id);

  socket.on('miMensaje', (datos) => {
    io.sockets.emit('miMensaje', datos);
  });

  socket.on('escribiendo', (datos) => {
    socket.broadcast.emit('escribiendo', datos);
  });
}); */
