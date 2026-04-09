const express = require('express');
const router = express.Router();
const FormConfig = require('../models/FormConfig');
const auth = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

// Default configs that match the current hardcoded frontend fields
const DEFAULTS = {
  registration: {
    formSlug: 'registration',
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true, order: 0, isActive: true, gridCols: 2 },
      { name: 'email', label: 'Work Email', type: 'email', placeholder: 'you@institution.edu', required: true, order: 1, isActive: true, gridCols: 1 },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 9876543210', required: true, order: 2, isActive: true, gridCols: 1 },
      { name: 'schoolName', label: 'School / Institution Name', type: 'text', placeholder: 'e.g. Delhi Public School', required: true, order: 3, isActive: true, gridCols: 2 },
      { name: 'designation', label: 'Designation', type: 'select', placeholder: 'Select your role', required: true, order: 4, isActive: true, gridCols: 1, options: ['Principal', 'Vice Principal', 'Administrator', 'Teacher', 'Management', 'Trustee', 'Other'] },
      { name: 'city', label: 'City', type: 'text', placeholder: 'e.g. Hyderabad', required: true, order: 5, isActive: true, gridCols: 1 },
      { name: 'state', label: 'State', type: 'text', placeholder: 'e.g. Telangana', required: true, order: 6, isActive: true, gridCols: 1 },
      { name: 'pincode', label: 'Pincode', type: 'text', placeholder: '500001', required: false, order: 7, isActive: true, gridCols: 1 },
      { name: 'schoolType', label: 'Type of Institution', type: 'select', placeholder: 'Select type', required: false, order: 8, isActive: true, gridCols: 1, options: ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE', 'Montessori', 'Play School', 'College', 'Other'] },
      { name: 'studentStrength', label: 'Student Strength', type: 'select', placeholder: 'Select range', required: false, order: 9, isActive: true, gridCols: 1, options: ['Below 200', '200-500', '500-1000', '1000-2000', '2000-5000', '5000+'] },
      { name: 'password', label: 'Create Password', type: 'password', placeholder: 'Min. 8 characters', required: true, order: 10, isActive: true, gridCols: 1 },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password', required: true, order: 11, isActive: true, gridCols: 1 },
    ],
    services: [
      { name: 'School Furniture', isActive: true, order: 0 },
      { name: 'School Architecture', isActive: true, order: 1 },
      { name: 'Digital Infrastructure', isActive: true, order: 2 },
      { name: 'Sports Infrastructure', isActive: true, order: 3 },
      { name: 'Library Setup', isActive: true, order: 4 },
      { name: 'Composite Skill Labs', isActive: true, order: 5 },
      { name: 'Mathematics Lab', isActive: true, order: 6 },
      { name: 'Science Lab', isActive: true, order: 7 },
      { name: 'School Design & Interiors', isActive: true, order: 8 },
    ],
    settings: {
      heading: 'Partner Registration',
      description: 'Join India\'s largest institutional supply network. Get access to exclusive catalogues, pricing, and consultation.',
      submitLabel: 'Create Account & Verify',
      servicesHeading: 'Services of Interest',
      otpEnabled: true,
    }
  },
  login: {
    formSlug: 'login',
    fields: [
      { name: 'email', label: 'Work Email', type: 'email', placeholder: 'you@institution.edu', required: true, order: 0, isActive: true, gridCols: 2 },
      { name: 'password', label: 'Security Key', type: 'password', placeholder: 'Enter your password', required: true, order: 1, isActive: true, gridCols: 2 },
    ],
    services: [],
    settings: {
      heading: 'Institutional Login',
      description: 'Access your SchoolMart partner dashboard.',
      submitLabel: 'Sign In',
      forgotPasswordEnabled: true,
      otpEnabled: true,
    }
  }
};

// GET /api/formconfig/:slug — public (used by frontend to render forms)
router.get('/:slug', async (req, res) => {
  try {
    let config = await FormConfig.findOne({ formSlug: req.params.slug });
    if (!config && DEFAULTS[req.params.slug]) {
      config = new FormConfig(DEFAULTS[req.params.slug]);
      await config.save();
    }
    if (!config) return res.status(404).json({ message: 'Form config not found' });
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/formconfig/:slug — admin only
router.put('/:slug', auth, adminOnly, async (req, res) => {
  try {
    const { fields, services, settings } = req.body;
    let config = await FormConfig.findOne({ formSlug: req.params.slug });
    if (!config) {
      config = new FormConfig({ formSlug: req.params.slug, fields: [], services: [], settings: {} });
    }
    if (fields !== undefined) config.fields = fields;
    if (services !== undefined) config.services = services;
    if (settings !== undefined) config.settings = settings;
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
