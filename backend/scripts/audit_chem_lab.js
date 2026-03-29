const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function audit() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const products = await Product.find({ subcategory: 'CHEMISTRY LAB' });
  console.log(`Found ${products.length} products in CHEMISTRY LAB`);

  for (const p of products) {
    console.log(`- "${p.name}" (ID: ${p._id})`);
    if (p.name === 'A' || p.name.length < 5) {
      console.log(`  ^^ PLACEHOLDER DETECTED ^^ Updating...`);
      p.name = 'Advanced Chemistry Kit';
      p.image = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80';
      await p.save();
    }
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
