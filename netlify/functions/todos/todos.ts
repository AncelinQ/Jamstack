import { Handler } from '@netlify/functions'
import createConnectionPool, { sql } from "@databases/pg";
import dotenv from 'dotenv';
import tables from '@databases/pg-typed';
import DatabaseSchema, {serializeValue} from '../../../src/__generated__';
import Todos from '../../../src/__generated__/todos';

// read environment variables from .env file
dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME

} = process.env;

//GET /todos => récupère toutes les taches à faire
//GET /todos/:id => récupère une taches en particulier
//POST /todos => Créer une tache à faire
//PATCH /todos/:id => modifier une tache à faire en particulier
//PUT /todos/:id => remplacer une tache à faire en particulier
//Delete /todos/:id => supprimer une tache à faire en particulier

class MethodNotAllowedException extends Error{
  public httpMethod: string;
  constructor(httpMethod: string){
    super()
    this.httpMethod = httpMethod;

  }
}
class NotFoundException extends Error{}


export const handler: Handler = async (event, context) => {

  const db = createConnectionPool(
    `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  );

  const {todos} = tables<DatabaseSchema>({
  serializeValue,
});
try {
  

  let match: RegExpMatchArray;
  let result: Todos | Todos[];
  let statusCode = 200;

  if (event.path.match(/^\/\.netlify\/functions\/[^\/]+$/)){
    switch (event.httpMethod) {
      case 'GET':
        result = await todos(db).find().all();
        break;
      
      case 'POST':
    result = await todos(db).insert(JSON.parse(event.body));
    statusCode = 201;
      break;
      
      default:
        throw new MethodNotAllowedException(event.httpMethod);
    }
  }
  else if (match = event.path.match((/^\/\.netlify\/functions\/[^\/]+\/(\d+)$/))){
    const id = Number(match[1]);
    switch (event.httpMethod) {
      case 'GET':
        result = await todos(db).findOne({id});
        if (typeof result === null){
          statusCode = 404;
        }
        break;
      
      case 'PATCH':
      case 'PUT':
        result = await todos(db).update({id},JSON.parse(event.body));
        if (typeof result === 'undefined'){
          statusCode = 404;
        }
      break;

      case 'DELETE':
        result = await todos(db).findOne({id});
        if (typeof result === null){
          statusCode = 404;
        }else{

          await todos(db).delete({id});
          result = null;
          statusCode = 204;
        }
      break;

      default:
        throw new MethodNotAllowedException(event.httpMethod);
    }
  } else {
    throw new NotFoundException();

  }

  await db.dispose();

  return {
    statusCode: statusCode,
    body: result === null ? '' : JSON.stringify(result)
  }
  } catch (error) {
  if (error instanceof MethodNotAllowedException){
    return{
      statusCode: 405,
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify({error : `The method ${event.httpMethod} is not allowed`})
    }
  }else{
    return{
      statusCode: 404,
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify({error : `Page not found`})
    }
  }
}
}
