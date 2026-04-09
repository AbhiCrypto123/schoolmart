const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, enum: ['text', 'email', 'tel', 'password', 'select', 'textarea', 'radio', 'checkbox', 'number'], default: 'text' },
  placeholder: String,
  required: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  options: [String], // For select/radio types
  gridCols: { type: Number, default: 1 }, // 1 = full width, 2 = half
}, { _id: true });

const formConfigSchema = new mongoose.Schema({
  formSlug: { type: String, required: true, unique: true }, // 'registration' or 'login'
  fields: [fieldSchema],
  services: [{ 
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }],
  settings: {
    heading: String,
    description: String,
    submitLabel: String,
    servicesHeading: String,
    forgotPasswordEnabled: { type: Boolean, default: true },
    otpEnabled: { type: Boolean, default: true },
  }
}, { timestamps: true });

module.exports = mongoose.model('FormConfig', formConfigSchema);
