import * as mongodb from 'mongodb';

export interface Session {
  _id?: mongodb.ObjectId;
  user: mongodb.ObjectId;
  valid: boolean;
  userAgent: string;
  createdAt?: Date;
  updatedAt: Date;
}

export const sessionSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['user','valid', 'createdAt', 'updatedAt'],
    properties: {
      _id: {
        bsonType: 'objectId',
        description: 'Unique identifier for the session'
      },
      user: {
        bsonType: 'objectId',
        description: 'The ID of the user associated with the session'
      },
      userAgent: {
        bsonType: 'string',
        description: 'Give session info such as broswer used to login'
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