// backend/scripts/fixSidebarCase.js
// Ensure sidebar_categories names in CMS exactly match product subcategory strings
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Page = require('../models/Page');

const CORRECTED_CATS = {
  furniture: ['CLASSROOM', 'LIBRARY', 'CAFETERIA', 'OFFICE', 'LABORATORY', 'OUTDOOR'],
  architecture: ['EXTERIOR', 'INTERIOR', 'LANDSCAPING', 'MASTERPLAN', 'FACILITIES'],
  digital: ['SMART BOARDS', 'NETWORKING', 'COMPUTER LAB', 'SECURITY', 'SERVERS'],
  design: ['CLASSROOMS', 'SPORTS ARENAS', 'LABORATORIES', 'AUDITORIUMS'],
  libraries: ['SEATING', 'SHELVING', 'DIGITAL KIOSKS', 'ARCHIVES'],
  sports: ['INDOOR', 'OUTDOOR', 'GYMNASIUM', 'AQUATICS'],
  mathematics: ['MANIPULATIVES', 'GEOMETRY KITS', 'SOFTWARE', 'DISPLAY'],
  science: ['PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'ASTRONOMY'],
  labs: ['ROBOTICS', '3D PRINTING', 'VIRTUAL REALITY', 'CODING'],
};

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart');
  
  for (const [slug, cats] of Object.entries(CORRECTED_CATS)) {
    const page = await Page.findOne({ pageSlug: slug });
    if (!page) { console.log(`No page found for ${slug}`); continue; }

    let block = page.blocks.find(b => b.blockType === 'sidebar_categories');
    if (block) {
      block.data = { categories: cats };
    } else {
      page.blocks.push({ blockType: 'sidebar_categories', data: { categories: cats }, isVisible: true, order: 90 });
    }
    await page.save();
    console.log(`✅ Fixed sidebar categories for ${slug}: ${cats.join(', ')}`);
  }
  
  console.log('Done!');
  process.exit();
}
run().catch(console.error);
