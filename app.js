import { testConnection } from './config/database.js';
import sequelize from './config/database.js';
import Usuario from './models/Usuario.js';
import Publicacion from './models/Publicacion.js';

// Relacion 1:N entre Usuario y Publicacion
Usuario.hasMany(Publicacion, {
  foreignKey: 'UsuarioId',
  onDelete: 'CASCADE'
});

Publicacion.belongsTo(Usuario, {
  foreignKey: 'UsuarioId'
});

const crearUsuario = async (nombre, email) => {
  const usuarioExistente = await Usuario.findOne({ where: { email } });

  if (usuarioExistente) {
    console.log('Usuario ya existe:', usuarioExistente.nombre);
    return usuarioExistente;
  }

  const nuevoUsuario = await Usuario.create({
    nombre: nombre,
    email: email
  });
  console.log('Usuario creado:', nuevoUsuario.nombre);
  return nuevoUsuario;
};

const crearPublicacion = async (usuarioId, titulo, contenido) => {
  const publicacionExistente = await Publicacion.findOne({ where: { titulo, UsuarioId: usuarioId } });

  if (publicacionExistente) {
    console.log('Publicacion ya existe:', publicacionExistente.titulo);
    return publicacionExistente;
  }

  const nuevaPublicacion = await Publicacion.create({
    titulo: titulo,
    contenido: contenido,
    UsuarioId: usuarioId
  });
  console.log('Publicacion creada:', nuevaPublicacion.titulo);
  return nuevaPublicacion;
};
const crearPublicacionDesdeUsuario = async (usuario, titulo, contenido) => {
  const publicacion = await usuario.createPublicacion({
    titulo: titulo,
    contenido: contenido
  });
  console.log('Publicacion creada desde usuario:', publicacion.titulo);
  return publicacion;
};
const obtenerUsuarioConPublicaciones = async (usuarioId) => {
  const usuario = await Usuario.findByPk(usuarioId, {
    include: Publicacion
  });
  return usuario;
};

const mostrarTodos = async () => {
  const usuarios = await Usuario.findAll({
    include: Publicacion
  });

  console.log('\nBLOG COMPLETO:');
  usuarios.forEach(usuario => {
    console.log(`\nUsuario: ${usuario.nombre} (${usuario.email})`);
    console.table(usuario.Publicacions.map(pub => ({
      titulo: pub.titulo,
      contenido: pub.contenido.substring(0, 50) + '...'
    })));
  });
};

const main = async () => {
  try {
    console.log('Conectando a la base de datos...');
    await testConnection();

    await sequelize.sync({ force: true });
    
    console.log('CREANDO USUARIOS Y PUBLICACIONES\n');
    
    const usuario1 = await crearUsuario('Carlos', 'carlos@gmail.com');
    
    await crearPublicacion(
      usuario1.id,
      'Mi primera publicación',
      'Este es el contenido de mi post, creado con Sequelize.'
    );
    
    await crearPublicacion(
      usuario1.id,
      'Aprendiendo a programar',
      'Hoy aprendí sobre relaciones en bases de datos. ¡Es muy interesante!'
    );
    
    const usuario2 = await crearUsuario('María', 'maria@gmail.com');
    
    await crearPublicacionDesdeUsuario(
      usuario2,
      'Bienvenido a mi blog',
      'Aquí compartiré mis pensamientos sobre tecnología y programación.'
    );
    
    console.log('\nVERIFICANDO RELACIONES\n');
    
    const usuarioConPubs = await obtenerUsuarioConPublicaciones(usuario1.id);
    console.log(`\nUsuario: ${usuarioConPubs.nombre}`);
    console.log(`Tiene ${usuarioConPubs.Publicacions.length} publicaciones:`);
    console.table(usuarioConPubs.Publicacions.map(pub => ({ titulo: pub.titulo })));
    
    await mostrarTodos();
    
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
