import * as mongodb from 'mongodb';

import { applySchemaValidation } from './applySchemaValidation.js';
import { Product } from '../../models/product.js';
import { Session } from '../../models/session.js';
import { User } from '../../models/user.js';

// Hold references to collections
const collections: {
  products?: mongodb.Collection<Product>;
  sessions?: mongodb.Collection<Session>;
  users?: mongodb.Collection<User>;
} = {};


// Connecting to the database
export async function connectToDatabase(dbUri: string) {
  const client = new mongodb.MongoClient(dbUri);
  await client.connect(); // connect to MongoDB using the URI

  const db = client.db('productsAPI'); // create db instance, specify dbName
  await applySchemaValidation(db); // apply schema validation, creaate collections

  collections.products = db.collection<Product>('products'); // obtain reference to specific collections
  collections.sessions = db.collection<Session>('sessions');
  collections.users = db.collection<User>('users');

  return client;
}
