const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function globalSearch() {
  await mongoose.connect(MONGO_URI);
  console.log('--- Global Search ---');

  const prods = await Product.find({ 
    $or: [
      { subcategory: /CHEMISTRY/i },
      { name: "A" },
      { description: /das/i }
    ]
  });
  console.log(`Found ${prods.length} documents matching search criteria`);
  prods.forEach(p => {
    console.log(`- [${p._id}] "${p.name}" | Cat: ${p.category} | Sub: ${p.subcategory} | Desc: ${p.description}`);
  });

  await mongoose.disconnect();
}

globalSearch().catch(console.error);
