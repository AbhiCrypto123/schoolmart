// Check sidebar_categories block structure in DB
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Page = require('../models/Page');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart');
  const page = await Page.findOne({ pageSlug: 'furniture' });
  const block = page.blocks.find(b => b.blockType === 'sidebar_categories');
  console.log('Full block:', JSON.stringify(block, null, 2));
  process.exit();
}
run();
