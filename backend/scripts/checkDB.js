const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Product = require('../models/Product');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart');
  const prods = await Product.find({ category: /furniture/i });
  console.log(`Found ${prods.length} products for Furniture:`);
  prods.forEach(p => {
    console.log(`- Title: "${p.name}", Cat: "${p.category}", Subcat: "${p.subcategory}"`);
  });
  
  process.exit();
}
run();
