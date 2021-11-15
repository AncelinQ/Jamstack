import createConnectionPool, { sql } from "@databases/pg";
import dotenv from 'dotenv';

// read environment variables from .env file
dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME

} = process.env;


// this script migrates the database schema to the db server

const run = async () =>
{
  console.info('connecting to database...');
  const db = createConnectionPool(
    `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  );

  //Send sql query to the db
  console.info('Migrating schema...');
  await db.query(sql.file('schema.sql'));

  console.info('Releasing client...');
  await db.dispose();
};

run().catch((err) =>
{
  console.error(err);
  process.exit(1);
});