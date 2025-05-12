import express from 'express';
import {
    getCart,
    updateCart
} from '../controllers/cartController.js';

const router = express.Router();

router.route('/')
    .get(getCart)
    .put(updateCart)

export default router;