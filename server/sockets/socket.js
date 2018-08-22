const { io } = require('../index');
const { Usuario } = require('../models/usuario');

const usuario = new Usuario();

io.on('connect', (cliente) => {
  cliente.on('entrarChat', (datos, callback) => {
    if (!datos.nombre) {
      return callback({
        error: true,
        mensaje: 'El nombre es necesario',
      });
    }

    const personas = usuario.agregarPersona(cliente.id, datos.nombre);

    cliente.broadcast.emit('listarPersonas', usuario.obtenerPersonas());

    return callback(personas);
  });

  cliente.on('disconnect', () => {
    const personaBorrada = usuario.borrarPersona(cliente.id);

    cliente.broadcast.emit('crearMensaje', { usuario: 'Administrador', mensaje: `${personaBorrada.nombre} abandonó el chat` });
    cliente.broadcast.emit('listarPersonas', usuario.obtenerPersonas());
  });
});
