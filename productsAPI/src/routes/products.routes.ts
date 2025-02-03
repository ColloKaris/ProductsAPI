import express from 'express';
import { requireUser } from '../middleware/requireUser.js';
import { wrapAsync } from '../utils/asyncErrorHandler.js';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller.js';
import { validate } from '../middleware/validateResource.js';
import { createProductSchema } from '../schema/product.schema.js';
import { deserializeUser } from '../middleware/deserializeUser.js';

export const productRouter = express.Router({mergeParams: true});

productRouter.post('/', deserializeUser, requireUser, validate(createProductSchema), wrapAsync(createProductHandler));

productRouter.put('/:productId', deserializeUser, requireUser, validate(createProductSchema), wrapAsync(updateProductHandler));

productRouter.get('/:productId', deserializeUser, wrapAsync(getProductHandler));

productRouter.delete('/:productId', deserializeUser, requireUser, wrapAsync(deleteProductHandler));
