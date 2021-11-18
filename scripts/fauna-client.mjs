import faunadb from 'faunadb';
import dotenv from 'dotenv';

// Read environment variables from .env file
dotenv.config();

// Acquire the secret and optional endpoint from environment variables
const { FAUNA_SECRET, FAUNA_DOMAIN, FAUNA_PORT, FAUNA_HTTPS } = process.env;

if (typeof FAUNA_SECRET === 'undefined')
{
  throw new Error('Environnement variable is missing');
}

const FaunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
  domain: FAUNA_DOMAIN || 'db.eu.fauna.com',
  port: Number(FAUNA_PORT) || 443,
  scheme: FAUNA_HTTPS === 'false' ? 'http' : 'https'
});

export default FaunaClient;