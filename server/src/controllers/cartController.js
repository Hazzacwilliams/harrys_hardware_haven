import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

// @desc    Get or create cart for user
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price image');
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
});

// @desc    Update cart items
// @route   PUT /api/cart
// @access  Private
export const updateCart = asyncHandler(async (req, res) => {
    const { items } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        cart.items = items;
        const updated = await Cart.save();
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});