import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// @desc    Add a new order
// @route   POST api/orders
// @access  Private
export const addOrder = asyncHandler(async (req, res) => {
    const order = new Order({ ...req.body, user: req.user._id });
    const created = await order.save();
    res.status(201).json(created);
});

// @desc    Get a users orders
// @route   GET api/orders/my
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get an order by id
// @route   GET api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) res.json(order);
    else {
        res.status(404);
        throw new Error('Order not found');
    }
});