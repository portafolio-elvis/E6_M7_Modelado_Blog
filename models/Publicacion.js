import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Definición del modelo Publicacion
// Este modelo representa una publicación en el blog
const Publicacion = sequelize.define('Publicacion', {
  // Atributos de la publicación
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Título de la publicación'
  },
  contenido: {
    type: DataTypes.TEXT, // TEXT permite textos más largos que STRING
    allowNull: false,
    comment: 'Contenido de la publicación'
  }
}, {
  // Opciones del modelo
  tableName: 'Publicaciones', // Nombre de la tabla en la base de datos
  timestamps: false // No agrega createdAt y updatedAt
});

export default Publicacion;
