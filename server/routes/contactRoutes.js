const express = require('express');
const router = express.Router();
const { submitInquiry, getInquiries } = require('../controllers/contactController');

// Public route to submit inquiry
router.post('/', submitInquiry);

// Admin route (should be protected in a real app)
router.get('/', getInquiries);

module.exports = router;


