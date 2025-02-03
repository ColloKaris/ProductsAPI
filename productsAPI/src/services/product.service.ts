import * as mongodb from 'mongodb';
import { Product } from '../models/product.model.js';
import { collections } from '../utils/db/connectToDB.js';

export async function createProduct(product: Product) {
  const result = await collections.products?.insertOne(product);
  return result;
};

export async function findProduct(productId: string) {
  const result = await collections.products?.findOne({_id: new mongodb.ObjectId(productId)});
  return result;
};

export async function deleteProduct(productId: string) {
  const result = await collections.products?.deleteOne({_id: new mongodb.ObjectId(productId)});
  return result;
};

export async function updateProduct(productId: string, updatedProduct: Product) {
  const result = await collections.products?.updateOne({_id: new mongodb.ObjectId(productId)}, {$set: updateProduct});
  return result;
};