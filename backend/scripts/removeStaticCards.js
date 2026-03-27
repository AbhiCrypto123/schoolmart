// backend/scripts/removeStaticCards.js
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Page = require('../models/Page');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const targets = ['furniture', 'architecture', 'digital', 'sports', 'libraries', 'labs', 'mathematics', 'science', 'design'];

  const pages = await Page.find({ pageSlug: { $in: targets } });
  
  for (let page of pages) {
    const originalLen = page.blocks.length;
    page.blocks = page.blocks.filter(b => b.blockType !== 'feature_cards');
    
    if (page.blocks.length < originalLen) {
      // Reassign orders
      page.blocks.forEach((b, i) => b.order = i);
      await page.save();
      console.log(`✅ Removed static feature_cards from ${page.pageSlug}`);
    } else {
      console.log(`ℹ️ No feature_cards found for ${page.pageSlug}`);
    }
  }

  console.log('Done!');
  process.exit();
}

run().catch(console.error);
