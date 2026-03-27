const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Page = require('../models/Page');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart');
  const pages = await Page.find({}, { pageSlug: 1, pageTitle: 1 });
  console.log(JSON.stringify(pages, null, 2));
  process.exit();
}
run();
