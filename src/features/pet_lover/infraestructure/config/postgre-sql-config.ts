import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const postgreSqlConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
};

const pool = new Pool({
  user: postgreSqlConfig.user,
  password: postgreSqlConfig.password,
  host: postgreSqlConfig.host,
  port: parseInt(postgreSqlConfig.port ?? "5432", 10), // Asigna 5432 como valor predeterminado si el puerto no está definido
  database: postgreSqlConfig.database,
});

export default pool;
