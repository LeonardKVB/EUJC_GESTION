import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || 'eujc_db';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'Leon0220';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432');

console.log(`📡 Tentative de connexion à PostgreSQL: ${dbUser}@${dbHost}:${dbPort}/${dbName}`);

const sequelize = new Sequelize(
  "eujc_db",
  "postgres",
  "Leon0220",
  {
    host: "localhost",
    //port: dbPort,
    dialect: 'postgres',
    //logging: false,
   
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

export default sequelize;
