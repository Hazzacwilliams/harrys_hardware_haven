import express from 'express';
import {
    addOrder,
    getMyOrders,
    getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', addOrder);

router.get('/my', getMyOrders);
router.get('/:id', getOrderById);

export default router;