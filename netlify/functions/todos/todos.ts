import { Handler } from '@netlify/functions'
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

export const handler: Handler = async (event, context) => {
  
  const db = createConnectionPool(
    `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  );

    //Send sql query to the db
 
  const results = await db.query(sql`
  SELECT * FROM todos`);


  await db.dispose();

  return {
    statusCode: 200,
    body: JSON.stringify(results),
  }
}
