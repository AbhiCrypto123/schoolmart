const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function listAll() {
  await mongoose.connect(MONGO_URI);
  console.log(`Connected to ${MONGO_URI}`);

  const total = await Product.countDocuments();
  console.log(`Total Products: ${total}`);

  const all = await Product.find({}, { name: 1, category: 1, subcategory: 1 });
  all.forEach(p => {
    console.log(`[${p._id}] "${p.name}" | ${p.category} > ${p.subcategory}`);
    if (p.name.length <= 3) {
        console.log(`  ^^ POSSIBLY PLACEHOLDER ^^`);
    }
  });

  await mongoose.disconnect();
}

listAll().catch(console.error);
