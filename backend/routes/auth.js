const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOTP, sendEmail } = require('../utils/email');

const generateToken = (userId, role) =>
  jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const HOST_EMAIL = process.env.EMAIL_USER || 'web.thirdeye@gmail.com';

// Notify host about new registration
const notifyHost = async (user) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #0057A8; text-align: center;">New Registration Alert</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${user.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${user.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${user.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">School</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${user.schoolName || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Designation</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${user.designation || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">City/State</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${user.city || ''}, ${user.state || ''}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">School Type</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${user.schoolType || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Services</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(user.selectedServices || []).join(', ') || 'None selected'}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">SchoolMart Admin Notification</p>
      </div>
    `;
    await sendEmail(HOST_EMAIL, `New Registration: ${user.name} — ${user.schoolName || 'N/A'}`, html);
  } catch (err) {
    console.error('Host notification error:', err.message);
  }
};

// POST /api/auth/register — accepts all extended fields
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, schoolName, designation, city, state, pincode, schoolType, studentStrength, selectedServices } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
    
    let user = await User.findOne({ email });
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    if (user) {
      if (user.isVerified) return res.status(409).json({ message: 'Email already registered' });
      user.name = name;
      user.password = await bcrypt.hash(password, 10);
      user.phone = phone;
      user.schoolName = schoolName;
      user.designation = designation;
      user.city = city;
      user.state = state;
      user.pincode = pincode;
      user.schoolType = schoolType;
      user.studentStrength = studentStrength;
      user.selectedServices = selectedServices || [];
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      const hashed = await bcrypt.hash(password, 10);
      user = await User.create({
        name, email, password: hashed, role: role || 'user',
        phone, schoolName, designation, city, state, pincode, schoolType, studentStrength,
        selectedServices: selectedServices || [],
        otp, otpExpires
      });
    }

    await sendOTP(email, otp, 'Registration');
    // Notify host email about new registration
    notifyHost(user);
    res.status(201).json({ message: 'OTP sent to email', email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ 
      token: generateToken(user._id, user.role), 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/resend-otp
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOTP(email, otp);
    res.json({ message: 'OTP resent to email' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
    if (!user.isVerified) return res.status(403).json({ message: 'Account not verified', needsVerification: true });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    // BYPASS: Skip email for admin@schoolmart.in to avoid SMTP blocks in production
    if (user.email === 'admin@schoolmart.in') {
      return res.json({ 
        token: generateToken(user._id, user.role), 
        user: { id: user._id, name: user.name, email: user.email, role: user.role } 
      });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOTP(email, otp, 'Login Verification');
    res.json({ message: 'OTP sent for login verification', email, otpRequired: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No account found with this email' });
    if (!user.isVerified) return res.status(403).json({ message: 'Account not verified' });

    const otp = generateOTP();
    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOTP(email, otp, 'Password Reset');
    res.json({ message: 'Password reset OTP sent to email', email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ message: 'Email, OTP, and new password required' });

    const user = await User.findOne({ email, resetOtp: otp, resetOtpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now login.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me (protected)
router.get('/me', require('../middleware/auth'), async (req, res) => {
  const user = await User.findById(req.user.id).select('-password -otp -otpExpires -resetOtp -resetOtpExpires');
  res.json(user);
});

module.exports = router;
