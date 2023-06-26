import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const postgreSqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

const pool = new Pool({
  user: postgreSqlConfig.user,
  password: postgreSqlConfig.password,
  host: postgreSqlConfig.host,
  port: parseInt(postgreSqlConfig.port ?? "5432", 10), // Asigna 5432 como valor predeterminado si el puerto no está definido
  database: postgreSqlConfig.database,
});

export default pool;
