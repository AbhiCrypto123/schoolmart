const express = require('express');
const router = express.Router();
const { submitInquiry, getInquiries, updateInquiryStatus, deleteInquiry } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to submit inquiry
router.post('/', submitInquiry);

// Admin routes
router.get('/', protect, admin, getInquiries);
router.put('/:id/status', protect, admin, updateInquiryStatus);
router.delete('/:id', protect, admin, deleteInquiry);

module.exports = router;


