import express from 'express';
import {
    getProducts,
    getProductBySlug,
    createProduct,
    updateProductById,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.get('/:slug', getProductBySlug);

router.route('/:id')
    .put(updateProductById)
    .delete(deleteProduct);

export default router;
