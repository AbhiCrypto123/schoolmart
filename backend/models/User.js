const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  // Registration details
  phone: { type: String },
  schoolName: { type: String },
  designation: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  schoolType: { type: String },
  studentStrength: { type: String },
  selectedServices: [{ type: String }],
  // OTP for email verification
  otp: { type: String },
  otpExpires: { type: Date },
  // OTP for password reset
  resetOtp: { type: String },
  resetOtpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
