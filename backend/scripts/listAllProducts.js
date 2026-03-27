const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Product = require('../models/Product');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart');
  const all = await Product.find({}, { name: 1, category: 1, subcategory: 1, image: 1 });
  
  // Group by category to see the mess
  const grouped = {};
  for (const p of all) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push({ name: p.name, sub: p.subcategory, hasImg: !!p.image });
  }
  
  console.log(`Total products: ${all.length}`);
  for (const [cat, prods] of Object.entries(grouped)) {
    console.log(`\n📦 Category: "${cat}" (${prods.length} products)`);
    prods.forEach(p => console.log(`   - [${p.sub}] ${p.name} img=${p.hasImg}`));
  }
  process.exit();
}
run();
