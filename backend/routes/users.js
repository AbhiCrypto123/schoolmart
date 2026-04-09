const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

// GET /api/users — admin, list all users
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const { search, role, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { schoolName: { $regex: search, $options: 'i' } },
      ];
    }
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password -otp -otpExpires -resetOtp -resetOtpExpires')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ users, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/:id — admin, get single user
router.get('/:id', auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -otp -otpExpires -resetOtp -resetOtpExpires');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/users/:id — admin, update user
router.patch('/:id', auth, adminOnly, async (req, res) => {
  try {
    const { role, isVerified, name, email } = req.body;
    const update = {};
    if (role !== undefined) update.role = role;
    if (isVerified !== undefined) update.isVerified = isVerified;
    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true })
      .select('-password -otp -otpExpires -resetOtp -resetOtpExpires');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/users/:id — admin, delete user
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/export/csv — admin, export all users as CSV
router.get('/export/csv', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password -otp -otpExpires -resetOtp -resetOtpExpires').lean();
    const headers = ['Name', 'Email', 'Role', 'Verified', 'School', 'Phone', 'City', 'State', 'Created'];
    const rows = users.map(u => [
      u.name, u.email, u.role, u.isVerified ? 'Yes' : 'No',
      u.schoolName || '', u.phone || '', u.city || '', u.state || '',
      u.createdAt ? new Date(u.createdAt).toLocaleDateString() : ''
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="users_export.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
