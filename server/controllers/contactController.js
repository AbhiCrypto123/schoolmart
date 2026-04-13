const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// Submit a new contact/quote inquiry
exports.submitInquiry = async (req, res) => {
  try {
    const { name, schoolName, pinCode, email, phone, message, subject } = req.body;

    const displayName = schoolName || name;

    if (!displayName || !phone || !message) {
      return res.status(400).json({ message: 'School Name, Phone, and Message are required' });
    }

    const inquiry = await Contact.create({
      name: displayName,
      schoolName: schoolName || name,
      pinCode,
      email,
      phone,
      message,
      subject: subject || 'New Institutional Quote Request'
    });

    // Notify Admin (Optional but recommended)
    try {
      if (process.env.ADMIN_EMAIL) {
        await sendEmail({
          email: process.env.ADMIN_EMAIL,
          subject: subject || 'New Quote Request - SchoolMart',
          message: `New inquiry from ${displayName}.\nPhone: ${phone}\nPin Code: ${pinCode || 'N/A'}\nMessage: ${message}`,
          html: `<h1>New Quote Request</h1><p><strong>School:</strong> ${displayName}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Pin Code:</strong> ${pinCode || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`
        });
      }
    } catch (emailErr) {
      console.error('Admin notification email failed:', emailErr);
    }

    res.status(201).json({
      success: true,
      message: 'Your request has been received. Our team will contact you shortly.',
      data: inquiry
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

// Get all inquiries (Admin only)
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


