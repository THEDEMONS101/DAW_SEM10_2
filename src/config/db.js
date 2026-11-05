// src/config/db.js
// IA: conexión con mysql2/promise y pooling → Solución manual:
//      se usa pool para reutilizar conexiones y execute() con placeholders (?) para evitar inyección SQL.
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "db_lab10",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

// Verificación al arranque
(async () => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    if (rows[0].ok === 1) console.log("✔ Conectado a MySQL");
  } catch (err) {
    console.error("✖ Error de conexión a MySQL:", err.message);
  }
})();

export default pool;