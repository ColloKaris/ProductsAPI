import { Request, Response } from 'express';
import { addTimestamps } from '../utils/db/addTimeStamps.js';
import { Product } from '../models/product.model.js';
import { createProduct, deleteProduct, findProduct, updateProduct } from '../services/product.service.js';
import { ExpressError } from '../utils/ExpressError.js';

export const createProductHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;
  const body = req.body;
  const newProduct: Product = addTimestamps({
    title: body.title,
    user: userId,
    description: body.description,
    price: body.price,
    image: body.image
  });

  const result = await createProduct(newProduct);
  if(!result?.acknowledged) {
    throw new ExpressError('Failed to create product', 500);
    
  };
  res.status(200).json({message: 'Successfully created a new product'})
};

export const updateProductHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;
  const productId = req.params.productId;
  const update = req.body

  const product = await findProduct(productId);
  
  if(!product) {
    throw new ExpressError('The Product DOES NOT exist', 404);
  };

  if(product.user.toString() !== userId) {
    throw new ExpressError('Accessing the product is forbidden', 403);
  };

  let {createdAt, updatedAt} = product;
  const now = new Date();
  updatedAt = now;

  const result = await updateProduct(productId, {...update, createdAt, updatedAt});

  if (
    result?.acknowledged &&
    result.matchedCount > 0 &&
    result.modifiedCount > 0
  ) {
    res.status(200).json({message: 'Successfully updated the product'});
  }
  throw new ExpressError('Failed to updated product', 500);
}

export const getProductHandler = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  console.log(productId)
  const product = await findProduct(productId);

  if(!product) {
    throw new ExpressError('Product not found', 404);
  }

  res.status(200).json(product);
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;
  const productId = req.params.productId;
  const product = await findProduct(productId);

  if(!product) {
    throw new ExpressError('Product not found', 404);
  };

  if(product.user.toString() !== userId) {
    throw new ExpressError('Accessing the product is forbidden', 403);
  };

  const result = await deleteProduct(productId);
  if (
    result?.acknowledged &&
    result.deletedCount > 0
  ) {
    res.status(200).json({message: 'Successfully deleted the product'});
  }
};