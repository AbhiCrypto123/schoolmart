// backend/scripts/seedRichCards.js
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Product = require('../models/Product');
const Page = require('../models/Page');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

const HIGH_QUALITY_DATA = {
  furniture: {
    sidebarCats: ['CLASSROOM', 'LIBRARY', 'CAFETERIA', 'OFFICE', 'LABORATORY', 'OUTDOOR'],
    cards: [
      { t: "Ergonomic Student Desk V2", c: "CLASSROOM", img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1000", badge: "TOP SELLER" },
      { t: "Collaborative Round Table", c: "CLASSROOM", img: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1000" },
      { t: "Acoustic Study Pod", c: "LIBRARY", img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000", badge: "NEW ARRIVAL" },
      { t: "Modular Bookshelf System", c: "LIBRARY", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000" },
      { t: "Bistro Seating Array", c: "CAFETERIA", img: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=1000" },
      { t: "Staff Lounge Sofa", c: "OFFICE", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000" },
    ]
  },
  architecture: {
    sidebarCats: ['EXTERIOR', 'INTERIOR', 'LANDSCAPING', 'MASTERPLAN', 'FACILITIES'],
    cards: [
      { t: "Campus Audit Pro.", c: "EXTERIOR", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000", badge: "MOST REQUESTED" },
      { t: "Zero-Energy Block Design", c: "EXTERIOR", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000" },
      { t: "Aura Campus Masterplan", c: "MASTERPLAN", img: "https://images.unsplash.com/photo-1487958449943-2429e5be8622?q=80&w=1000", badge: "AWARD WINNING" },
      { t: "Biophilic Courtyards", c: "LANDSCAPING", img: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?q=80&w=1000" },
      { t: "Acoustic Hall Interior", c: "INTERIOR", img: "https://images.unsplash.com/photo-1507646222501-49a37ad1c4f5?q=80&w=1000" },
    ]
  },
  digital: {
    sidebarCats: ['SMART BOARDS', 'NETWORKING', 'COMPUTER LAB', 'SECURITY', 'SERVERS'],
    cards: [
      { t: "Smart Boards 4K Series", c: "SMART BOARDS", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000", badge: "FEATURED" },
      { t: "Interactive Touch Panel 85\"", c: "SMART BOARDS", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000" },
      { t: "Campus Wi-Fi 6 AP Matrix", c: "NETWORKING", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000" },
      { t: "High-Density Server Rack", c: "SERVERS", img: "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?q=80&w=1000", badge: "ENTERPRISE" },
      { t: "AI Access Control Gates", c: "SECURITY", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000" },
    ]
  },
  design: {
    sidebarCats: ['CLASSROOMS', 'SPORTS ARENAS', 'LABORATORIES', 'AUDITORIUMS'],
    cards: [
      { t: "Modular Stem Hub", c: "CLASSROOMS", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000" },
      { t: "Future Ready Lab Layout", c: "LABORATORIES", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000", badge: "INNOVATIVE" },
      { t: "Multi-Purpose Indoor Arena", c: "SPORTS ARENAS", img: "https://images.unsplash.com/photo-1574629810360-7efbb192569a?q=80&w=1000" },
      { t: "Grand Theater Acoustics", c: "AUDITORIUMS", img: "https://images.unsplash.com/photo-1507646222501-49a37ad1c4f5?q=80&w=1000" }
    ]
  },
  libraries: {
    sidebarCats: ['SEATING', 'SHELVING', 'DIGITAL KIOSKS', 'ARCHIVES'],
    cards: [
      { t: "Silent Study Pods", c: "SEATING", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000", badge: "POPULAR" },
      { t: "Automated Book Return", c: "DIGITAL KIOSKS", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000" },
      { t: "Archive Mobile Shelves", c: "ARCHIVES", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000" },
    ]
  },
  sports: {
    sidebarCats: ['INDOOR', 'OUTDOOR', 'GYMNASIUM', 'AQUATICS'],
    cards: [
      { t: "Olympic Grade Basketball Court", c: "INDOOR", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000", badge: "FIBA APPROVED" },
      { t: "All-Weather Football Turf", c: "OUTDOOR", img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1000" },
      { t: "Professional Weight Room", c: "GYMNASIUM", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000" },
    ]
  },
  mathematics: {
    sidebarCats: ['MANIPULATIVES', 'GEOMETRY KITS', 'SOFTWARE', 'DISPLAY'],
    cards: [
      { t: "Advanced Geometric Shapes Kit", c: "MANIPULATIVES", img: "https://images.unsplash.com/photo-1632516444005-724d2bd5e9ec?q=80&w=1000", badge: "NEP ALIGNED" },
      { t: "Interactive Topology Display", c: "DISPLAY", img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000" },
      { t: "Fractal Design Software License", c: "SOFTWARE", img: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=1000" },
    ]
  },
  science: {
    sidebarCats: ['PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'ASTRONOMY'],
    cards: [
      { t: "Electron Microscope Pro", c: "BIOLOGY", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000", badge: "HIGH SPEC" },
      { t: "Chemical Fume Hood", c: "CHEMISTRY", img: "https://images.unsplash.com/photo-1581093196277-9f608109ca46?q=80&w=1000" },
      { t: "Kinematics Track System", c: "PHYSICS", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000" },
    ]
  },
  labs: {
    sidebarCats: ['ROBOTICS', '3D PRINTING', 'VIRTUAL REALITY', 'CODING'],
    cards: [
      { t: "Polymer 3D Printer Farm", c: "3D PRINTING", img: "https://images.unsplash.com/photo-1581093355088-34ee464fdff4?q=80&w=1000", badge: "LATEST" },
      { t: "Autonomous Robotics Arena", c: "ROBOTICS", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000" },
      { t: "VR Anatomy Simulator", c: "VIRTUAL REALITY", img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000" },
    ]
  }
};

const TITLE_MAPPING = {
  furniture: 'Furniture',
  architecture: 'School Architecture',
  digital: 'Digital Infrastructure',
  design: 'School Designs',
  libraries: 'Libraries',
  sports: 'Sports Infrastructure',
  mathematics: 'Mathematics',
  science: 'Science',
  labs: 'Composite Skill Labs'
};

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  for (const [slug, data] of Object.entries(HIGH_QUALITY_DATA)) {
    const pageTitle = TITLE_MAPPING[slug];
    
    // First, clear ONLY the dummy products!
    console.log(`Clearing existing products for ${pageTitle}...`);
    await Product.deleteMany({ category: pageTitle });
    
    // Make sure sidebar categories are fully set correctly in the CMS
    let page = await Page.findOne({ pageSlug: slug });
    if (page) {
      let sbCatBlock = page.blocks.find(b => b.blockType === 'sidebar_categories');
      if (!sbCatBlock) {
        sbCatBlock = { blockType: 'sidebar_categories', isVisible: true, categories: data.sidebarCats, order: 90 };
        page.blocks.push(sbCatBlock);
      } else {
        sbCatBlock.categories = data.sidebarCats;
      }
      await page.save();
    }

    // Insert new high quality data
    for (const card of data.cards) {
      await Product.create({
        name: card.t, // Product model uses 'name'
        category: pageTitle,
        subcategory: card.c,
        image: card.img,
        badge: card.badge || '',
        price: Math.floor(Math.random() * 500) + 100,
        description: `This is a premium ${card.t} designed exactly for modern schools looking to enhance their infrastructure. Highly durable, easy to deploy, and NEP-compliant. Our expert execution ensures complete integration with existing campus systems with a guaranteed 99.9% uptime metric.`,
        stats: [
          { label: 'Impact Scale', value: '98% EFFICIENT' },
          { label: 'Install Time', value: '24-48 HOURS' },
          { label: 'Standard', value: 'NEP CERTIFIED' }
        ],
        resources: [
          { name: 'Technical Specifications (PDF)', url: '/docs/spec.pdf', size: '2.4 MB' },
          { name: 'Institutional Layout Guide', url: '/docs/layout.pdf', size: '4.8 MB' },
          { name: 'Warranty & Support Policy', url: '/docs/warranty.pdf', size: '1.2 MB' }
        ]
      });
    }
    console.log(`✅ Seeded ${data.cards.length} high-fidelity products for ${pageTitle}`);
  }

  console.log('Done mapping high fidelity frontend data to Admin CMS!');
  process.exit();
}

run().catch(console.error);
