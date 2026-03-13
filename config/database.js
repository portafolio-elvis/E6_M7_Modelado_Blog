import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false // Opcional: desactiva los logs de SQL
  }
);

// Función para probar la conexión
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos PostgreSQL');
  } catch (error) {
    console.error('Error al conectar:', error.message);
    process.exit(1);
  }
};

export default sequelize;
