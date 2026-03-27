// Check page titles stored in CMS database
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Page = require('../models/Page');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart');
  const pages = await Page.find({ 
    pageSlug: { $in: ['furniture', 'architecture', 'digital', 'sports', 'libraries', 'labs', 'mathematics', 'science', 'design'] }
  }, { pageSlug: 1, pageTitle: 1 });
  pages.forEach(p => console.log(`slug: "${p.pageSlug}" -> pageTitle: "${p.pageTitle}"`));
  process.exit();
}
run();
