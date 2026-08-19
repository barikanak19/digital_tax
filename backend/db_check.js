const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [rows] = await connection.query('SHOW TABLES');
    console.log('Tables in database:', rows);
  } catch (err) {
    console.error('Error querying database:', err);
  } finally {
    await connection.end();
  }
}

main();
