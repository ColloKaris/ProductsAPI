import * as mongodb from 'mongodb';
import {productSchema } from '../../models/product.js';
import {sessionSchema } from '../../models/session.js';
import {userSchema } from '../../models/user.js';

// Function to apply schema validation for different collections
export async function applySchemaValidation(db: mongodb.Db) {
  await db
    .command({
      collMod: 'products',
      validator: productSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection('products', { validator: productSchema });
      }
    });

  await db
    .command({
      collMod: 'sessions',
      validator: sessionSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection('sessions', { validator: sessionSchema });
      }
    });

  await db
    .command({
      collMod: 'users',
      validator: userSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection('users', { validator: userSchema });
      }
    });
}
