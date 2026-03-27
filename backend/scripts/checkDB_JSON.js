const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Product = require('../models/Product');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart');
  const prods = await Product.find({ category: /furniture/i });
  console.log(JSON.stringify(prods.map(p => ({
    name: p.name, sub: p.subcategory, 
    subLen: p.subcategory ? p.subcategory.length : 0,
    cat: p.category, hasImages: p.images?.length, hasImage: !!p.image
  })), null, 2));
  
  process.exit();
}
run();
