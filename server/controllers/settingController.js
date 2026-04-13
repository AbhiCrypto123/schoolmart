const Setting = require('../models/Setting');

// Get all settings
exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update or Create setting
exports.updateSetting = async (req, res) => {
  try {
    const { key, data } = req.body;
    
    let setting = await Setting.findOne({ where: { key } });

    if (setting) {
      setting.data = data;
      await setting.save();
    } else {
      setting = await Setting.create({ key, data });
    }

    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



