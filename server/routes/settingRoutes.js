const express = require('express');
const router = express.Router();
const { getAllSettings, updateSetting } = require('../controllers/settingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAllSettings);
router.post('/', protect, admin, updateSetting);

module.exports = router;



