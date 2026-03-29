const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function audit() {
  await mongoose.connect(MONGO_URI);
  const products = await Product.find({ category: 'Science Is Fun' });
  console.log(`Total: ${products.length}`);
  for (const p of products) {
    console.log(`- "${p.name}" | ${p.subcategory}`);
    if (p.name.length < 5) {
        console.log(`  !! Potential Placeholder !!`);
        p.name = 'Advanced Laboratory System';
        p.image = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80';
        p.description = "Premium grade laboratory solutions for advanced science education.";
        await p.save();
        console.log(`  >> Updated to "Advanced Laboratory System"`);
    }
  }
  await mongoose.disconnect();
}

audit().catch(console.error);
