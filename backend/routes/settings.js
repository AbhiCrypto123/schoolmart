const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const auth = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

// Default settings
const DEFAULTS = {
  footer: {
    brand: {
      name: 'SCHOOL MART',
      tagline: 'everything a school needs',
      description: 'India\'s largest institutional supply and infrastructure partner. From furniture to digital labs — we build schools that inspire.',
    },
    columns: [
      {
        title: 'Infrastructure',
        links: [
          { label: 'School Furniture', path: '/furniture' },
          { label: 'Architecture', path: '/architecture' },
          { label: 'Digital Infrastructure', path: '/digital' },
          { label: 'Sports Infrastructure', path: '/sports' },
          { label: 'Libraries', path: '/libraries' },
        ]
      },
      {
        title: 'Resources',
        links: [
          { label: 'Catalogues', path: '/catalogues' },
          { label: 'Guides', path: '/guides' },
          { label: 'School Sale', path: '/school-sale' },
          { label: 'Partnerships', path: '/partnerships' },
          { label: 'Workshops', path: '/workshops' },
        ]
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', path: '/about' },
          { label: 'Contact Us', path: '/contact' },
          { label: 'Corporate', path: '/corporate' },
          { label: 'Manufacturing', path: '/manufacturing' },
          { label: 'Careers', path: '/p/job-openings' },
        ]
      }
    ],
    contact: {
      email: 'info@schoolmart.in',
      phone1: '+91 9966109191',
      phone2: '+91 9866091111',
      address: 'Hyderabad, Telangana, India',
    },
    social: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
    },
    copyright: '© 2025 SchoolMart. All rights reserved.',
    bottomLinks: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ]
  },
  branding: {
    siteName: 'SCHOOL MART',
    tagline: 'everything a school needs',
    logoUrl: '',
    faviconUrl: '',
    primaryColor: '#0057A8',
    accentColor: '#3B82F6',
  },
  pdf_access: {
    requireLogin: true, // PDFs require registration to download
    message: 'Please register or login to download this resource.',
  }
};

// GET /api/settings/:key — public
router.get('/:key', async (req, res) => {
  try {
    let setting = await SiteSettings.findOne({ key: req.params.key });
    if (!setting && DEFAULTS[req.params.key]) {
      setting = new SiteSettings({ key: req.params.key, data: DEFAULTS[req.params.key] });
      await setting.save();
    }
    if (!setting) return res.status(404).json({ message: 'Setting not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/settings — admin, list all
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    // Auto-seed defaults for all keys
    for (const [key, data] of Object.entries(DEFAULTS)) {
      const exists = await SiteSettings.findOne({ key });
      if (!exists) {
        await new SiteSettings({ key, data }).save();
      }
    }
    const settings = await SiteSettings.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/settings/:key — admin
router.put('/:key', auth, adminOnly, async (req, res) => {
  try {
    const setting = await SiteSettings.findOneAndUpdate(
      { key: req.params.key },
      { data: req.body.data },
      { new: true, upsert: true }
    );
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
