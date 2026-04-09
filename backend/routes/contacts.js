const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');
const { sendEmail } = require('../utils/email');

const HOST_EMAIL = process.env.EMAIL_USER || 'web.thirdeye@gmail.com';

// POST /api/contacts  — public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' });
    const contact = await Contact.create({ name, email, phone, subject, message });

    // Notify host
    sendEmail(HOST_EMAIL, `New Contact: ${name} — ${subject || 'No subject'}`, `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #0057A8;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #ccc; margin: 10px 0;">${message}</blockquote>
        <p style="font-size: 12px; color: #999;">SchoolMart Admin Notification</p>
      </div>
    `).catch(err => console.error('Silent fail on contact email:', err));

    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contacts  — admin
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/contacts/:id/status  — admin
router.patch('/:id/status', auth, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/contacts/:id  — admin
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
