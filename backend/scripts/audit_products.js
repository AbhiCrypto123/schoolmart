const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function audit() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Search for name starting with "A" and having 1-2 characters, or exactly "A" case-insensitive
  const products = await Product.find({ name: { $regex: /^A\s*$/i } });
  console.log(`Found ${products.length} products with search criteria`);

  for (const p of products) {
    if (p.subcategory === 'CHEMISTRY LAB' || p.category === 'Science Is Fun') {
      console.log(`Updating product "${p.name}" (ID: ${p._id}) in CHEMISTRY LAB to "Advanced Chemistry Kit"`);
      p.name = 'Advanced Chemistry Kit';
      p.image = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80';
      await p.save();
    } else {
      console.log(`Deleting placeholder product "${p.name}" (ID: ${p._id})`);
      await Product.deleteOne({ _id: p._id });
    }
  }

  // Also search for any product with empty image or name "A"
  const allA = await Product.find({ name: "A" });
  if (allA.length === 0) {
      console.log("Still 0 products with exact name 'A'. Listing first 5 products to check schema...");
      const some = await Product.find().limit(5);
      some.forEach(p => console.log(`- ${p.name} (Cat: ${p.category}, Sub: ${p.subcategory})`));
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
