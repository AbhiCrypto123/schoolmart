const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },   // e.g. 'Furniture', 'Digital Infra'
  subcategory: { type: String },
  price: { type: Number },
  image: { type: String },                     // primary single image URL
  images: [{ type: String }],                   // image URLs
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  tags: [{ type: String }],
  stats: [{
    label: { type: String },
    value: { type: String }
  }],
  resources: [{
    name: { type: String },
    size: { type: String },
    url: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
