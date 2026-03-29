const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');
const Page = require('../models/Page');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function audit() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const products = await Product.find({});
  console.log(`Total Products: ${products.length}`);
  
  for (const p of products) {
    if (p.subcategory?.includes('CHEMISTRY') || p.name === 'A' || p.name.length < 5) {
      console.log(`- MATCH: "${p.name}" (ID: ${p._id}) | Cat: ${p.category} | Sub: "${p.subcategory}"`);
      if (p.name === 'A' || p.name.length < 5) {
          console.log(`  !! Placeholder !! Updating...`);
          p.name = 'Advanced Chemistry Kit';
          p.image = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80';
          await p.save();
      }
    }
  }

  const sciencePage = await Page.findOne({ pageSlug: 'science' });
  if (sciencePage) {
      const sidebar = sciencePage.blocks.find(b => b.blockType === 'sidebar_categories');
      console.log(`Science Page Sidebar Categories: ${JSON.stringify(sidebar?.data?.categories)}`);
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
