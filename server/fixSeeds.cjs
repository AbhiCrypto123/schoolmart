require('dotenv').config();
const { sequelize } = require('./config/db');
const CMSBlock = require('./models/CMSBlock');

async function fixSeeds() {
  await sequelize.authenticate();

  // Contact Us
  await CMSBlock.upsert({
    pageSlug: 'contact-us',
    key: 'inner_page_hero',
    type: 'inner_page_hero',
    data: {
      badge: 'Connect with experts',
      titleHtml: 'Let\'s Build <br /> The Future <br /> <span class="text-blue-600 italic font-serif lowercase tracking-normal px-2">Together.</span>',
      subtitle: 'From architectural blueprints to furniture installations, we assist you in every step.',
      mediaType: 'image',
      img: ''
    }
  });

  // About Us
  await CMSBlock.upsert({
    pageSlug: 'aboutus',
    key: 'inner_page_hero',
    type: 'inner_page_hero',
    data: {
      badge: 'Overview',
      titleHtml: 'The <span class="text-sm-blue">Collective</span>',
      subtitle: 'SchoolMart is a platform built by architects, designers, and school innovators for the modern educational landscape.',
      mediaType: 'image',
      img: 'https://images.unsplash.com/photo-152305085306e-8c333bf48974?w=1200&q=80'
    }
  });

  // Corporate
  // For Corporate, delete the generic inner_page_hero
  await CMSBlock.destroy({ where: { pageSlug: 'corporate', key: 'inner_page_hero' } });
  
  await CMSBlock.upsert({
    pageSlug: 'corporate',
    key: 'corporate_hero',
    type: 'inner_page_hero', // using inner_page_hero UI form! 
    data: {
      badge: 'Foundational Intelligence',
      titleHtml: 'All About <br/> <span class="text-[#004a8e] italic font-serif lowercase tracking-normal">Schoolmart</span> <br/> Consortium.',
      subtitle: 'SCHOOL MART IS A ONE STOP FOR ALL SCHOOL INFRASTRUCTURE NEEDS. A CONSORTIUM OF 16 PANEL ARCHITECTS, 20+ DESIGNERS, SCHOOL INNOVATORS, & EDTECH MAJORS WORKING FROM 4 COUNTRIES.',
      cta1: { label: 'Request Pitch Deck', path: '/' },
      cta2: { label: 'WhatsApp', path: '/' }
    }
  });

  // Manufacturing
  await CMSBlock.destroy({ where: { pageSlug: 'manufacturing', key: 'inner_page_hero' } });
  
  await CMSBlock.upsert({
    pageSlug: 'manufacturing',
    key: 'manufacturing_hero',
    type: 'inner_page_hero',
    data: {
      badge: 'In-House Precision',
      titleHtml: 'Look At <br/> <span class="text-[#004a8e]">Schoolmart\'s</span> <br/> Manufacturing.',
      subtitle: 'WE TAKE PRIDE IN OUR IN-HOUSE MANUFACTURING FACILITIES, WHICH ENCOMPASS MODULAR FURNITURE MACHINERY, SOLID WOOD MANUFACTURING, METAL WORKS, AND POWDER COATING.',
      mediaType: 'image',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
    }
  });

  // Environments
  await CMSBlock.destroy({ where: { pageSlug: 'environments', key: 'inner_page_hero' } });
  // Environments doesn't use inner_page_hero, it uses environments_page_content
  // but let's override environments_page_content to use the structure it expects but mapped to the CMS form.
  // Actually, Environments.jsx needs data.hero
  await CMSBlock.upsert({
    pageSlug: 'environments',
    key: 'environments_hero',
    type: 'inner_page_hero',
    data: {
        badge: 'Sensory Hub 2025',
        titleHtml: 'Atmosphere <br/> <span class="text-[#004a8e] italic font-serif lowercase tracking-normal">is</span> <br/> Everything.',
        subtitle: 'Harmonizing architectural sensory design to stimulate deep academic performance.',
        mediaType: 'image',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'
    }
  });

  // Guides
  await CMSBlock.destroy({ where: { pageSlug: 'guides', key: 'inner_page_hero' } });
  await CMSBlock.upsert({
    pageSlug: 'guides',
    key: 'guides_hero',
    type: 'inner_page_hero',
    data: {
        badge: 'Knowledge Base 2025',
        titleHtml: 'Strategy <br/> <span class="text-[#004a8e] italic font-serif lowercase tracking-normal">for</span> <br/> Compliance.',
        subtitle: 'Deep-dive into our institutional strategy handbooks and regulatory frameworks.',
        mediaType: 'image',
        img: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&q=80'
    }
  });

  console.log('✅ FIXED CMS TEXT FIELDS TO MATCH FRONTEND');
  process.exit(0);
}

fixSeeds().catch(console.error);
