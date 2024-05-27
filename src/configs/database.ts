import { Sequelize } from 'sequelize-typescript';

/**
 *  Configures and establishes a connection with MySQL database
 */
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.HOST,
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

/**
 *  Attempts to connect to the configured database asynchronously
 *  Logs a success message or an error message with details
 *  Exits the process (exits the application) if connection fails
 */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database : ', error);
    process.exit(1);
  }
})();

export default sequelize;
