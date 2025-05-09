import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch single product by slug
// @route   GET api/products/:slug
// @access  Public
export const getProductBySlug = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create new product
// @route   POST api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    const created = await product.save();
    res.status(201).json(created);
})

// @desc    Update a product
// @route   PUT api/products/:id
// @access  Private/Admin
export const updateProductById = asyncHandler(async (req, res) => {
    const { name, price, brand, category, specs, inStock, images } = req.body;
    const product = await product.findById(req.params.id);
    if (product) {
        Object.assign(product, { name, price, brand, category, specs, inStock, images });
        const updated = await product.save();
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed'});
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});