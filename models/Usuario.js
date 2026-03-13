import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Definición del modelo Usuario
// Este modelo representa a un usuario en nuestro blog
const Usuario = sequelize.define('Usuario', {
  // Atributos del usuario
  nombre: {
    type: DataTypes.STRING,
    allowNull: false, // El nombre es obligatorio
    comment: 'Nombre del usuario'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // No pueden haber dos emails iguales
    comment: 'Email del usuario'
  }
}, {
  // Opciones del modelo
  tableName: 'Usuarios', // Nombre de la tabla en la base de datos
  timestamps: false // No agrega createdAt y updatedAt
});

export default Usuario;
