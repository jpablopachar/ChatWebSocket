class Usuario {
  constructor() {
    this.personas = [];
  }

  agregarPersona(id, nombre) {
    const persona = { id, nombre };

    this.personas.push(persona);

    return this.personas;
  }

  obtenerPersona(id) {
    const persona = this.personas.filter(persona => persona.id === id)[0];

    return persona;
  }

  obtenerPersonas() {
    return this.personas;
  }

  obtenerPersonasPorSala(sala) {
    // ---
  }

  borrarPersona(id) {
    const personaBorrada = this.obtenerPersona(id);

    this.personas = this.personas.filter(persona => persona.id !== id);

    return personaBorrada;
  }
}

module.exports = { Usuario };
