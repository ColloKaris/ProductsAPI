import * as mongodb from 'mongodb';

export interface User {
  _id?: mongodb.ObjectId;
  name: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt: Date;
}


export const userSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'password', 'email', 'createdAt', 'updatedAt'],
    properties: {
      _id: {
        bsonType: 'objectId',
        description: 'Unique identifier for the session'
      },
      name: {
        bsonType: 'string',
        description: 'Name for the user',
      },
      password: {
        bsonType: 'string',
        description: 'Hashed password',
      },
      email: {
        bsonType: 'string',
        description: 'The user email',
      },
      createdAt: {
        bsonType: 'date',
        description: 'Date the user was created',
      },
      updatedAt: {
        bsonType: 'date',
        description: 'Date when an update was made',
      },
    },
  },
};