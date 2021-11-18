import faunadb from 'faunadb';
import FaunaClient from './fauna-client.mjs';

const fql = faunadb.query;
// Acquire the secret and optional endpoint from environment variables


// This script migrates the database schema to the database server
const run = async () =>
{
  // Establish connection with database
  console.info('Connecting to database...');
  const client = FaunaClient;

  // Send SQL query to database
  console.info('Migrating schema...');
  await client.query(
    fql.If(
      fql.Exists(
        fql.Collection('Todos')
      ), null,
      fql.CreateCollection({ name: 'Todos' }))
  );

  await client.query(
    fql.If(
      fql.Exists(
        fql.Index('all_todos')
      ), null,
      fql.CreateIndex(({
        name: 'all_todos',
        source: fql.Collection('Todos')
      }))
    ));
  // Terminate connection with database
  console.info('Releasing client...');

};

// Run main process
run().catch((err) =>
{
  console.error(err);
  process.exit(1);
});
