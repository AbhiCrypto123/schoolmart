const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  pinCode: { type: String },
  message: { type: String },
  status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' },
  email: { type: String },
  phone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
