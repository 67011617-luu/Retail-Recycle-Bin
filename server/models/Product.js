const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: [true, 'Please provide a barcode'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  material: {
    type: String,
    required: [true, 'Please provide material type'],
    enum: ['Plastic', 'Glass', 'Metal', 'Paper', 'Cardboard', 'Paperboard', 'Mixed'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Beverage', 'Food', 'Electronics', 'Household', 'Other'],
    default: 'Other'
  },
  points: {
    type: Number,
    required: [true, 'Please provide reward points'],
    min: 0,
    default: 10
  },
  imageUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
