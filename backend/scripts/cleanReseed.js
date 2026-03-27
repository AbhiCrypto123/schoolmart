// backend/scripts/cleanReseed.js
// 1. Wipe ALL products
// 2. Check what category each frontend page fetches
// 3. Seed ONLY with those exact category strings, correct subcategories, and real images

const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Product = require('../models/Product');
const Page = require('../models/Page');

// These MUST match exactly what each frontend .jsx file passes to getProducts({ category: XX })
const SEED_DATA = [
  // Furniture.jsx -> getProducts({ category: 'Furniture' })
  {
    category: 'Furniture',
    products: [
      { name: 'Ergonomic Student Desk Pro', subcategory: 'CLASSROOM', image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1000', badge: 'TOP SELLER', description: 'Height-adjustable ergonomic desk designed for student comfort and focus. Easy to configure in rows or collaborative clusters.' },
      { name: 'Collaborative Round Table', subcategory: 'CLASSROOM', image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1000', description: 'Modular round table system enabling group discussions and project-based learning arrangements.' },
      { name: 'Acoustic Study Pod', subcategory: 'LIBRARY', image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?q=80&w=1000', badge: 'NEW ARRIVAL', description: 'Sound-dampening individual study enclosure with integrated lighting and USB charging.' },
      { name: 'Modular Bookshelf System', subcategory: 'LIBRARY', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000', description: 'Expandable bookshelf system with configurable compartment sizes for books, magazines, and digital hubs.' },
      { name: 'Bistro Seating Set', subcategory: 'CAFETERIA', image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=1000', description: 'Durable, easy-clean bistro tables and chairs designed for high-traffic school cafeterias.' },
      { name: 'Staff Executive Sofa', subcategory: 'OFFICE', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000', description: 'Premium office sofa for staff lounges and reception areas. Stain-resistant and easy to maintain.' },
    ]
  },
  // Architecture.jsx -> getProducts({ category: 'School Architecture' })
  {
    category: 'School Architecture',
    products: [
      { name: 'Campus Audit Pro', subcategory: 'EXTERIOR', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000', badge: 'MOST REQUESTED', description: 'Complete campus audit covering structural safety, space utilization, and compliance with NEP guidelines.' },
      { name: 'Zero-Energy Block Design', subcategory: 'EXTERIOR', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000', description: 'Passive building design with solar integration, natural ventilation systems, and net-zero energy targets.' },
      { name: 'Aura Campus Masterplan', subcategory: 'MASTERPLAN', image: 'https://images.unsplash.com/photo-1487958449943-2429e5be8622?q=80&w=1000', badge: 'AWARD WINNING', description: 'Holistic campus masterplan addressing zoning, future expansion zones, pedestrian flows, and green corridors.' },
      { name: 'Biophilic Courtyards', subcategory: 'LANDSCAPING', image: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?q=80&w=1000', description: 'Nature-integrated courtyard design with native plants, water features, and shaded learning zones.' },
      { name: 'Acoustic Hall Interior', subcategory: 'INTERIOR', image: 'https://images.unsplash.com/photo-1507646222501-49a37ad1c4f5?q=80&w=1000', description: 'Professional acoustic treatment of school halls and auditoriums for clear sound distribution.' },
    ]
  },
  // DigitalInfra.jsx -> getProducts({ category: 'Digital Infrastructure' })
  {
    category: 'Digital Infrastructure',
    products: [
      { name: 'Smart Board 4K Series', subcategory: 'SMART BOARDS', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000', badge: 'FEATURED', description: '4K ultra-wide interactive board with built-in Android OS, multi-touch support, and wireless screen sharing.' },
      { name: 'Interactive Touch Panel 85"', subcategory: 'SMART BOARDS', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000', description: '85-inch 4K touch display with integrated lesson planning software and cloud content sync.' },
      { name: 'Campus Wi-Fi 6 AP Matrix', subcategory: 'NETWORKING', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000', description: 'Pre-planned access point deployment for dense school environments ensuring 100% campus coverage at 1 Gbps.' },
      { name: 'High-Density Server Rack', subcategory: 'SERVERS', image: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?q=80&w=1000', badge: 'ENTERPRISE', description: 'Fully managed server rack solution including setup, cooling management, and remote monitoring.' },
      { name: 'AI Access Control Gates', subcategory: 'SECURITY', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000', description: 'Facial recognition-based school entry gates with visitor management and real-time attendance logging.' },
    ]
  },
  // SchoolDesigns.jsx -> getProducts({ category: 'School Designs' })
  {
    category: 'School Designs',
    products: [
      { name: 'Modular STEM Hub', subcategory: 'CLASSROOMS', image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000', description: 'Reconfigurable classroom design with movable walls, maker-space zones, and STEM-ready power outlets.' },
      { name: 'Future-Ready Lab Layout', subcategory: 'LABORATORIES', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000', badge: 'INNOVATIVE', description: 'Lab interior design prioritizing safety, visibility, and collaborative bench configurations.' },
      { name: 'Multi-Purpose Indoor Arena', subcategory: 'SPORTS ARENAS', image: 'https://images.unsplash.com/photo-1574629810360-7efbb192569a?q=80&w=1000', description: 'Dual-function sports arena adaptable for basketball, badminton, and indoor athletics with retractable seating.' },
      { name: 'Grand Theater Acoustics', subcategory: 'AUDITORIUMS', image: 'https://images.unsplash.com/photo-1507646222501-49a37ad1c4f5?q=80&w=1000', description: 'Professional acoustic design for school auditoriums ensuring clarity at 500+ seat capacity.' },
    ]
  },
  // Libraries.jsx -> getProducts({ category: 'Libraries' })
  {
    category: 'Libraries',
    products: [
      { name: 'Silent Study Pods', subcategory: 'SEATING', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000', badge: 'POPULAR', description: 'Individual acoustic enclosures designed for deep focus reading with integrated task lighting.' },
      { name: 'Automated Book Return Kiosk', subcategory: 'DIGITAL KIOSKS', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000', description: 'Self-service RFID book return with automatic sorting and real-time catalogue update system.' },
      { name: 'Archive Mobile Shelves', subcategory: 'ARCHIVES', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000', description: 'Space-efficient compactus shelving system on rails for archiving up to 3x more books per sq. ft.' },
    ]
  },
  // Sports.jsx -> getProducts({ category: 'Sports Infrastructure' })
  {
    category: 'Sports Infrastructure',
    products: [
      { name: 'Olympic Basketball Court', subcategory: 'INDOOR', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000', badge: 'FIBA APPROVED', description: 'FIBA-specification hardwood basketball court with professional lighting rig and dual scoreboard system.' },
      { name: 'All-Weather Football Turf', subcategory: 'OUTDOOR', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1000', description: 'FIFA-quality synthetic turf with perforated drainage, UV stabilizers, and low-maintenance shock pad.' },
      { name: 'Professional Weight Room', subcategory: 'GYMNASIUM', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000', description: 'Fully equipped weight training facility with rubber flooring, ventilation, and certified equipment layout.' },
    ]
  },
  // Mathematics.jsx -> getProducts({ category: 'Gamified Math Labs' })
  {
    category: 'Gamified Math Labs',
    products: [
      { name: 'Advanced Geometric Shapes Kit', subcategory: 'MANIPULATIVES', image: 'https://images.unsplash.com/photo-1632516444005-724d2bd5e9ec?q=80&w=1000', badge: 'NEP ALIGNED', description: '200-piece geometric manipulative set covering Euclidean and 3D geometry for grades 4-10.' },
      { name: 'Interactive Topology Display', subcategory: 'DISPLAY', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000', description: 'Large-format topology and number-line classroom display system with laminated dry-erase surface.' },
      { name: 'Fractal Software License Pack', subcategory: 'SOFTWARE', image: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=1000', description: 'Site license for GeoGebra, Desmos, and Math Open Reference covering all students campus-wide.' },
    ]
  },
  // Science.jsx -> getProducts({ category: 'Science Is Fun' })
  {
    category: 'Science Is Fun',
    products: [
      { name: 'Electron Microscope Pro', subcategory: 'BIOLOGY', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000', badge: 'HIGH SPEC', description: '1000x compound microscope with USB camera output and prepared slide storage tray for biology labs.' },
      { name: 'Chemical Fume Hood', subcategory: 'CHEMISTRY', image: 'https://images.unsplash.com/photo-1581093196277-9f608109ca46?q=80&w=1000', description: 'Ducted fume hood with 0.5m/s face velocity, acid-resistant work surface, and built-in emergency wash.' },
      { name: 'Kinematics Track System', subcategory: 'PHYSICS', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000', description: 'Complete 2m aluminum track with motion sensors, trolleys, and data-logging interface for mechanics experiments.' },
    ]
  },
  // LabsLibraries.jsx -> getProducts({ category: 'Composite Skill Labs' })
  {
    category: 'Composite Skill Labs',
    products: [
      { name: 'Polymer 3D Printer Farm', subcategory: '3D PRINTING', image: 'https://images.unsplash.com/photo-1581093355088-34ee464fdff4?q=80&w=1000', badge: 'LATEST', description: 'Fleet of 6 FDM printers with print management software, multi-filament support, and student safety guards.' },
      { name: 'Autonomous Robotics Arena', subcategory: 'ROBOTICS', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000', description: 'Modular competition arena with programmable obstacle zones for Arduino and Raspberry Pi robotics projects.' },
      { name: 'VR Anatomy Simulator', subcategory: 'VIRTUAL REALITY', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000', description: 'Standalone VR headsets with pre-loaded human anatomy and chemistry lab simulations for grades 9-12.' },
    ]
  },
];

// Also update sidebar_categories in the CMS to match exactly
const SIDEBAR_CATS = {
  furniture: ['CLASSROOM', 'LIBRARY', 'CAFETERIA', 'OFFICE'],
  architecture: ['EXTERIOR', 'INTERIOR', 'LANDSCAPING', 'MASTERPLAN', 'FACILITIES'],
  digital: ['SMART BOARDS', 'NETWORKING', 'SERVERS', 'SECURITY', 'COMPUTER LAB'],
  design: ['CLASSROOMS', 'LABORATORIES', 'SPORTS ARENAS', 'AUDITORIUMS'],
  libraries: ['SEATING', 'ARCHIVES', 'DIGITAL KIOSKS'],
  sports: ['INDOOR', 'OUTDOOR', 'GYMNASIUM', 'AQUATICS'],
  mathematics: ['MANIPULATIVES', 'DISPLAY', 'SOFTWARE', 'GEOMETRY KITS'],
  science: ['BIOLOGY', 'CHEMISTRY', 'PHYSICS', 'ASTRONOMY'],
  labs: ['3D PRINTING', 'ROBOTICS', 'VIRTUAL REALITY', 'CODING'],
};

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart');
  console.log('✅ Connected to MongoDB\n');

  // STEP 1: Wipe everything
  const deleted = await Product.deleteMany({});
  console.log(`🗑️  Deleted ${deleted.deletedCount} old products\n`);

  // STEP 2: Reseed with clean data
  let total = 0;
  for (const group of SEED_DATA) {
    for (const prod of group.products) {
      await Product.create({
        name: prod.name,
        category: group.category,
        subcategory: prod.subcategory,
        image: prod.image,
        badge: prod.badge || '',
        description: prod.description || '',
        isActive: true,
        stats: [
          { label: 'Quality', value: 'ISO CERTIFIED' },
          { label: 'Install', value: '24-48 HOURS' },
          { label: 'Standard', value: 'NEP ALIGNED' },
        ],
        resources: [
          { name: 'Technical Specifications', url: '/docs/spec.pdf', size: '2.4 MB' },
          { name: 'Installation Guide', url: '/docs/guide.pdf', size: '1.8 MB' },
        ]
      });
      total++;
    }
    console.log(`✅ Seeded ${group.products.length} products for "${group.category}"`);
  }

  // STEP 3: Fix sidebar categories in CMS
  console.log('\n🔧 Fixing sidebar categories in CMS...');
  for (const [slug, cats] of Object.entries(SIDEBAR_CATS)) {
    const page = await Page.findOne({ pageSlug: slug });
    if (!page) { console.log(`  ⚠️ No page found for ${slug}`); continue; }
    
    let block = page.blocks.find(b => b.blockType === 'sidebar_categories');
    if (block) {
      block.data = { categories: cats };
    } else {
      page.blocks.push({ blockType: 'sidebar_categories', data: { categories: cats }, isVisible: true, order: 90 });
    }
    await page.save();
    console.log(`  ✅ ${slug}: [${cats.join(', ')}]`);
  }

  console.log(`\n✅ Done! Total products in DB: ${total}`);
  process.exit();
}
run().catch(console.error);
