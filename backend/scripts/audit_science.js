const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function audit() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const products = await Product.find({ category: 'Science Is Fun' });
  console.log(`Found ${products.length} products in Science Is Fun`);

  for (const p of products) {
    console.log(`- "${p.name}" (ID: ${p._id}) | Sub: ${p.subcategory}`);
    if (p.name === 'A' || p.name.length < 5) {
      console.log(`  ^^ PLACEHOLDER DETECTED ^^ Updating...`);
      p.name = 'Advanced Chemistry Kit';
      p.image = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80';
      // Ensure it has stats and resources so it matches the screenshot's data-rich look
      if (!p.stats || p.stats.length === 0) {
        p.stats = [
            { label: 'Impact Scale', value: '98% Efficient' },
            { label: 'Install Time', value: '24-48 Hours' },
            { label: 'Standard', value: 'NEP Certified' }
        ];
      }
      p.description = "This advanced chemistry kit represents our commitment to scientific excellence. Designed specifically for high-school laboratory environments, it ensures that students can perform complex experiments with safety and precision.";
      await p.save();
    }
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
