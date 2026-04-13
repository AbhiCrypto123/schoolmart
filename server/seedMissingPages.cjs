const { sequelize } = require('./config/db');
const CMSPage = require('./models/CMSPage');
const CMSBlock = require('./models/CMSBlock');

const pagesToSeed = [
  { slug: 'school-building-design', title: 'SCHOOL DESIGN' },
  { slug: 'libraries', title: 'LIBRARIES' },
  { slug: 'environments', title: 'ENVIRONMENTS' },
  { slug: 'aboutus', title: 'ABOUT US' },
  { slug: 'contact-us', title: 'CONTACT US' },
  { slug: 'mathematics', title: 'MATHEMATICS' },
  { slug: 'science', title: 'SCIENCE' },
  { slug: 'labs', title: 'LABS' },
  { slug: 'design', title: 'DESIGN' },
  { slug: 'manufacturing', title: 'MANUFACTURING' },
  { slug: 'corporate', title: 'CORPORATE' },
  { slug: 'catalogues', title: 'CATALOGUES' },
  { slug: 'guides', title: 'GUIDES' },
  { slug: 'school-sale', title: 'SCHOOL SALE' },
  { slug: 'partnerships', title: 'PARTNERSHIPS' },
  { slug: 'setup-guide', title: 'SETUP GUIDE' }
];

async function seedMissing() {
  await sequelize.authenticate();
  
  for (const p of pagesToSeed) {
    await CMSPage.upsert({ slug: p.slug, title: p.title });
    
    // Most standard inner pages use inner_page_hero and sidebar_categories
    await CMSBlock.upsert({
      pageSlug: p.slug,
      key: 'inner_page_hero',
      type: 'inner_page_hero',
      data: {
        badge: p.title + ' 2025',
        titleHtml: 'Advanced <br/> ' + p.title + '.',
        subtitle: 'Configure your ' + p.title + ' parameters.',
        mediaType: 'image',
        img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80'
      }
    });

    if (p.slug === 'corporate') {
       await CMSBlock.upsert({
         pageSlug: 'corporate',
         key: 'corporate_hero',
         type: 'corporate_hero',
         data: { titleHtml: 'Corporate Hub' }
       });
    }

    if (p.slug === 'environments') {
       await CMSBlock.upsert({
         pageSlug: 'environments',
         key: 'environments_page_content',
         type: 'environments_page_content',
         data: { hero: { titleHtml: 'Environments' } }
       });
    }

    if (p.slug === 'manufacturing') {
       await CMSBlock.upsert({
         pageSlug: 'manufacturing',
         key: 'manufacturing_hero',
         type: 'manufacturing_hero',
         data: { titleHtml: 'Manufacturing Hub' }
       });
    }

    if (p.slug === 'guides') {
      await CMSBlock.upsert({
        pageSlug: 'guides',
        key: 'guides_page_content',
        type: 'guides_page_content',
        data: { titleHtml: 'Setup Guides' }
      });
    }
  }

  console.log('✅ ALL MISSING PAGES SEEDED SUCCESSFULLY');
  process.exit(0);
}

seedMissing().catch(console.error);
