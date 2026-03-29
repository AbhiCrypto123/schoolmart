const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function audit() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const products = await Product.find({ name: 'A' });
  console.log(`Found ${products.length} products with name "A"`);

  for (const p of products) {
    if (p.subcategory === 'CHEMISTRY LAB') {
      console.log('Updating product "A" in CHEMISTRY LAB to "Advanced Chemistry Kit"');
      p.name = 'Advanced Chemistry Kit';
      p.image = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80';
      await p.save();
    } else {
      console.log(`Deleting placeholder product "A" (ID: ${p._id})`);
      await Product.deleteOne({ _id: p._id });
    }
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
