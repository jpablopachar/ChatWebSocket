const { io } = require('../index');
const { Usuario } = require('../models/usuario');
const { crearMensaje } = require('../utils/utilidadesSocket');

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

  cliente.on('crearMensaje', (datos) => {
    const persona = usuario.obtenerPersona(cliente.id);
    const mensaje = crearMensaje(persona.nombre, datos.mensaje);

    cliente.broadcast.emit('crearMensaje', mensaje);
  });

  cliente.on('disconnect', () => {
    const personaBorrada = usuario.borrarPersona(cliente.id);

    cliente.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
    cliente.broadcast.emit('listarPersonas', usuario.obtenerPersonas());
  });

  cliente.on('mensajePrivado', (datos) => {
    const persona = usuario.obtenerPersona(cliente.id);

    cliente.broadcast.to(datos.para).emit('mensajePrivado', crearMensaje(persona.nombre, datos.mensaje));
  });
});
