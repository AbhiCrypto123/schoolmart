// scripts/seed.js  â€” seeds all existing frontend data into MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const User = require('../models/User');
const Page = require('../models/Page');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('âœ… Connected to MongoDB');

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 1. Admin User
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const adminExists = await User.findOne({ email: 'admin@schoolmart.in' });
  if (!adminExists) {
    await User.create({
      name: 'SchoolMart Admin',
      email: 'admin@schoolmart.in',
      password: await bcrypt.hash('Admin@123', 10),
      role: 'admin',
      isVerified: true,
    });
    console.log('âœ… Admin user created: admin@schoolmart.in / Admin@123');
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 2. Pages CMS Data
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const pages = [

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOME PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'home',
      pageTitle: 'Home',
      blocks: [
        {
          blockType: 'topbar',
          order: 0,
          data: {
            email: 'info@schoolmart.in',
            phone1: '+91 9966109191',
            phone2: '+91 9866091111',
            socials: {
              facebook: 'https://www.facebook.com/schoolmart.in',
              twitter: 'https://twitter.com/schoolmarts',
              instagram: 'https://www.instagram.com/schoolmart.in/',
              linkedin: 'https://www.linkedin.com/school/schoolmart-india/',
            },
          },
        },
        {
          blockType: 'navbar',
          order: 1,
          data: {
            logo: { title: 'SCHOOL MART', tagline: 'everything a school needs' },
            navLinks: [
              { name: 'Home', path: '/' },
              { name: 'Corporate', path: '/corporate', dropdown: [
                  { name: 'About Us', path: '/aboutus' },
                  { name: 'Manufacturing', path: '/manufacturing' },
              ]},
              { name: 'Catalogues', path: '/catalogues' },
              { name: 'Environments', path: '/environments' },
              { name: 'SHOP', path: 'http://www.schoolmart.store', external: true },
              { name: 'GUIDES', path: '/guides' },
              { name: 'Contact Us', path: '/contact-us' },
            ],
            categories: [
              { name: 'FURNITURE', path: '/furniture', icon: 'Armchair' },
              { name: 'ARCHITECTURE', path: '/school-building-design', icon: 'Building2' },
              { name: 'DIGITAL INFRA', path: '/digital', icon: 'Laptop' },
              { name: 'SCHOOL DESIGNS', path: '/design', icon: 'Palette' },
              { name: 'LIBRARIES', path: '/libraries', icon: 'BookOpen' },
              { name: 'SPORTS', path: '/sports', icon: 'Trophy' },
              { name: 'MATHEMATICS', path: '/gamified-math-labs', icon: 'Calculator' },
              { name: 'SCIENCE', path: '/science-is-fun', icon: 'FlaskConical' },
              { name: 'LABS', path: '/labs', icon: 'Library' },
            ],
          },
        },
        {
          blockType: 'ticker',
          order: 2,
          data: {
            label: 'Latest Updates',
            items: [
              'Digital Transformation Summit: 15 May 2026',
              'New AI-Powered Learning Stations now available for pre-order',
              'Join our upcoming Campus Design Webinar on 15th April 2026',
              'Annual Sports Meet Registrations closing soon',
              'New Sustainable Furniture Catalogue Launched',
            ],
          },
        },
        {
          blockType: 'hero',
          order: 3,
          data: {
            badge: 'Price Â· Quality Â· Range Promise',
            headline1: 'FURNITURE',
            headline2: 'QUICK DELIVERY',
            subline1: 'Order Now',
            subline2: 'Kindergarten Â· Highschools Â· Labs Â· Libraries',
            cta1: { label: 'Shop Furniture â†’', path: '/furniture' },
            cta2: { label: 'View Catalogue', path: '/catalogues' },
          },
        },
        {
          blockType: 'tiles',
          order: 4,
          data: {
            tiles: [
              { title: 'IMMERSIVE LEARNING', subtitle: 'VR & AR in Education', path: '/digital', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
              { title: 'KINDERGARTEN DESIGN', subtitle: 'Playful Learning Spaces', path: '/design', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
              { title: 'COMPOSITE SKILL LABS', subtitle: 'Future-Ready Education', path: '/labs', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80' },
              { title: 'LIBRARY INNOVATIONS', subtitle: 'Modern Reading Spaces', path: '/labs', img: '/images/card_library.png' },
              { title: 'FURNITURE DESIGN & PLANNING', subtitle: 'Custom Solutions', path: '/furniture', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80' },
              { title: 'SELLING OR BUYING A SCHOOL', subtitle: 'CHECK OPPORTUNITIES WITH US', path: '/school-sale', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', featured: true },
              { title: 'GAMIFIED MATH LABS', subtitle: 'Learn Math Through Play', path: '/gamified-math-labs', img: 'https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=600&q=80' },
              { title: 'INTERACTIVE WALLS', subtitle: 'Engaging Learning Tools', path: '/digital', img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80' },
              { title: '16 LATEST INTERACTIVE PANELS', subtitle: 'FOR CLASSROOMS', path: '/digital', img: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=600&q=80' },
              { title: 'WONDERGARTENS', subtitle: 'Magical Learning Spaces', path: '/environments', img: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&q=80' },
              { title: '20+ AI TOOLS FOR CLASSROOMS', subtitle: 'WITH TRAINING SUPPORT', path: '/digital', img: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&q=80' },
              { title: 'SMART SPORTS FOR SCHOOLS', subtitle: 'Next-Gen Sports Infrastructure', path: '/sports', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80' },
            ],
          },
        },
        {
          blockType: 'solutions',
          order: 5,
          data: {
            heading: 'Explore Our Solutions',
            viewAllPath: '/catalogues',
            items: [
              { title: 'School Furniture', description: '1200+ ergonomic products for every classroom, lab and library', path: '/furniture', badge: { label: 'Furniture', color: '#F97316' }, img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80' },
              { title: 'Digital Infrastructure', description: 'Cutting-edge ed-tech, interactive panels and smart classrooms', path: '/digital', badge: { label: 'Technology', color: '#3B82F6' }, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80' },
              { title: 'Sports Infrastructure', description: 'Professional-grade courts, equipment and sports facilities', path: '/sports', badge: { label: 'Sports', color: '#22C55E' }, img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80' },
              { title: 'School Architecture', description: 'NEP-ready campus planning and interior design by expert architects', path: '/school-building-design', badge: { label: 'Architecture', color: '#8B5CF6' }, img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80' },
              { title: 'Learning Environments', description: 'STEM labs, libraries, maker-spaces and activity rooms', path: '/environments', badge: { label: 'Environments', color: '#0EA5E9' }, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80' },
              { title: 'School Design & Planning', description: 'End-to-end campus setup, expansion and renovation services', path: '/design', badge: { label: 'Design', color: '#EC4899' }, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
            ],
          },
        },
        {
          blockType: 'sidebar_trending',
          order: 6,
          data: {
            items: ['Schools for Sale / Lease', 'Fundraising', 'Partnerships', 'Workshops'],
          },
        },
        {
          blockType: 'sidebar_resources',
          order: 7,
          data: {
            items: [
              'Complete guide to digitization',
              'Setting Up A School In India',
              'Product catalog 2025',
              'How to setup composite skill lab?',
              'Lookbook â€“ Play Furniture',
              'Gamified math resources',
              'Completed projects',
              '20 stunning school design ideas',
              'Library trends',
              'JOB OPENINGS',
              'Join as Influencers',
            ],
          },
        },
        {
          blockType: 'sidebar_banners',
          order: 8,
          data: {
            banners: [
              { label: 'Products for', sublabel: 'Govt Schools', color: '#0057A8', path: '/govt' },
              { label: 'School Renovation', sublabel: 'Services', color: '#9333ea', path: '/renovation' },
              { label: '20 Smart School Ideas', sublabel: '', color: '#f97316', path: '/ideas' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 9,
          data: {
            badge: 'Direct Consultation',
            headline: 'Ready to scale your campus?',
            description: 'At SchoolMart, we provide end-to-end expertise in guiding you to set up your new campus project. From spatial planning to high-density procurement, we help you maximize ROI and institutional growth.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
        {
          blockType: 'partners',
          order: 10,
          data: {
            heading: 'Trusted by Leading Schools',
            subheading: '4000+ partner schools across India',
            clients: [
              { name: 'AVN Vida International School', icon: 'GraduationCap', color: 'text-blue-600' },
              { name: 'Alwar Das Group', icon: 'School', color: 'text-orange-600' },
              { name: 'DRS International School', icon: 'BookOpen', color: 'text-purple-600' },
              { name: 'Bhashyam Educational Institutions', icon: 'Building2', color: 'text-red-600' },
              { name: 'Excel Edge The Value School', icon: 'Award', color: 'text-green-600' },
              { name: 'Delhi Public School', icon: 'GraduationCap', color: 'text-indigo-600' },
              { name: 'DAV Public School', icon: 'School', color: 'text-teal-600' },
              { name: 'Podar International', icon: 'BookOpen', color: 'text-pink-600' },
              { name: 'CMS School', icon: 'Building2', color: 'text-amber-600' },
              { name: 'VIBGYOR Group', icon: 'Award', color: 'text-cyan-600' },
            ],
            stats: [
              { value: '4000+', label: 'Partner Schools', color: 'text-blue-600' },
              { value: '7+', label: 'Years Experience', color: 'text-green-600' },
              { value: '1200+', label: 'Products', color: 'text-orange-600' },
              { value: '16+', label: 'Panel Architects', color: 'text-purple-600' },
            ],
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ FURNITURE PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'furniture',
      pageTitle: 'Furniture',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'School Furniture',
            subtitle: '1200+ ergonomic products for every learning space',
            bgGradient: 'from-blue-900 to-blue-700',
            img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Our Furniture Range',
            cards: [
              { title: 'Classroom Furniture', description: 'Ergonomic desks and chairs for every grade', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', path: '/furniture' },
              { title: 'Library Furniture', description: 'Reading tables, shelving systems and lounge areas', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=80', path: '/libraries' },
              { title: 'Lab Furniture', description: 'ESD-safe workbenches and storage for science labs', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80', path: '/labs' },
              { title: 'Staff Room Furniture', description: 'Comfortable and functional staff workspace solutions', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', path: '/furniture' },
              { title: 'Kindergarten Furniture', description: 'Colourful, fun and safe furniture for young learners', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', path: '/furniture' },
              { title: 'Outdoor Furniture', description: 'Durable seating and play structures for school grounds', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80', path: '/furniture' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Get a Custom Quote',
            headline: 'Need furniture in bulk?',
            description: 'We supply to 4000+ schools across India. Get the best pricing for your requirements.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ ARCHITECTURE PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'architecture',
      pageTitle: 'School Architecture',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'School Building Design',
            subtitle: 'NEP-ready campus planning by expert architects',
            bgGradient: 'from-purple-900 to-purple-700',
            img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Architecture Services',
            cards: [
              { title: 'Campus Master Planning', description: 'Complete blueprint for your school campus', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', path: '/school-building-design' },
              { title: 'Interior Design', description: 'Modern, inspiring interiors for learning spaces', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80', path: '/school-building-design' },
              { title: 'Green Buildings', description: 'Eco-friendly and sustainable school construction', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', path: '/school-building-design' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Free Consultation',
            headline: 'Planning a new campus?',
            description: 'Our expert architects will help you design the school of the future.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ DIGITAL INFRA PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'digital',
      pageTitle: 'Digital Infrastructure',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'Digital Infrastructure',
            subtitle: 'Smart classrooms, AI tools and interactive panels',
            bgGradient: 'from-blue-900 to-cyan-700',
            img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Digital Solutions',
            cards: [
              { title: 'Interactive Panels', description: '16 latest models for smart classrooms', img: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=600&q=80', path: '/digital' },
              { title: 'VR / AR Learning', description: 'Immersive experiences for deeper understanding', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', path: '/digital' },
              { title: 'AI Tools for Classrooms', description: '20+ curated AI tools with full teacher training', img: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&q=80', path: '/digital' },
              { title: 'Interactive Walls', description: 'Transform blank walls into learning surfaces', img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80', path: '/digital' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Smart Campus',
            headline: 'Ready to go digital?',
            description: 'Transform your school with cutting-edge technology.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ SPORTS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'sports',
      pageTitle: 'Sports Infrastructure',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'Sports Infrastructure',
            subtitle: 'Professional-grade facilities for school athletics',
            bgGradient: 'from-green-900 to-green-700',
            img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Sports Solutions',
            cards: [
              { title: 'Indoor Courts', description: 'Professional flooring for basketball, badminton, volleyball', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80', path: '/sports' },
              { title: 'Outdoor Fields', description: 'Athletic tracks, football fields and cricket pitches', img: 'https://images.unsplash.com/photo-1551958219-acbc22fa72b7?w=600&q=80', path: '/sports' },
              { title: 'Sports Equipment', description: 'Complete kits for 25+ sports disciplines', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80', path: '/sports' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Sports Excellence',
            headline: 'Build a world-class sports facility',
            description: 'From design to installation, we cover every aspect of school sports infrastructure.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ LIBRARIES PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'libraries',
      pageTitle: 'Libraries',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'Library Innovations',
            subtitle: 'Modern reading spaces and digital libraries',
            bgGradient: 'from-amber-900 to-amber-700',
            img: '/images/card_library.png',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Library Solutions',
            cards: [
              { title: 'Reading Zones', description: 'Cozy, well-lit spaces designed to encourage reading', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=80', path: '/libraries' },
              { title: 'Digital Libraries', description: 'E-readers, tablets and digital resource management', img: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=600&q=80', path: '/libraries' },
              { title: 'Shelving Systems', description: 'Durable, space-efficient cataloguing and shelving', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80', path: '/libraries' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Modern Libraries',
            headline: 'Inspire a love for reading',
            description: 'We design libraries that students want to spend time in.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ ENVIRONMENTS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'environments',
      pageTitle: 'Learning Environments',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'Learning Environments',
            subtitle: 'STEM labs, maker-spaces, and activity rooms',
            bgGradient: 'from-sky-900 to-sky-700',
            img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Environment Types',
            cards: [
              { title: 'STEM Labs', description: 'Purpose-built labs for science, tech and engineering', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80', path: '/environments' },
              { title: 'Maker Spaces', description: 'Creative zones for project-based learning', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', path: '/environments' },
              { title: 'Wondergartens', description: 'Magical outdoor and indoor play-learn environments', img: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&q=80', path: '/environments' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Learning Spaces',
            headline: 'Design the perfect learning environment',
            description: 'We create spaces that inspire curiosity and collaborative thinking.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ ABOUT US PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'aboutus',
      pageTitle: 'About Us',
      blocks: [
        {
          blockType: 'about_hero',
          order: 0,
          data: {
            title: 'About SchoolMart',
            subtitle: 'Empowering Schools Since 2017',
            description: "SchoolMart is India's leading school infrastructure and solutions company. We partner with schools across the country to deliver high-quality furniture, digital infrastructure, sports facilities, and architectural design services â€” all under one roof.",
            img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
          },
        },
        {
          blockType: 'stats',
          order: 1,
          data: {
            stats: [
              { value: '4000+', label: 'Partner Schools' },
              { value: '7+', label: 'Years Experience' },
              { value: '1200+', label: 'Products' },
              { value: '16+', label: 'Panel Architects' },
            ],
          },
        },
        {
          blockType: 'mission_vision',
          order: 2,
          data: {
            mission: "To make quality school infrastructure accessible and affordable for every school in India.",
            vision: "To be the most trusted partner for school setup, upgrade, and management across South Asia.",
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ CONTACT US PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'contact-us',
      pageTitle: 'Contact Us',
      blocks: [
        {
          blockType: 'contact_page_content',
          order: 0,
          data: {
            hero: {
              badge: 'Connect with Experts',
              titleHtml: 'Let\'s Build \n The Future \n <span class="text-sm-blue italic font-serif tracking-[0.05em]">Together.</span>',
              subtitle: 'From architectural blueprints to furniture installations, we assist you in every step.',
              email: 'info@schoolmart.in',
              phone: '+91 888 444 1234',
            },
            quoteBox: {
              title: 'GET A QUOTE',
              subtitle: 'Tailored Solutions for Your School',
              btnText: 'Connect',
            },
            accessCards: [
              { i: 'Video', t: 'Video Consultation', d: 'Schedule a virtual tour.', c: 'bg-emerald-50 text-emerald-600' },
              { i: 'Calendar', t: 'Site Visit', d: 'Invite our experts.', c: 'bg-orange-50 text-orange-600' },
              { i: 'MapPin', t: 'Registered Hub', d: 'Visit our flagship office.', c: 'bg-blue-50 text-blue-600' },
              { i: 'Clock', t: '24/7 Support', d: 'Round the clock assistance.', c: 'bg-purple-50 text-purple-600' },
            ],
            faq: {
              title: 'Common Queries.',
              subtitle: 'Institutional Service & Support FAQ',
              items: [
                { q: 'Pan-India Installation Support?', a: 'Yes, we maintain a robust service network across 22 states for seamless on-site assembly.' },
                { q: 'Typical Project Lead Times?', a: 'Standard production cycles range from 4-6 weeks depending on the scale of furniture & tech.' },
                { q: 'NEP 2020 Compliance Status?', a: 'Our entire catalog is 100% aligned with NEP 2020 guidelines and global safety protocols.' },
                { q: 'Institutional Site Planning?', a: 'Our design experts offer end-to-end architectural layouts and ergonomics consulting.' },
                { q: 'Bulk Procurement Discounts?', a: 'We offer tiered pricing for large-scale institutional projects and government tenders.' },
                { q: 'Software & Content Updates?', a: 'Digital solution clients receive quarterly OTA updates for all curriculum-aligned software.' },
              ]
            }
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ MATHEMATICS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'mathematics',
      pageTitle: 'Gamified Math Labs',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'Gamified Math Labs',
            subtitle: 'Learn mathematics through play and exploration',
            bgGradient: 'from-violet-900 to-violet-700',
            img: 'https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Math Lab Solutions',
            cards: [
              { title: 'Manipulatives & Kits', description: 'Hands-on tools to visualize mathematical concepts', img: 'https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=600&q=80', path: '/gamified-math-labs' },
              { title: 'Digital Math Games', description: 'Tablet-based games aligned to NCERT curriculum', img: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&q=80', path: '/gamified-math-labs' },
              { title: 'Math Lab Setup', description: 'Complete room design and equipment supply', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', path: '/gamified-math-labs' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Math Labs',
            headline: 'Make math fun for every student',
            description: 'Our gamified labs are transforming how schools teach mathematics.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ SCIENCE PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'science',
      pageTitle: 'Science Is Fun',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'Science Is Fun',
            subtitle: 'Interactive labs and experiments for curious minds',
            bgGradient: 'from-teal-900 to-teal-700',
            img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Science Lab Solutions',
            cards: [
              { title: 'Physics Labs', description: 'Modern equipment for mechanics, optics and electricity', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80', path: '/science-is-fun' },
              { title: 'Chemistry Labs', description: 'Safe, fully-equipped chemistry workbenches', img: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=600&q=80', path: '/science-is-fun' },
              { title: 'Biology Labs', description: 'Microscopes, models and live specimens', img: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=600&q=80', path: '/science-is-fun' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Science Labs',
            headline: 'Ignite scientific curiosity',
            description: 'Fully equipped science labs from primary to senior secondary.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ LABS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'labs',
      pageTitle: 'Composite Skill Labs',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'Composite Skill Labs',
            subtitle: 'Future-ready skill development spaces for schools',
            bgGradient: 'from-rose-900 to-rose-700',
            img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Skill Lab Types',
            cards: [
              { title: 'Coding & Robotics', description: 'Age-appropriate coding tools and robot kits', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', path: '/labs' },
              { title: 'Art & Craft Studio', description: 'Creative space for visual arts, pottery and crafts', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', path: '/labs' },
              { title: 'Vocational Labs', description: 'Industry-standard equipment for vocational training', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', path: '/labs' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'Skill Labs',
            headline: 'Prepare students for the future',
            description: 'Composite skill labs help students develop 21st century competencies.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ SCHOOL DESIGNS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'design',
      pageTitle: 'School Designs',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'School Design & Planning',
            subtitle: 'End-to-end campus setup, expansion and renovation',
            bgGradient: 'from-pink-900 to-pink-700',
            img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
          },
        },
        {
          blockType: 'feature_cards',
          order: 1,
          data: {
            heading: 'Design Services',
            cards: [
              { title: 'New School Setup', description: 'Complete turnkey setup from land to launch', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', path: '/design' },
              { title: 'Renovation & Upgrade', description: 'Transform your existing school infrastructure', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80', path: '/design' },
              { title: 'NEP Compliance', description: 'Align your campus to National Education Policy standards', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', path: '/design' },
            ],
          },
        },
        {
          blockType: 'cta_whatsapp',
          order: 2,
          data: {
            badge: 'School Design',
            headline: 'Design your dream school',
            description: 'We design schools that are functional, beautiful, and future-ready.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191',
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ MANUFACTURING PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // ───────────────── MANUFACTURING PAGE ─────────────────
    {
      pageSlug: 'manufacturing',
      pageTitle: 'Manufacturing',
      blocks: [
        {
          blockType: 'manufacturing_hero',
          order: 0,
          data: {
            badge: 'In-House Precision',
            titleHtml: 'Look At <br/> <span class="text-[#004a8e]">Schoolmart\'s</span> <br/> Manufacturing.',
            description: 'WE TAKE PRIDE IN OUR IN-HOUSE MANUFACTURING FACILITIES, WHICH ENCOMPASS MODULAR FURNITURE MACHINERY, SOLID WOOD MANUFACTURING, METAL WORKS, AND POWDER COATING.',
            images: [
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
              'https://images.unsplash.com/photo-1565034946487-077786996e27?w=600&q=80'
            ],
            partnerStat: '4K+',
            partnerLabel: 'Partner Schools'
          }
        },
        {
          blockType: 'manufacturing_capabilities',
          order: 1,
          data: {
            heading: 'Core Capabilities',
            subline: 'Institutional Grade Execution',
            items: [
              { t: 'Modular Furniture', d: 'High-precision systems for institutional scalability.', u: 'WOODWORKING', icon: 'Layers' },
              { t: 'Solid Wood Unit', d: 'Traditional craftsmanship integrated with modern tech.', u: 'ARTISANAL', icon: 'PenTool' },
              { t: 'Advanced Metal Works', d: 'Industrial grade fabrication for heavy-use environments.', u: 'STRUCTURAL', icon: 'Box' },
              { t: 'Powder Coating Lab', d: 'automated durability finishes for zero-maintenance results.', u: 'FINISHING', icon: 'Drill' },
              { t: 'Robotic Welding', d: 'Consistent precision in structural joint integrity.', u: 'P.4.0 SYSTEMS', icon: 'Cpu' },
              { t: 'Internal R&D', d: 'Continuous improvement on ergonomics and materials.', u: 'INNOVATION', icon: 'Microscope' }
            ]
          }
        },
        {
          blockType: 'manufacturing_quality',
          order: 2,
          data: {
            titleHtml: 'Quality <br/> <span class="not-italic text-[#004a8e]">Assurance.</span>',
            description: 'OUR STATE-OF-THE-ART MANUFACTURING FACILITIES ADHERE TO STRINGENT QUALITY TESTING PRACTICES.',
            boxes: [
              { t: 'Material Selection', d: 'Sourcing of high-grade raw materials with verified stress-test certificates.', icon: 'ShieldCheck' },
              { t: 'Technical Inspection', d: 'Multi-stage QC checkpoints ensuring zero-defect production cycles.', icon: 'Zap' }
            ]
          }
        },
        {
          blockType: 'cta_whatsapp',
          order: 3,
          data: {
            headline: 'Institutional Infrastructure Excellence.',
            description: 'AN INITIATIVE OF THE THIRDEYE GROUP, UTILIZING PROPRIETARY IN-HOUSE MANUFACTURING UNITS ACROSS INDIA.',
            stats: [
              { value: '7+', label: 'YEARS EXP' },
              { value: '100%', label: 'IN-HOUSE' }
            ],
            whatsappNumber: '919966109191'
          }
        }
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ CORPORATE PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // ───────────────── CORPORATE PAGE ─────────────────
    {
      pageSlug: 'corporate',
      pageTitle: 'Corporate',
      blocks: [
        {
          blockType: 'corporate_hero',
          order: 0,
          data: {
            badge: 'Foundational Intelligence',
            titleHtml: 'All About <br/> <span class="text-[#004a8e] italic font-serif lowercase tracking-normal">Schoolmart</span> <br/> Consortium.',
            description: 'SCHOOL MART IS A ONE STOP FOR ALL SCHOOL INFRASTRUCTURE NEEDS. A CONSORTIUM OF 16 PANEL ARCHITECTS, 20+ DESIGNERS, SCHOOL INNOVATORS, & EDTECH MAJORS WORKING FROM 4 COUNTRIES.',
            ctaPitchDeck: 'Request Pitch Deck',
            ctaWhatsapp: 'WhatsApp',
            statsValue: '22',
            statsLabel: 'States Active Operational Network'
          }
        },
        {
          blockType: 'corporate_ecosystem',
          order: 1,
          data: {
            items: [
              { t: 'Furniture', icon: 'Briefcase' },
              { t: 'Architecture', icon: 'Building2' },
              { t: 'Digital Infra', icon: 'Laptop' },
              { t: 'School Designs', icon: 'Palette' },
              { t: 'Digital Content', icon: 'Monitor' },
              { t: 'Sports', icon: 'Trophy' },
              { t: 'Mathematics', icon: 'CheckCircle2' },
              { t: 'Science', icon: 'FlaskConical' },
              { t: 'Labs / Libraries', icon: 'Library' },
              { t: 'School Branding', icon: 'Target' },
              { t: 'AR + VR Learning', icon: 'Zap' },
              { t: 'Innovation', icon: 'Sparkles' }
            ]
          }
        },
        {
          blockType: 'corporate_strategy',
          order: 2,
          data: {
            badge: 'Strategic Advisory',
            title: 'Consultancy At Board Level.',
            description: 'Exposé to latest innovations and edtech products at a lesser price for partner schools.',
            points: ['IN-HOUSE MANUFACTURING', 'EDTECH INNOVATION ACCESS', 'GAMIFICATION SPECIALISTS', 'GLOBAL ARCHITECTURAL PANEL']
          }
        },
        {
          blockType: 'corporate_pillars',
          order: 3,
          data: {
            pillars: [
              { t: 'Quality Protocol', d: 'All products hold TS and ISO 9001 certifications. Durability, performance, and safety tests are audited by experts.', u: 'Standards', icon: 'ShieldCheck' },
              { t: 'Rapid R&D', d: 'Iterative laboratory development ensures we stay at the forefront of global innovation.', u: 'Innovation', icon: 'Microscope' },
              { t: 'Global Logistics', v: 'A rapidly growing network focused on mass production and efficient delivery.', u: 'Supply Chain', icon: 'Globe' },
              { t: 'Expert Design', d: '16 Architects & 20+ Designers creating ergonomic spaces that promote creativity.', u: 'Architecture', icon: 'PenTool' }
            ]
          }
        },
        {
          blockType: 'cta_whatsapp',
          order: 4,
          data: {
            headline: 'Ready To Talk?',
            description: 'WE HAVE THE EXPERTISE IN GUIDING YOU TO SET UP YOUR NEW CAMPUS PROJECT AND MAXIMIZE PERFORMANCE.',
            whatsappNumber: '919966109191',
            phone: '+91 9966109191'
          }
        }
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ CATALOGUES PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'environments',
      pageTitle: 'Environments',
      blocks: [
        {
          blockType: 'environments_page_content',
          order: 0,
          data: {
            hero: {
              badge: 'Sensory Hub 2025',
              titleHtml: 'Atmosphere <br/> <span class="text-sm-blue italic font-serif lowercase tracking-normal text-left">is</span> <br/> Everything.',
              subtitle: 'Harmonizing architectural sensory design to stimulate deep academic performance.',
            },
            actionCard: {
              titleHtml: 'Request <br/> Environment <br/> Audit Survey.',
              btnText: 'Apply Online',
            },
            heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
            subBlocks: [
              { title: 'Eco Materials', subtitle: 'SUSTAINABLE', icon: 'Leaf' },
              { title: 'Sound Control', subtitle: 'ACOUSTICS', icon: 'Wind' },
              { title: 'Digital Lighting', subtitle: 'LUMENS V2', icon: 'Sun' },
            ],
            infoGrid: {
              titleHtml: 'Engineering <span class="text-sm-blue">Atmospheres.</span>',
              points: ['CFD Modeled', 'Acoustic Labs', 'UV Protected', 'Ergo Tech'],
              img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80',
            },
            masonryItems: [
              { t: 'Natural Light Study', c: 'Optics', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', h: 'h-[220px]' },
              { t: 'Acoustic Panel Grid', c: 'Sound', img: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=600&q=80', h: 'h-[280px]' },
              { t: 'Biophilic Design', c: 'Nature', img: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80', h: 'h-[250px]' },
              { t: 'Air Quality Lab', c: 'Climate', img: 'https://images.unsplash.com/photo-1581093196277-9f608109ca46?w=800&q=80', h: 'h-[220px]' },
              { t: 'Botanical Courtyard', c: 'Organic', img: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&q=80', h: 'h-[310px]' },
              { t: 'Zen Meditation Pod', c: 'Focus', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80', h: 'h-[250px]' },
            ],
          },
        },
      ],
    },

    {
      pageSlug: 'catalogues',
      pageTitle: 'Catalogues',
      blocks: [
        {
          blockType: 'page_hero',
          order: 0,
          data: {
            title: 'Product Catalogues',
            subtitle: 'Download our complete product range',
            bgGradient: 'from-indigo-900 to-indigo-700',
            img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
          },
        },
        {
          blockType: 'catalogues_page_content',
          order: 1,
          data: {
            libraryHero: {
              badge: 'Digital Library 2025',
              titleHtml: 'Digital <br/> <span class="text-sm-blue italic font-serif lowercase tracking-normal">Infrastructure.</span>',
              subtitle: 'Deep-dive into our comprehensive institutional catalogues and design handbooks.',
            },
            actionStrip: {
              title: '2025 Master Catalogue.',
              subtitle: 'Complete range of ergonomic campus solutions for modern schools.',
              btn1Text: 'Instant PDF',
              btn2Text: 'Share Hub',
            },
            resourceTiles: ['Technical Specs', 'Compliance Guide', 'Design Portfolio'],
            menuStrip: ['MASTER 2025', 'FURNITURE', 'INFRASTRUCTURE', 'RESOURCES', 'AUDIT INDICES'],
            infoGrid: {
              titleHtml: 'Knowledge <span class="text-sm-blue">Infrastructure.</span>',
              points: ['Verified Specs', 'Compliance Audit', 'Future Ready', 'BIFMA Level-3'],
              img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1000&q=80',
            }
          },
        },
        {
          blockType: 'catalogues_list',
          order: 2,
          data: {
            catalogues: [
              { title: 'School Furniture Catalogue 2025', fileUrl: '#', description: 'Complete range of classroom, library and lab furniture', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80' },
              { title: 'Digital Infrastructure Guide', fileUrl: '#', description: 'Interactive panels, AI tools, VR/AR and smart classroom solutions', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80' },
              { title: 'Sports & Playground Catalogue', fileUrl: '#', description: 'Professional sports equipment and outdoor play solutions', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80' },
              { title: 'School Library Solutions', fileUrl: '#', description: 'Modern library furniture, shelving and digital library tools', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80' },
            ],
          },
        },
      ],
    },

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ GUIDES PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€
    {
      pageSlug: 'guides',
      pageTitle: 'Guides',
      blocks: [
        {
          blockType: 'guides_page_content',
          order: 0,
          data: {
            hero: {
              badge: 'Knowledge Base 2025',
              titleHtml: 'Strategy. <br/> <span class="text-sm-blue italic font-serif lowercase tracking-normal">for</span> <br/> Compliance.',
              subtitle: 'Deep-dive into our institutional strategy handbooks and regulatory frameworks.',
            },
            actionStrip: [
              { titleHtml: 'NEP 2024 <br/> Implementation Kit.', btnText: 'Download PDF', color: 'dark' },
              { titleHtml: 'Certification <br/> & <br/> Standards BIFMA.', color: 'light', icon: 'Award' },
              { titleHtml: 'Custom <br/> Institutional Portfolio.', btnText: 'Request Curation', color: 'light' },
            ],
            menuStrip: ['NEP 2020', 'SAFETY PROTOCOL', 'TECH SPECS', 'CERTIFICATIONS', 'SITE PLANNING'],
            resourceList: [
              { t: 'Safety Master-Guide', c: 'Logistics', img: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?w=600&q=80', h: 'h-[300px]' },
              { t: 'Spatial Planning', c: 'Design', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', h: 'h-[400px]' },
              { t: 'Color Psychology', c: 'Interiors', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', h: 'h-[350px]' },
            ],
            infoGrid: {
              titleHtml: 'Regulatory <span class="text-sm-blue">Frameworks.</span>',
              points: ['NEA Guidelines', 'Site Surveys', 'Compliance Audit', 'Future Ready'],
              img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80'
            }
          },
        },
        {
          blockType: 'guides_list',
          order: 1,
          data: {
            guides: [
              { title: 'Complete Guide to School Digitization', description: 'Step-by-step guide for digitizing your school', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', path: '#' },
              { title: 'Setting Up A School In India', description: 'Everything you need to know about starting a school', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', path: '#' },
              { title: 'How to Setup a Composite Skill Lab', description: 'Design, equipment and curriculum guide', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80', path: '#' },
              { title: '20 Stunning School Design Ideas', description: 'Inspiration for modern school interiors', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', path: '#' },
              { title: 'Library Trends 2025', description: 'Modern library concepts and furniture trends', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80', path: '#' },
            ],
          },
        },
      ],
    },

    // ───────────────── INSTITUTIONAL PAGES ─────────────────
    {
      pageSlug: 'school-sale',
      pageTitle: 'Buy/Sell/Lease Schools',
      blocks: [
        { blockType: 'inner_page_hero', data: { titleHtml: 'Institutional <br/> Exchange Hub.', subtitle: 'Direct marketplace for leasing, selling or acquisition of premium school properties across India.', theme: 'School Property' }, order: 0 },
        { blockType: 'listings', data: { items: [
          { 
            title: "Acquire a well-established Karnataka syllabus school with higher secondary capacity", 
            location: "Bengaluru, India", 
            type: "Sale", 
            price: "INR 10 Cr", 
            rating: "8.5", 
            img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=600&q=80",
            description: "Company operates a middle and higher primary school in Bengaluru specifically following the State Board curriculum. Strong residential catchment area with 800+ students.",
            runRate: "INR 64 Lakh",
            margin: "20 - 25 %",
            stake: "100%"
          },
          { 
            title: "Investment opportunity for a CBSE-affiliated school and degree college operating in Agra", 
            location: "Agra, India", 
            type: "Equity", 
            price: "INR 37 Cr", 
            rating: "7.2", 
            img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
            description: "Established professional institution with 2500+ student enrollment track record. Full campus assets included in mandated valuation. Excellent infrastructure with modern labs.",
            runRate: "INR 8.4 Cr",
            margin: "15 - 18 %",
            stake: "40.0%"
          },
          { 
            title: "For Sale: IGCSE education centre offering structured academic programs for K-12", 
            location: "Kuala Lumpur, MY", 
            type: "Sale", 
            price: "INR 18.4 Cr", 
            rating: "7.8", 
            img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
            description: "Education centre focused on IGCSE curriculum for students across primary to secondary levels. Premium facility in luxury residential hub with state-of-the-art tech labs.",
            runRate: "INR 10.5 Cr",
            margin: "10 - 20 %",
            stake: "100%"
          },
          { 
            title: "Established Maharashtra-based K-10 school for sale with strong enrollment density", 
            location: "Wai, India", 
            type: "Sale", 
            price: "INR 50 L", 
            rating: "8.1", 
            img: "https://images.unsplash.com/photo-1544640808-32ca72ac7f37?w=600&q=80",
            description: "Maharashtra based institution following CBSE norms, serving 800+ students with state-of-the-art laboratory and sports infrastructure. Turnkey operational handover.",
            runRate: "INR 66 Lakh",
            margin: "12 - 15 %",
            stake: "100%"
          }
        ]}, order: 1 },
        { blockType: 'cta_whatsapp', data: { headline: 'speak with a property specialist', whatsappNumber: '919966109191', badge: 'Confidential Mandate' }, order: 2 },
      ],
    },
    {
      pageSlug: 'partnerships',
      pageTitle: 'Partnerships',
      blocks: [
        {
          blockType: 'partnerships_hero',
          order: 0,
          data: {
            badge: 'Institutional Alliance',
            titleHtml: 'Strategic <span class="text-sm-blue italic font-serif lowercase tracking-normal">Partnerships.</span>',
            description: 'Join India\'s largest educational ecosystem. From academic excellence to infrastructure growth, we provide the toolkit for high-performing institutions.',
            stats: [
              { value: '4K+', label: 'Schools' },
              { value: '28', label: 'States' }
            ]
          }
        },
        {
          blockType: 'partnerships_programs',
          order: 1,
          data: {
            programs: [
              {
                category: 'Academic Partnerships',
                title: 'Elevate Educational Quality',
                desc: 'Integrate specialized coaching, curriculum planning, and performance tracking into your school.',
                color: 'bg-sm-blue',
                icon: 'BookOpen',
                items: [
                  'IIT / NEET Coaching Integration',
                  'Advanced Curriculum Mapping (NEP 2020)',
                  'Faculty Training & Empowerment',
                  'Student Performance Analytics'
                ]
              },
              {
                category: 'Operational Partnerships',
                title: 'School Development & Facilities',
                desc: 'End-to-end infrastructure management and sports program development for modern campuses.',
                color: 'bg-emerald-600',
                icon: 'Construction',
                items: [
                  'Infrastructure Evaluation & Roadmaps',
                  'Sports Academy Development',
                  'Campus Maintenance Audits',
                  'Vendor Ecosystem Management'
                ]
              },
              {
                category: 'Financial Partnerships',
                title: 'Fundraising & Advisory',
                desc: 'Access specialized capital, CSR grants, and investor networks for institutional growth.',
                color: 'bg-amber-600',
                icon: 'TrendingUp',
                items: [
                  'CSR Grant Facilitation',
                  'Investor & HNI Introductions',
                  'Project Proposal Handholding',
                  'Operational Yield Management'
                ]
              }
            ]
          }
        },
        {
          blockType: 'partnerships_rewards',
          order: 2,
          data: {
            title: 'Institutional Rewards',
            subtitle: 'Exclusive benefits for partner schools.',
            rewards: [
              { title: 'Bulk Discounts', desc: 'Special institutional pricing for large-scale procurement.', icon: 'TrendingUp' },
              { title: 'Loyalty Points', desc: 'Earn points on every order redeemable for upgrades.', icon: 'Star' },
              { title: 'Pilot Access', desc: 'First-mover advantage on new EdTech and Lab tools.', icon: 'Zap' }
            ]
          }
        },
        {
          blockType: 'cta_whatsapp',
          order: 3,
          data: {
            headline: 'speak with our alliance head',
            whatsappNumber: '919966109191'
          }
        }
      ],
    },
    {
      pageSlug: 'fundraising',
      pageTitle: 'Fundraising',
      blocks: [
        { blockType: 'inner_page_hero', data: { titleHtml: 'Institutional <br/> Capital <span class="text-sm-blue italic font-serif leading-none lowercase">Solutions.</span>', subtitle: 'Optimizing institutional growth through strategic capital raising and financial advisory.', theme: 'Finance' }, order: 0 },
        { blockType: 'categories', data: { items: [
          { title: 'Equity & Debt Funding', icon: 'Award', color: 'bg-emerald-50 text-emerald-600', items: ['Greenfield Project Soft Loans', 'Expansion Capital for School Chains', 'Strategic Equity Partnerships', 'Institutional Bridge Loans'] },
          { title: 'Donation & Grants', icon: 'Zap', color: 'bg-purple-50 text-purple-600', items: ['CSR Project Alignment & Funding', 'Endowment Fund Creation', 'Govt Grant Application Support', 'Institutional Philanthropy Hub'] },
        ]}, order: 1 },
        { blockType: 'cta_whatsapp', data: { headline: 'Consult with our Financial Strategist', whatsappNumber: '919966109191' }, order: 2 },
      ],
    },
    {
      pageSlug: 'workshops',
      pageTitle: 'Workshops',
      blocks: [
        { blockType: 'inner_page_hero', data: { titleHtml: 'Professional <br/> Leadership <span class="text-sm-blue italic font-serif leading-none lowercase">Academy.</span>', subtitle: 'High-impact capacity building modules for institutional heads, educators and owners.', theme: 'Academy' }, order: 0 },
        { blockType: 'upcoming_events', data: { items: [
          { title: 'NEP 2025: Institutional Digitization Stratagem', date: '15 May 2026', location: 'Hotel Taj, Mumbai (Hybrid)', speakers: ['Dr. A. Sharma', 'Ritesh V.'], type: 'Executive Workshop', status: 'Book Seat' },
          { title: 'Design Thinking for School Infrastructure', date: '22 June 2025', location: 'Virtual Global Webinar', speakers: ['Ar. Emily Watson', 'Sarah M.'], type: 'Webinar', status: 'Free Access' },
          { title: 'Teacher Skill Lab Certification (Level-1)', date: '10 July 2025', location: 'SchoolMart HQ, Hyderabad', speakers: ['Institutional Team'], type: 'Certification', status: 'Limited Seats' },
        ]}, order: 1 },
        { blockType: 'cta_whatsapp', data: { headline: 'Request Custom Workshop for your School', whatsappNumber: '919966109191' }, order: 2 },
      ],
    },
    {
      pageSlug: 'digitization-guide',
      pageTitle: 'Guide to Digitization',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Complete Guide <br /> <span class="text-sm-blue italic font-serif lowercase tracking-normal">to</span> School Digitization.', 
            subtitle: 'v2.0 Digitization Mastery',
            description: "India's most comprehensive blueprint for transforming traditional schools into AI-enabled smart campuses.",
            badge: 'v2.0 Digitization',
            icon: 'Smartphone',
            theme: 'Dark',
            stats: [
              { value: '100%', label: 'Secure' },
              { value: '2025', label: 'Ready' }
            ]
          }, 
          order: 0 
        },
        { 
          blockType: 'resource_grid', 
          data: { 
            items: [
              {
                title: 'Hardware Infrastructure',
                desc: 'Campus-wide Wi-Fi, Interactive Flat Panels, and Student Computing Devices.',
                icon: 'Laptop',
                color: 'bg-sm-blue',
                items: ['6E Wireless Access Points', '75/86" 4K Smart Panels', 'Cloud-managed Networking'],
              },
              {
                title: 'ERP & LMS Ecosystem',
                desc: 'Unified school management and learning platforms for seamless administration.',
                icon: 'Settings',
                color: 'bg-emerald-600',
                items: ['Automated Fee Management', 'Student Attendance App', 'Learning Progress Tracking'],
              },
              {
                title: 'Teacher Empowerment',
                desc: 'Continuous training modules for staff to master digital pedagogy tools.',
                icon: 'Award',
                color: 'bg-rose-500',
                items: ['EdTech Certification', 'Content Creation Tools', 'Collaborative Workshops'],
              },
            ]
          }, 
          order: 1 
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: 'Need a customized audit for your school?',
            actionText: 'Book Free Digital Audit',
            actionLink: '/contact-us',
            theme: 'Blue'
          },
          order: 2
        }
      ],
    },
    {
      pageSlug: 'product-catalog-2025',
      pageTitle: 'Product Catalog 2025',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Institutional <br /> <span class="text-sm-blue italic font-serif lowercase tracking-normal">Catalogues.</span>', 
            subtitle: 'New v2025 Release',
            description: 'Download the definitive guide to modern school infrastructure. 12+ categories, 2000+ products, and premium institutional designs.',
            badge: 'New v2025 Release',
            icon: 'Download',
            theme: 'Light',
            stats: [
              { value: '2k+', label: 'Products Catalogue' },
              { value: '15+', label: 'National Awards' }
            ]
          }, 
          order: 0 
        },
        {
          blockType: 'catalog_grid',
          data: {
            catalogs: [
              {
                title: 'Play Furniture',
                subtitle: 'Pre-Primary Collections',
                pages: '124 Pages',
                size: '14MB PDF',
                img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
                color: 'bg-rose-500',
              },
              {
                title: 'Lab & STEM',
                subtitle: 'Modular Equipment',
                pages: '86 Pages',
                size: '9MB PDF',
                img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
                color: 'bg-emerald-600',
              },
              {
                title: 'Digital Hub',
                subtitle: 'Smart Solutions',
                pages: '48 Pages',
                size: '6MB PDF',
                img: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=800&q=80',
                color: 'bg-sm-blue',
              },
            ]
          },
          order: 1
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: 'Need a printed hardcover edition?',
            subtitle: 'Complimentary master catalogues for institutional partners.',
            actionText: 'Request Printing Curation',
            actionLink: '/contact-us',
            theme: 'LightGray'
          },
          order: 2
        }
      ],
    },
    {
      pageSlug: 'setup-school-india',
      pageTitle: 'Setting Up School in India',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Setting Up A <br /> <span class="text-sm-blue italic font-serif lowercase tracking-normal">School</span> In India.', 
            subtitle: 'Compliance Masterclass',
            description: 'From legal foundation to CBSE/ICSE board norms, our institutional roadmap ensures your school project stays on track and compliant.',
            badge: 'Compliance Masterclass',
            icon: 'Building2',
            theme: 'Light',
            stats: [
              { value: '150+', label: 'Facilitated Setup' },
              { value: 'Trust', label: 'Legal & Strategy' }
            ]
          }, 
          order: 0 
        },
        {
          blockType: 'resource_grid',
          data: {
            items: [
              {
                phase: 'Trust & Society',
                title: 'Legal Foundation',
                desc: 'Registering your educational society or trust with specialized bylaws to support institutional growth.',
                icon: 'Shield',
                color: 'bg-sm-blue',
                items: ['Trust Deed Registration', 'Bylaws Drafting', 'Educational Clause Norms'],
              },
              {
                phase: 'Infrastructure',
                title: 'Site & Architecture',
                desc: 'Site survey and design that meets board-specific land norms and student safety standards.',
                icon: 'Building2',
                color: 'bg-emerald-600',
                items: ['CBSE/ICSE Land Norms', 'Campus Master Planning', 'Building Safety Certificates'],
              },
              {
                phase: 'Affiliation',
                title: 'Registration & Finalize',
                desc: 'Documentation and process handholding for online registration with board portals.',
                icon: 'Target',
                color: 'bg-amber-600',
                items: ['Documentation Audit', 'Inspection Mock Drills', 'On-site Compliance Check'],
              },
            ]
          },
          order: 1
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: 'Expert Affiliation & Legal Consultation.',
            actionText: 'Schedule Strategy Call',
            actionLink: 'tel:+919966109191',
            theme: 'Black'
          },
          order: 2
        }
      ]
    },
    {
      pageSlug: 'skill-lab-guide',
      pageTitle: 'How to Setup Composite Skill Lab',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Setting Up <br /> <span class="text-sm-blue italic font-serif lowercase tracking-normal">Composite</span> Skill Labs.', 
            subtitle: 'v2025 Blueprints',
            description: 'Technical blueprints for building future-ready skill hubs. 100% compliant with NITI Aayog & NEP 2020 guidelines for STEM education.',
            badge: 'v2025 Blueprints',
            icon: 'Zap',
            theme: 'Dark',
            stats: [
              { value: '500+', label: 'Labs Installed' },
              { value: '100%', label: 'Compliance Rate' }
            ]
          }, 
          order: 0 
        },
        {
          blockType: 'resource_grid',
          data: {
            items: [
              {
                title: 'Composite Skill Lab',
                badge: 'Multi-Disciplinary',
                desc: 'Integrated space for Coding, IoT, and AI prototyping with industry-standard hardware.',
                icon: 'Cpu',
                color: 'bg-sm-blue',
                items: ['AI Micro-controllers', 'IoT Sensors Kit', 'Digital Prototyping Board'],
              },
              {
                title: 'Robotics & STEM',
                badge: 'Hardware Centric',
                desc: 'Modular building blocks and programming tools for robotics competitions and physics experiments.',
                icon: 'Settings',
                color: 'bg-emerald-600',
                items: ['LEGO Education Kits', 'Drone Tech Hub', 'Industrial Robot Arms'],
              },
              {
                title: 'ATL & Innovation',
                badge: 'Creative Making',
                desc: 'Dedicated tinkering space with 3D printers, laser cutters, and traditional toolsets.',
                icon: 'Activity',
                color: 'bg-rose-500',
                items: ['3D Printing Station', 'Laser Cutting Tools', 'Mechanical Workbench'],
              },
            ]
          },
          order: 1
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: 'Book a technical facility audit.',
            subtitle: 'On-site infrastructure assessments & technical handholding.',
            actionText: 'Schedule Audit',
            theme: 'Blue'
          },
          order: 2
        }
      ],
    },
    {
      pageSlug: 'play-furniture-lookbook',
      pageTitle: 'Lookbook - Play Furniture',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Play Furniture <br /> <span class="text-rose-500 italic font-serif lowercase tracking-normal text-6xl">Lookbook.</span>', 
            subtitle: 'Lookbook v2025',
            description: 'Inspiring early childhood spaces designed with safety, ergonomics, and aesthetic joy at their core.',
            badge: 'Lookbook v2025',
            icon: 'Sparkles',
            theme: 'Rose',
            stats: [
              { value: '500+', label: 'Installations Across India' },
              { value: '100%', label: 'Child Safe Materals' }
            ]
          }, 
          order: 0 
        },
        {
          blockType: 'lookbook_grid',
          data: {
            collections: [
              {
                title: 'Pre-Primary Hub',
                subtitle: 'Nursery & LKG Ready',
                desc: 'Ergonomic, colorful, and sustainable furniture designed for the first steps of learning.',
                img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
                color: 'bg-rose-500',
              },
              {
                title: 'Outdoor Adventure',
                subtitle: 'Safe Play Area',
                desc: 'Heavy-duty multiplay systems, swings, and slides with international safety certification.',
                img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&q=80',
                color: 'bg-emerald-600',
              },
              {
                title: 'Soft Play Zone',
                subtitle: 'Early Childhood',
                desc: 'Safe, cushioned environments for toddlers to explore physical coordination and play.',
                img: 'https://images.unsplash.com/photo-1608447714925-599deeb5a682?w=800&q=80',
                color: 'bg-sm-blue',
              },
            ]
          },
          order: 1
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: 'Ready to design your play environment?',
            actionText: 'Book Design Consultation',
            theme: 'Rose'
          },
          order: 2
        }
      ],
    },
    {
      pageSlug: 'math-resources',
      pageTitle: 'Gamified Math Resources',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Gamified Math <br /> <span class="text-emerald-600 italic font-serif lowercase tracking-normal text-6xl">Resources.</span>', 
            subtitle: 'Gamified v2025',
            description: 'Making mathematics intuitive through play and gamification. 100% aligned with NEP 2020 foundation & primary stage guidelines.',
            badge: 'Gamified v2025',
            icon: 'Calculator',
            theme: 'Emerald',
            stats: [
              { value: '5k+', label: 'Students Reached' },
              { value: '100%', label: 'Retention Rate' }
            ]
          }, 
          order: 0 
        },
        {
          blockType: 'resource_grid',
          data: {
            items: [
              {
                title: 'Gamified Math Kits',
                subtitle: 'Elementary & Middle School',
                desc: 'Interactive physical boards and manipulatives that transform abstract concepts into tangible play.',
                icon: 'Calculator',
                color: 'bg-emerald-600',
                items: ['Number Sense Boards', 'Fraction Manipulatives', 'Geometry Building Sets'],
              },
              {
                title: 'Digital Maths Lab',
                subtitle: 'High School Ready',
                desc: 'Advanced software ecosystems with real-time analytics and personalized learning paths.',
                icon: 'Zap',
                color: 'bg-sm-blue',
                items: ['AI Problem Solvers', '3D Graphing Tools', 'Progress Dashboards'],
              },
              {
                title: 'Teacher Handbooks',
                subtitle: 'Pedagogy & Training',
                desc: 'Step-by-step guides for educators to implement gamified learning effectively in classrooms.',
                icon: 'BookOpen',
                color: 'bg-amber-600',
                items: ['Activity Planners', 'Assessment Kits', 'Workshop Materials'],
              },
            ]
          },
          order: 1
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: 'Ready to transform your math lab?',
            actionText: 'Book Strategy Consultation',
            theme: 'Emerald'
          },
          order: 2
        }
      ],
    },
    {
      pageSlug: 'completed-projects',
      pageTitle: 'Completed Projects',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Completed <br /> <span class="text-sm-blue italic font-serif lowercase tracking-normal text-6xl">Portfolios.</span>', 
            subtitle: 'Institutional Portfolio',
            description: 'Exploring 500+ campus success stories across India. From boutique preschools to massive K-12 institutional hubs.',
            badge: 'Institutional Portfolio',
            icon: 'Target',
            theme: 'Dark',
            stats: [
              { value: '12', label: 'States Covered' },
              { value: '500+', label: 'Completed Projects' }
            ]
          }, 
          order: 0 
        },
        {
          blockType: 'portfolio_grid',
          data: {
            projects: [
              {
                title: 'Greenfield K-12 Campus',
                subtitle: 'Hyderabad, India',
                desc: 'Complete campus setup including furniture, STEM labs, and sports infrastructure.',
                img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
                tags: ['A-Z Implementation', 'Modern Architecture'],
                color: 'bg-sm-blue',
              },
              {
                title: 'Digital Play Space Revamp',
                subtitle: 'Bangalore, India',
                desc: 'Transforming traditional preschools into tech-enabled creative play zones.',
                img: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?w=800&q=80',
                tags: ['Soft Play', 'Digitization'],
                color: 'bg-rose-500',
              },
              {
                title: 'NITI Aayog Skill Hub',
                subtitle: 'Delhi NCR, India',
                desc: 'Turnkey setup of composite skill labs with AI and Robotics modules.',
                img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
                tags: ['Technical Lab', 'Skill Centre'],
                color: 'bg-emerald-600',
              },
            ]
          },
          order: 1
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: 'Discuss your campus transformation.',
            actionText: 'Schedule Project Review',
            theme: 'LightGray'
          },
          order: 2
        }
      ],
    },
    {
      pageSlug: 'design-ideas',
      pageTitle: '20 Stunning School Design Ideas',
      blocks: [
        { blockType: 'inner_page_hero', data: { titleHtml: '20 <br/> Stunning <span class="text-sm-blue italic">Design</span> Ideas.', subtitle: 'Inspiration for modern, functional, and aesthetically pleasing school interiors.', theme: 'Inspiration' }, order: 0 },
      ],
    },
    {
      pageSlug: 'library-trends',
      pageTitle: 'Library Trends',
      blocks: [
        { blockType: 'inner_page_hero', data: { titleHtml: 'Future <br/> of <span class="text-sm-blue italic">Libraries.</span>', subtitle: 'Exploring modern library concepts and furniture trends for the NEP era.', theme: 'Library' }, order: 0 },
      ],
    },
    {
      pageSlug: 'job-openings',
      pageTitle: 'Job Openings',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Join the <br /> <span class="text-sm-blue italic font-serif lowercase tracking-normal text-6xl">Growth</span> Engine.', 
            subtitle: 'Careers v2025',
            description: "We're looking for visionary consultants, designers, and engineers to redefine Indian education infrastructure.",
            badge: 'Careers v2025',
            icon: 'Briefcase',
            theme: 'Dark',
            stats: [
              { value: '12+', label: 'Open Roles' },
              { value: 'Global', label: 'Team' }
            ]
          }, 
          order: 0 
        },
        {
          blockType: 'job_listings',
          data: {
            jobs: [
              {
                role: 'Academic Consultant',
                type: 'Full Time',
                location: 'Hyderabad / REMOTE',
                dept: 'Institutional Growth',
                desc: 'Advising schools on academic transformation and NEP implementation strategies.',
              },
              {
                role: 'Product Designer (Institutional)',
                type: 'Full Time',
                location: 'Bangalore',
                dept: 'Design Lab',
                desc: 'Creating next-gen furniture and spatial layouts for modern K-12 campuses.',
              },
              {
                role: 'Technical Project Manager',
                type: 'Full Time',
                location: 'Delhi NCR',
                dept: 'Infrastructure',
                desc: 'Managing turnkey school setup projects from site survey to final handover.',
              },
            ]
          },
          order: 1
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: "Don't see a role that fits?",
            actionText: 'Submit Open Application',
            theme: 'LightGray'
          },
          order: 2
        }
      ],
    },
    {
      pageSlug: 'influencer-program',
      pageTitle: 'Join as Influencers',
      blocks: [
        { 
          blockType: 'inner_page_hero', 
          data: { 
            titleHtml: 'Join as <br /> <span class="text-sm-blue italic font-serif lowercase tracking-normal text-6xl">Influencers.</span>', 
            subtitle: 'Partner v2025',
            description: "Collaborate with India's fastest-growing institutional brand. Driving impact across 500+ premium campuses nationwide.",
            badge: 'Partner v2025',
            icon: 'Star',
            theme: 'Light',
          }, 
          order: 0 
        },
        {
          blockType: 'resource_grid',
          data: {
            items: [
              {
                title: 'Content Creators',
                subtitle: 'Micro-Influencers',
                desc: 'Education-focused creators with 10k+ reach. Focused on campus tours and product reviews.',
                icon: 'Camera',
                color: 'bg-rose-500',
                items: ['Free Product Kits', 'Campus Access', 'Affiliate Commissions'],
              },
              {
                title: 'Academic Advocacy',
                subtitle: 'Institutional Voices',
                desc: 'Senior educators or architects who advocate for modern, safe learning environments.',
                icon: 'Users',
                color: 'bg-emerald-600',
                items: ['Thought Leadership', 'Expert Panels', 'Design Collaboration'],
              },
              {
                title: 'Brand Ambassadors',
                subtitle: 'Exclusive Partners',
                desc: 'Select individuals who embody our mission to transform global education infrastructure.',
                icon: 'Award',
                color: 'bg-sm-blue',
                items: ['Annual Retainer', 'Media Presence', 'Exclusive Events'],
              },
            ]
          },
          order: 1
        },
        {
          blockType: 'inner_page_cta',
          data: {
            title: 'Building institutional brand excellence, together.',
            actionText: 'Apply for Partnerships',
            theme: 'Black'
          },
          order: 2
        }
      ],
    },
  ];

  const sidebarData = {
    'furniture': ['CLASSROOM', 'LIBRARY', 'LABS', 'OFFICE', 'CAFETERIA', 'AUDITORIUM'],
    'architecture': ['CAMPUS PLANNING', 'INTERIOR DESIGN', '3D VISUALIZATION', 'GREEN BUILDING', 'CIVIL AUDIT'],
    'digital': ['INTERACTIVE PANELS', 'VR / AR', 'AI TOOLS', 'SMART PODIUMS', 'DIGITAL BOARDS'],
    'sports': ['INDOOR COURTS', 'OUTDOOR FIELDS', 'ATHLETIC TRACKS', 'SPORTS EQUIPMENTS', 'GYMNASIUM'],
    'libraries': ['READING ZONES', 'DIGITAL LIBRARIES', 'SHELVING SYSTEMS', 'LOUNGE SEATING', 'LIBRARIAN DESKS'],
    'mathematics': ['MANIPULATIVES', 'DIGITAL GAMES', 'MATH LAB KITS', 'PUZZLES', 'CHARTS'],
    'science': ['PHYSICS LAB', 'CHEMISTRY LAB', 'BIOLOGY LAB', 'GENERAL SCIENCE', 'SAFETY GEAR'],
    'labs': ['CODING & ROBOTICS', 'ART & CRAFT', 'VOCATIONAL', 'MAKER SPACE', 'ASTRONOMY'],
    'design': ['NEW CAMPUS', 'RENOVATION', 'NEP COMPLIANCE', 'FURNITURE LAYOUT', 'LANDSCAPE'],
    'school-sale': ['Premium Campuses', 'Lease Opportunities', 'Operational Schools', 'Greenfield Projects'],
    'partnerships': ['Academic Alliances', 'Financial Partnerships', 'EdTech Collaborations', 'Sports Academies'],
    'workshops': ['Masterclasses', 'Webinars', 'Leadership Summits', 'Teacher Training'],
    'setup-guide': ['Compliance & Legal', 'Infrastructure Planning', 'Curriculum Design', 'Resource Audits'],
    'fundraising': ['Seed Capital', 'Expansion Funds', 'Grants', 'Investor Pitch'],
    'digitization-guide': ['Hardware Setup', 'Software Solutions', 'ERP Integration', 'Teacher Training'],
    'catalogue-2025': ['Furniture', 'Digital', 'Learning', 'Lab Spaces'],
    'skill-lab-guide': ['Robotics', 'Coding Stations', 'IoT Prototyping', 'Design Thinking'],
    'play-furniture-lookbook': ['Kindergarten', 'Soft Play', 'Montessori', 'Outdoor'],
    'math-resources': ['Primary Kits', 'Middle School', 'High School Models', 'Digital Resources'],
    'completed-projects': ['North Zone', 'South Zone', 'East Zone', 'West Zone'],
    'design-ideas': ['Classrooms', 'Corridors', 'Cafeterias', 'Staff Rooms'],
    'library-trends': ['E-Libraries', 'Reading Nooks', 'Shelving', 'Acoustics'],
    'job-openings': ['Sales', 'Design', 'Installation', 'Management'],
    'influencer-program': ['Educators', 'Architects', 'EdTech Affiliates', 'Event Promoters']
  };

  pages.forEach(p => {
    if (sidebarData[p.pageSlug]) {
      p.blocks.push({
        blockType: 'sidebar_categories',
        order: 10,
        data: { categories: sidebarData[p.pageSlug] }
      });
    }
  });

  // Upsert all pages
  for (const page of pages) {
    await Page.findOneAndUpdate(
      { pageSlug: page.pageSlug },
      page,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`✅ Seeded page: ${page.pageSlug}`);
  }

  // ──────────────────────────────────────────
  // 3. Sample products
  // ──────────────────────────────────────────
  await Product.deleteMany({}); // Wipe products to re-seed cleanly
  
  const CAT_NAMES = {
    'furniture': 'Furniture',
    'architecture': 'School Architecture',
    'digital': 'Digital Infrastructure',
    'sports': 'Sports Infrastructure',
    'libraries': 'Libraries',
    'mathematics': 'Gamified Math Labs',
    'science': 'Science Is Fun',
    'labs': 'Composite Skill Labs',
    'design': 'School Designs',
    'school-sale': 'Buy/Sell/Lease Schools',
    'partnerships': 'Partnerships',
    'workshops': 'Workshops',
    'setup-guide': 'School Setup Guide',
    'fundraising': 'Fundraising',
    'digitization-guide': 'Guide to Digitization',
    'catalogue-2025': 'Product Catalog 2025',
    'skill-lab-guide': 'How to Setup Composite Skill Lab',
    'play-furniture-lookbook': 'Lookbook - Play Furniture',
    'math-resources': 'Gamified Math Resources',
    'completed-projects': 'Completed Projects',
    'design-ideas': '20 Stunning School Design Ideas',
    'library-trends': 'Library Trends',
    'job-openings': 'Job Openings',
    'influencer-program': 'Join as Influencers'
  };

    const dummyImgs = [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80'
    ];

    const sampleProducts = [];
    Object.keys(sidebarData).forEach(slug => {
      const pageTitle = CAT_NAMES[slug];
      sidebarData[slug].forEach((subcat, idx) => {
        // First card
        sampleProducts.push({
          name: `${subcat} Selection Alpha`,
          description: `Premium grade equipment for ${subcat.toLowerCase()}. This module represents our commitment to institutional excellence. Designed specifically for long-term durability and ergonomic support, it ensures that learning environments remain dynamic and adaptive.`,
          category: pageTitle,
          subcategory: subcat,
          images: [
            dummyImgs[idx % dummyImgs.length],
            dummyImgs[(idx + 1) % dummyImgs.length],
            dummyImgs[(idx + 2) % dummyImgs.length]
          ],
          isFeatured: Math.random() > 0.6,
          stats: [
            { label: 'Impact Scale', value: '98% Efficient' },
            { label: 'Install Time', value: '24-48 Hours' },
            { label: 'Standard', value: 'NEP Certified' }
          ],
          resources: [
            { name: 'Technical Specifications (PDF)', size: '2.4 MB', url: '#' },
            { name: 'Institutional Layout Guide', size: '4.8 MB', url: '#' },
            { name: 'Warranty & Support Policy', size: '1.2 MB', url: '#' }
          ]
        });
        // Second card
        sampleProducts.push({
          name: `${subcat} Series Beta`,
          description: `Next-gen scalable solution for ${subcat.toLowerCase()}. Every unit is constructed using sustainable materials and undergoes rigorous quality checks to meet global safety standards. Integration includes full spatial planning and logistical support.`,
          category: pageTitle,
          subcategory: subcat,
          images: [
            dummyImgs[(idx + 1) % dummyImgs.length],
            dummyImgs[(idx + 2) % dummyImgs.length],
            dummyImgs[(idx + 3) % dummyImgs.length]
          ],
          isNewProduct: Math.random() > 0.6,
          stats: [
            { label: 'Ergonomics', value: 'A+ Rated' },
            { label: 'Capacity', value: 'Expandable' },
            { label: 'Durability', value: '10 Years' }
          ],
          resources: [
            { name: 'Product Brochure', size: '1.8 MB', url: '#' },
            { name: 'Safety Certificates', size: '0.9 MB', url: '#' }
          ]
        });
      });
    });

    await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${sampleProducts.length} dynamic products across all categories.`);

  console.log('\nðŸŽ‰ Database seeded successfully!');
  console.log('   Admin login: admin@schoolmart.in / Admin@123');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('âŒ Seed error:', err);
  process.exit(1);
});
