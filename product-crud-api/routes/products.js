const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// CREATE: Add a new product (POST /products)
router.post('/', async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        });
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// READ: Get all products (GET /products)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE: Update a product by its ID (PUT /products/:id)
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a product by its ID (DELETE /products/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({
            message: 'Product deleted.',
            product: deletedProduct
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;