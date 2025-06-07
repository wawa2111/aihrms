import { Sequelize } from 'sequelize';
import config from './index.js';
import logger from '../utils/logger.js';

// Initialize Sequelize with database credentials from config
const sequelize = new Sequelize(
  config.sql.database,
  config.sql.username,
  config.sql.password,
  {
    host: config.sql.host,
    port: config.sql.port,
    dialect: config.sql.dialect,
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('SQL database connection established successfully');
    return true;
  } catch (error) {
    logger.error('Unable to connect to SQL database:', error);
    return false;
  }
};

export { sequelize, testConnection };