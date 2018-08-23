const { io } = require('../index');
const { Usuario } = require('../models/usuario');
const { crearMensaje } = require('../utils/utilidadesSocket');

const usuario = new Usuario();

io.on('connect', (cliente) => {
  cliente.on('entrarChat', (datos, callback) => {
    if (!datos.nombre || !datos.sala) {
      return callback({
        error: true,
        mensaje: 'El nombre/sala es necesario',
      });
    }

    cliente.join(datos.sala);

    const personas = usuario.agregarPersona(cliente.id, datos.nombre, datos.sala);

    cliente.broadcast.to(datos.sala).emit('listarPersonas', usuario.obtenerPersonasPorSala(datos.sala));

    return callback(personas);
  });

  cliente.on('crearMensaje', (datos) => {
    const persona = usuario.obtenerPersona(cliente.id);
    const mensaje = crearMensaje(persona.nombre, datos.mensaje);

    cliente.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
  });

  cliente.on('disconnect', () => {
    const personaBorrada = usuario.borrarPersona(cliente.id);

    cliente.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
    cliente.broadcast.to(personaBorrada.sala).emit('listarPersonas', usuario.obtenerPersonasPorSala());
  });

  cliente.on('mensajePrivado', (datos) => {
    const persona = usuario.obtenerPersona(cliente.id);

    cliente.broadcast.to(datos.para).emit('mensajePrivado', crearMensaje(persona.nombre, datos.mensaje));
  });
});
