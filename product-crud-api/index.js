const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB.'))
    .catch(err => console.error('❌ Connection error:', err));

// Use the product routes
// All routes in products.js will be prefixed with /products
app.use('/products', productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});