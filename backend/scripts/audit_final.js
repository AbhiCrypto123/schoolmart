const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function audit() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const products = await Product.find({ 
    $or: [
        { name: { $regex: /^.{1,4}$/ } },
        { subcategory: "CHEMISTRY LAB" }
    ]
  });
  
  console.log(`Found ${products.length} potential placeholder products`);
  for (const p of products) {
    console.log(`- "${p.name}" (ID: ${p._id}) | Cat: ${p.category} | Sub: ${p.subcategory}`);
    if (p.name === "A" || p.name.length < 5) {
        console.log(`  !! Placeholder !! Updating...`);
        p.name = "Modern Scientific Station";
        p.image = "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80";
        p.category = p.category || "Science Is Fun";
        p.subcategory = p.subcategory || "CHEMISTRY LAB";
        p.description = "Advanced laboratory station designed for safety and efficiency in academic environments.";
        await p.save();
    }
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
