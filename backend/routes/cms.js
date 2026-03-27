const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const auth = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

// GET /api/cms/:slug  — public endpoint
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ pageSlug: req.params.slug, isPublished: true });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/cms   — list all pages (admin)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const pages = await Page.find().select('pageSlug pageTitle isPublished updatedAt blocks');
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/cms/:slug  — full page update (admin)
router.put('/:slug', auth, adminOnly, async (req, res) => {
  try {
    const { pageTitle, blocks, isPublished } = req.body;
    const page = await Page.findOneAndUpdate(
      { pageSlug: req.params.slug },
      { pageTitle, blocks, isPublished, lastUpdatedBy: req.user.id },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/cms/:slug/block/:blockId  — update a single block (admin)
router.patch('/:slug/block/:blockId', auth, adminOnly, async (req, res) => {
  try {
    const page = await Page.findOne({ pageSlug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });

    const block = page.blocks.id(req.params.blockId);
    if (!block) return res.status(404).json({ message: 'Block not found' });

    if (req.body.data !== undefined) block.data = req.body.data;
    if (req.body.isVisible !== undefined) block.isVisible = req.body.isVisible;
    if (req.body.order !== undefined) block.order = req.body.order;

    page.lastUpdatedBy = req.user.id;
    await page.save();
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cms/:slug/block  — add a block (admin)
router.post('/:slug/block', auth, adminOnly, async (req, res) => {
  try {
    const page = await Page.findOne({ pageSlug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });

    page.blocks.push(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/cms/:slug/block/:blockId  — remove a block (admin)
router.delete('/:slug/block/:blockId', auth, adminOnly, async (req, res) => {
  try {
    const page = await Page.findOne({ pageSlug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });

    page.blocks = page.blocks.filter(b => b._id.toString() !== req.params.blockId);
    await page.save();
    res.json({ message: 'Block deleted', page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
