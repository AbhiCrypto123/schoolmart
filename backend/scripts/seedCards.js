// backend/scripts/seedCards.js
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Page = require('../models/Page');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

const PAGE_DATA = [
  { slug: 'furniture', title: 'Furniture', subs: ['Classroom', 'Cafeteria', 'Library', 'Office'] },
  { slug: 'architecture', title: 'School Architecture', subs: ['Exterior', 'Interior', 'Landscaping'] },
  { slug: 'digital', title: 'Digital Infrastructure', subs: ['Smart Boards', 'Networking', 'Computer Lab'] },
  { slug: 'design', title: 'School Design & Planning', subs: ['Master Plan', '3D Walkthrough'] },
  { slug: 'libraries', title: 'Libraries', subs: ['Shelving', 'Layouts'] },
  { slug: 'sports', title: 'Sports Infrastructure', subs: ['Courts', 'Equipment', 'Indoor'] },
  { slug: 'mathematics', title: 'Gamified Math Labs', subs: ['Lab Setup', 'Kits'] },
  { slug: 'science', title: 'Science Is Fun', subs: ['Physics', 'Chemistry', 'Biology'] },
  { slug: 'labs', title: 'Composite Skill Labs', subs: ['Robotics', 'Tinkering Lab'] }
];

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // 1. Inject sidebar_categories blocks into the Pages if they don't exist
  for (const pageRaw of PAGE_DATA) {
    const page = await Page.findOne({ pageSlug: pageRaw.slug });
    if (page) {
      let block = page.blocks.find(b => b.blockType === 'sidebar_categories');
      if (!block) {
         page.blocks.push({
             blockType: 'sidebar_categories',
             order: page.blocks.length,
             isVisible: true,
             data: { categories: pageRaw.subs }
         });
         await page.save();
         console.log(`✅ Added sidebar_categories block to ${pageRaw.slug}`);
      } else {
         // Update existing
         block.data = { categories: pageRaw.subs };
         await page.save();
         console.log(`✅ Updated sidebar_categories block for ${pageRaw.slug}`);
      }
    }
  }

  // 2. Clear existing test products
  await Product.deleteMany({});
  console.log('✅ Cleared old products');

  // 3. Insert 2 cards per sub-category for each page
  const newProducts = [];
  for (const page of PAGE_DATA) {
    for (const sub of page.subs) {
      for (let i = 1; i <= 2; i++) {
         newProducts.push({
           name: `${sub} Setup ${i}`,
           description: `Premium ${sub.toLowerCase()} setup designed exactly for modern schools looking to enhance their ${page.title} infrastructure. Highly durable, easy to deploy, and NEP-compliant.`,
           category: page.title,
           subcategory: sub,
           price: Math.floor(Math.random() * 50000) + 10000,
           image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
           views: Math.floor(Math.random() * 1000),
           inquiries: Math.floor(Math.random() * 50),
           resources: [
             { label: 'Technical Spec Sheet', type: 'PDF' },
             { label: 'Installation Guide', type: 'PDF' }
           ],
           featured: i === 1
         });
      }
    }
  }

  await Product.insertMany(newProducts);
  console.log(`✅ Successfully seeded ${newProducts.length} cards across all 9 pages!`);

  process.exit();
}

run().catch(console.error);
