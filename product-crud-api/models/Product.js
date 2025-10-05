const mongoose = require('mongoose');

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true // Removes whitespace from both ends
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
        min: [0, 'Price cannot be negative.']
    },
    category: {
        type: String,
        required: [true, 'Product category is required.'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);