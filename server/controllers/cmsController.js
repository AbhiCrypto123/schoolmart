const CMSPage = require('../models/CMSPage');
const CMSBlock = require('../models/CMSBlock');

// Get all pages
exports.getAllPages = async (req, res) => {
  try {
    const pages = await CMSPage.findAll({ order: [['title', 'ASC']] });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single page with its blocks
exports.getPageContent = async (req, res) => {
  try {
    const { slug } = req.params;
    let page = await CMSPage.findOne({ where: { slug } });
    
    // Create page if it doesn't exist (helpful for auto-init)
    if (!page) {
      page = await CMSPage.create({ 
        slug, 
        title: slug.replace(/-/g, ' ').toUpperCase() 
      });
    }

    const blocks = await CMSBlock.findAll({ 
      where: { pageSlug: slug },
      order: [['order', 'ASC']]
    });

    // Transform to key-value map for frontend ease
    const blockMap = {};
    blocks.forEach(b => {
      blockMap[b.key] = {
        id: b.id,
        key: b.key,
        type: b.type,
        data: b.data,
        isVisible: b.isVisible
      };
    });

    res.json({ page, blocks: blockMap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update or Create block
exports.updateBlock = async (req, res) => {
  try {
    const { pageSlug, key, type, data, isVisible, id } = req.body;
    
    let block;
    // Prefer lookup by explicit ID if provided, otherwise fallback to pageSlug/key pair
    if (id) {
      block = await CMSBlock.findByPk(id);
    } 
    if (!block && pageSlug && key) {
      block = await CMSBlock.findOne({ where: { pageSlug, key } });
    }

    if (block) {
      block.data = data || block.data;
      if (type) block.type = type;
      if (isVisible !== undefined) block.isVisible = isVisible;
      await block.save();
    } else {
      block = await CMSBlock.create({ pageSlug, key, type, data, isVisible });
    }

    res.json(block);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add block (for dynamic lists)
exports.addBlock = async (req, res) => {
  try {
    const block = await CMSBlock.create(req.body);
    res.status(201).json(block);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete block
exports.deleteBlock = async (req, res) => {
  try {
    const { id } = req.params;
    await CMSBlock.destroy({ where: { id } });
    res.json({ message: 'Block deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



