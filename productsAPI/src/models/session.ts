import * as mongodb from 'mongodb';

export interface Session {
  _id?: mongodb.ObjectId;
  email: string;
  password: string;
}

export const sessionSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['email', 'password'],
    properties: {
      _id: {},
      email: {
        bsonType: 'string',
        description: 'Email to log into session',
      },
      password: {
        bsonType: 'string',
        description: 'Hashed password',
      },
    },
  },
};