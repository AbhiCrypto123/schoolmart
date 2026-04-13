require('dotenv').config();
const { sequelize } = require('./config/db');
const Setting = require('./models/Setting');
const CMSPage = require('./models/CMSPage');
const CMSBlock = require('./models/CMSBlock');

const seedCMS = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected. Syncing models...');
    
    // Sync models to ensure tables exist
    await sequelize.sync({ alter: true });
    console.log('Models synced.');

    // ──────────────────────────────────────────────────────────────────────────
    // 1. GLOBAL SETTINGS
    // ──────────────────────────────────────────────────────────────────────────
    
    // Branding
    await Setting.upsert({
      key: 'branding',
      data: {
        siteName: 'SCHOOL MART',
        tagline: 'everything a school needs',
        primaryColor: '#0057A8',
        accentColor: '#3B82F6',
        logoUrl: '/logo.png'
      }
    });

    // Footer
    await Setting.upsert({
      key: 'footer',
      data: {
        brand: {
          name: 'SCHOOL MART',
          tagline: 'EVERYTHING A SCHOOL NEEDS',
          description: 'India\'s largest institutional supply ecosystem. Accelerating educational excellence through modern infrastructure and resource optimization.'
        },
        bgColor: '#0f172a',
        textColor: '#9ca3af',
        headingColor: '#38bdf8',
        columns: [
          {
            title: 'Infrastructure',
            links: [
              { label: 'School Furniture', path: '/furniture' },
              { label: 'Digital Labs', path: '/digital' },
              { label: 'Sports Arena', path: '/sports' },
              { label: 'Campus Design', path: '/design' }
            ]
          },
          {
            title: 'Knowledge Hub',
            links: [
              { label: 'Product Catalogues', path: '/catalogues' },
              { label: 'Setup Guides', path: '/setup-guide' },
              { label: 'Skill Lab Trends', path: '/p/skill-lab-guide' },
              { label: 'Manufacturing', path: '/manufacturing' }
            ]
          }
        ],
        contact: {
          email: 'web.thirdeye@gmail.com',
          phone1: '+91 9966109191',
          phone2: '+91 9866091111',
          whatsapp: '9966109191',
          address: 'Institutional Hub, Hyderabad, India'
        },
        social: {
          facebook: '#',
          twitter: '#',
          instagram: '#',
          linkedin: '#'
        },
        copyright: '© 2025 SchoolMart. All institutional rights reserved.',
        bottomLinks: [
          { label: 'How it Works', path: '/p/how-it-works' },
          { label: 'Shipping Policy', path: '/p/shipping-policy' },
          { label: 'Payments', path: '/p/payments' }
        ]
      }
    });

    // PDF / Inquiry Access
    await Setting.upsert({
      key: 'pdf_access',
      data: {
        requireLogin: true,
        modalHeading: 'IDENTITY REQUIRED.',
        message: 'Our technical handbooks and pricing indices are gated for institutional partners. Please join our network to unlock full access.',
        registerBtnText: 'REGISTER FOR ACCESS',
        dismissBtnText: 'BROWSE PUBLIC VIEW'
      }
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 2. HOME PAGE (slug: home)
    // ──────────────────────────────────────────────────────────────────────────
    
    await CMSPage.upsert({ slug: 'home', title: 'HOME PAGE' });

    // Hero Block
    await CMSBlock.upsert({
      pageSlug: 'home',
      key: 'hero',
      type: 'hero',
      data: {
        badge: 'Price · Quality · Range Promise',
        headline1: 'FURNITURE',
        headline2: 'QUICK DELIVERY',
        subline1: 'Order Now',
        subline2: 'Kindergarten · Highschools · Labs · Libraries',
        cta1: { label: 'Shop Furniture →', path: '/furniture' },
        cta2: { label: 'View Catalogue', path: '/catalogues' },
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=85',
        bgColor: '#FFFFFF',
        textColor: '#111827'
      }
    });

    // Solutions Grid
    await CMSBlock.upsert({
      pageSlug: 'home',
      key: 'solutions',
      type: 'solutions',
      data: {
        heading: 'Explore Our Solutions',
        items: [
          {
            title: 'School Furniture',
            description: '1200+ ergonomic products for every classroom, lab and library',
            path: '/furniture',
            badge: { label: 'Furniture', color: '#F97316' },
            img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
          },
          {
            title: 'Digital Infrastructure',
            description: 'Cutting-edge ed-tech, interactive panels and smart classrooms',
            path: '/digital',
            badge: { label: 'Technology', color: '#3B82F6' },
            img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
          },
          {
            title: 'Sports Infrastructure',
            description: 'Professional-grade courts, equipment and sports facilities',
            path: '/sports',
            badge: { label: 'Sports', color: '#22C55E' },
            img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
          },
          {
            title: 'School Architecture',
            description: 'NEP-ready campus planning and interior design by expert architects',
            path: '/school-building-design',
            badge: { label: 'Architecture', color: '#8B5CF6' },
            img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
          },
          {
            title: 'Learning Environments',
            description: 'STEM labs, libraries, maker-spaces and activity rooms',
            path: '/environments',
            badge: { label: 'Environments', color: '#0EA5E9' },
            img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
          },
          {
            title: 'School Design & Planning',
            description: 'End-to-end campus setup, expansion and renovation services',
            path: '/design',
            badge: { label: 'Design', color: '#EC4899' },
            img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
          }
        ]
      }
    });

    // WhatsApp CTA
    await CMSBlock.upsert({
      pageSlug: 'home',
      key: 'cta_whatsapp',
      type: 'cta_whatsapp',
      data: {
        badge: 'Direct Consultation',
        headline: 'Ready to scale your campus?',
        description: 'At SchoolMart, we provide end-to-end expertise in guiding you to set up your new campus project. From spatial planning to high-density procurement, we help you maximize ROI and institutional growth.',
        whatsappNumber: '919966109191',
        phone: '+91 9966109191',
        btnLabel: 'Connect on WhatsApp',
        whatsappUrl: 'https://chat.whatsapp.com/L79Vd9B2p9a5Q9D9X9D9X9'
      }
    });

    // Tiles Grid (Masonry)
    await CMSBlock.upsert({
      pageSlug: 'home',
      key: 'tiles',
      type: 'tiles',
      data: {
        tiles: [
          { title: 'IMMERSIVE LEARNING', subtitle: 'VR & AR in Education', path: '/p/immersive-learning', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
          { title: 'KINDERGARTEN DESIGN', subtitle: 'Playful Learning Spaces', path: '/p/kindergarten-design', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
          { title: 'COMPOSITE SKILL LABS', subtitle: 'Future-Ready Education', path: '/p/skill-labs', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80' },
          { title: 'LIBRARY INNOVATIONS', subtitle: 'Modern Reading Spaces', path: '/p/library-innovations', img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80' },
          { title: 'FURNITURE DESIGN & PLANNING', subtitle: 'Custom Solutions', path: '/p/furniture-planning', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80' },
          { title: 'SELLING OR BUYING A SCHOOL', subtitle: 'CHECK OPPORTUNITIES WITH US', path: '/p/school-sale', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', featured: true },
          { title: 'GAMIFIED MATH LABS', subtitle: 'Learn Math Through Play', path: '/p/math-labs', img: 'https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=600&q=80' },
          { title: 'INTERACTIVE WALLS', subtitle: 'Engaging Learning Tools', path: '/p/interactive-walls', img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80' },
          { title: '16 LATEST INTERACTIVE PANELS', subtitle: 'FOR CLASSROOMS', path: '/p/interactive-panels', img: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=600&q=80' },
          { title: 'WONDERGARTENS', subtitle: 'Magical Learning Spaces', path: '/p/wondergartens', img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=600&q=80' },
          { title: '20+ AI TOOLS FOR CLASSROOMS', subtitle: 'WITH TRAINING SUPPORT', path: '/p/ai-classroom', img: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&q=80' },
          { title: 'SMART SPORTS FOR SCHOOLS', subtitle: 'Next-Gen Sports Infrastructure', path: '/p/smart-sports', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80' }
        ]
      }
    });

    // Product Carousel (Embla)
    await CMSBlock.upsert({
      pageSlug: 'home',
      key: 'product_carousel',
      type: 'product_carousel',
      data: {
        heading: 'FEATURED PRODUCTS',
        items: [
          { title: 'C-Shape Dynamic Stool', price: '3,500.00', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80', path: '/furniture' },
          { title: 'Lab Workstation V2', price: '18,500.00', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', path: '/furniture' },
          { title: 'Ergonomic Faculty Chair', price: '7,500.00', img: 'https://images.unsplash.com/photo-1582213793728-9cc0034a34ea?w=600&q=80', path: '/furniture' },
          { title: 'Stem Robotics Station', price: '36,000.00', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80', path: '/furniture' },
          { title: 'Digital Hub Monitor', price: '18,500.00', img: 'https://images.unsplash.com/photo-1558448231-314777598379?w=600&q=80', path: '/digital' }
        ]
      }
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 3. FURNITURE PAGE
    // ──────────────────────────────────────────────────────────────────────────
    await CMSPage.upsert({ slug: 'furniture', title: 'FURNITURE PAGE' });

    await CMSBlock.upsert({
      pageSlug: 'furniture',
      key: 'inner_page_hero',
      type: 'inner_page_hero',
      data: {
        badge: 'Featured Series',
        titleHtml: 'Modular <br/> Classroom Pro.',
        subtitle: '1200+ ergonomic products designed for inspiring spaces.',
        mediaType: 'image',
        img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
        mediaUrl: ''
      }
    });

    await CMSBlock.upsert({
      pageSlug: 'furniture',
      key: 'action_strip',
      type: 'action_strip',
      data: {
        bgColor: '#111827',
        title: 'The 2025 Lookbook.',
        subtitle: 'MASTER CATALOGUE',
        downloadPath: '/catalogues'
      }
    });

    await CMSBlock.upsert({
      pageSlug: 'furniture',
      key: 'sidebar_categories',
      type: 'sidebar_categories',
      data: {
        categories: ['Desks', 'Seating', 'Lab Furniture', 'Storage', 'Cafeteria']
      }
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 4. SPORTS PAGE
    // ──────────────────────────────────────────────────────────────────────────
    await CMSPage.upsert({ slug: 'sports', title: 'SPORTS PAGE' });

    await CMSBlock.upsert({
      pageSlug: 'sports',
      key: 'inner_page_hero',
      type: 'inner_page_hero',
      data: {
        badge: 'Performance 2025',
        titleHtml: 'Built <br/> <span class="text-sm-blue italic font-serif lowercase tracking-normal">for</span> <br/> Champions.',
        subtitle: 'Engineering high-performance athletic surfaces for the next generation of athletes.',
        mediaType: 'image',
        img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80'
      }
    });

    await CMSBlock.upsert({
      pageSlug: 'sports',
      key: 'action_stack',
      type: 'action_stack',
      data: {
        cards: [
          { title: 'Schedule <br/> Site Survey.', bgColor: '#111827', link: '/contact-us' },
          { title: 'Safety Compliance <br/> Gold Certified.', bgColor: '#ECFDF5', link: '/contact-us' }
        ]
      }
    });

    await CMSBlock.upsert({
      pageSlug: 'sports',
      key: 'info_split_grid',
      type: 'info_split_grid',
      data: {
        heading: 'High <span class="text-sm-blue italic font-serif lowercase tracking-normal">Impact</span> Performance.',
        description: 'Shock-absorption technology for elite safety and performance. Our surfaces are tested in professional athletic labs to ensure long-term durability.',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1000&q=80',
        points: ['FIBA Compliant', 'Anti-Skid', 'Heat Proof', '10 Yr Warranty'],
        ctaLabel: 'Start Project',
        ctaPath: '/registration'
      }
    });

    await CMSBlock.upsert({
      pageSlug: 'sports',
      key: 'sidebar_categories',
      type: 'sidebar_categories',
      data: {
        categories: ['Track & Field', 'Playground', 'Indoor Courts', 'Equipment', 'Gym Tech']
      }
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 5. DIGITAL INFRASTRUCTURE PAGE
    // ──────────────────────────────────────────────────────────────────────────
    await CMSPage.upsert({ slug: 'digital', title: 'DIGITAL INFRASTRUCTURE' });

    await CMSBlock.upsert({
      pageSlug: 'digital',
      key: 'inner_page_hero',
      type: 'inner_page_hero',
      data: {
        badge: 'Digital Transformation 2025',
        titleHtml: 'Future <br/> Digital.',
        subtitle: 'Cutting-edge Ed-Tech and campus-wide smart infrastructure.',
        mediaType: 'image',
        img: '/images/hero_digital.png'
      }
    });

    await CMSBlock.upsert({
      pageSlug: 'digital',
      key: 'sidebar_categories',
      type: 'sidebar_categories',
      data: {
        categories: ['Smart Boards', 'Networking', 'Servers', 'Audio Systems', 'Security']
      }
    });

    console.log('=========================================');
    console.log('✅ CONTENT & DESIGN DNA SYNCED');
    console.log('=========================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ SEEDING FAILED:', error);
    process.exit(1);
  }
};

seedCMS();

