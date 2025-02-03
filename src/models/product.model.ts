import * as mongodb from 'mongodb';
// import { customAlphabet } from 'nanoid';

// nanoid used to generate secure unique ID with custom alphabet
// specify length of the id to be 10 characters long
// const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10); // create custom alphabet for our nanoid

export interface Product {
  _id?: mongodb.ObjectId;
  user: mongodb.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt?: Date;
  updatedAt: Date;
}

export const productSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['title', 'description', 'price', 'image', 'createdAt', 'updatedAt'],
    properties: {
      _id: {},
      title: {
        bsonType: 'string',
        description: 'Title for the product',
      },
      description: {
        bsonType: 'string',
        description: 'A product description',
      },
      price: {
        bsonType: 'number',
        description: 'Price for the product',
      },
      image: {
        bsonType: 'string',
        description: 'A url string to the image',
      },
      createdAt: {
        bsonType: 'date',
        description: 'Date when the product was created'
      },
      updatedAt: {
        bsonType: 'date',
        description: 'Date when the product was updated'
      }
    },
  },
};