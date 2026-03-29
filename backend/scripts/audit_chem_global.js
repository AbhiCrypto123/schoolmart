const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function audit() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const products = await Product.find({ 
    $or: [
        { name: "A" },
        { subcategory: /CHEMISTRY/i },
        { category: /CHEMISTRY/i }
    ]
  });
  
  console.log(`Found ${products.length} matching products`);
  for (const p of products) {
    console.log(`- "${p.name}" (ID: ${p._id}) | Cat: ${p.category} | Sub: ${p.subcategory}`);
    if (p.name === "A" || p.name.length < 5) {
        console.log(`  !! Placeholder !! Updating...`);
        p.name = "Modern Chemistry Station";
        p.image = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80";
        p.description = "Advanced chemistry laboratory station designed for safety and efficiency in academic environments.";
        await p.save();
    }
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
