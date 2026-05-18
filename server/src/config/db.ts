import { Sequelize } from 'sequelize';
import env from './env';

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Required for secure cloud DB providers like Aiven
      },
    },
  });
} else {
  const useSSL = env.DB_HOST !== 'localhost' && env.DB_HOST !== '127.0.0.1';
  sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: 'mysql',
    logging: env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: useSSL ? {
      ssl: {
        rejectUnauthorized: false,
      },
    } : undefined,
  });
}

export { sequelize };
export default sequelize;