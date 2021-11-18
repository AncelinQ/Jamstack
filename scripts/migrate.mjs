import createConnectionPool, { sql } from "@databases/pg";
import dotenv from 'dotenv';

// Read environment variables from .env file
dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

// This script migrates the database schema to the database server
const run = async () => {
  // Establish connection with database
  console.info('Connecting to database...');
  const db = createConnectionPool(
    `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  );

  // Send SQL query to database
  console.info('Migrating schema...')
  await db.query(sql.file('schema.sql'));

  // Terminate connection with database
  console.info('Releasing client...')
  await db.dispose();
}

// Run main process
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
