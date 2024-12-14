import * as mongodb from 'mongodb';

export interface Product {
  _id?: mongodb.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const productSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['title', 'description', 'price', 'image'],
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
    },
  },
};