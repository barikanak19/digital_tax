const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

function splitSql(sqlText) {
  const statements = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let escape = false;

  for (let i = 0; i < sqlText.length; i++) {
    const char = sqlText[i];
    if (escape) {
      current += char;
      escape = false;
      continue;
    }
    if (char === '\\') {
      current += char;
      escape = true;
      continue;
    }
    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    }
    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    }
    if (char === ';' && !inSingleQuote && !inDoubleQuote) {
      statements.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    statements.push(current.trim());
  }
  return statements;
}

async function runSqlFile(connection, filePath) {
  console.log(`Reading SQL file: ${filePath}`);
  const sqlText = fs.readFileSync(filePath, 'utf8');
  const rawStatements = splitSql(sqlText);

  // Filter out comments, CREATE DATABASE, and USE statements
  const statements = rawStatements
    .map(stmt => {
      // Remove leading/trailing comments and whitespace
      return stmt
        .split('\n')
        .filter(line => !line.trim().startsWith('--'))
        .join('\n')
        .trim();
    })
    .filter(stmt => {
      if (!stmt) return false;
      const upper = stmt.toUpperCase();
      if (upper.startsWith('CREATE DATABASE') || upper.startsWith('USE ')) {
        console.log(`Skipping DB environment statement: "${stmt.split('\n')[0]}..."`);
        return false;
      }
      return true;
    });

  console.log(`Executing ${statements.length} SQL statements...`);
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await connection.query(stmt);
    } catch (err) {
      console.error(`Error executing statement #${i + 1}:`);
      console.error(stmt);
      console.error('Error Details:', err.message);
      throw err;
    }
  }
  console.log(`Successfully completed execution of: ${filePath}\n`);
}

async function main() {
  console.log('Connecting to production database...');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Database: ${process.env.DB_NAME}`);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: false, // We execute statement by statement
  });

  try {
    // 1. Run schema.sql
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    await runSqlFile(connection, schemaPath);

    // 2. Run seed.sql
    const seedPath = path.join(__dirname, '../database/seed.sql');
    await runSqlFile(connection, seedPath);

    console.log('Database initialization completed successfully!');
  } catch (err) {
    console.error('Database deployment failed:', err);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

main();
