require('dotenv').config();
const { sequelize } = require('./config/db');
const CMSBlock = require('./models/CMSBlock');

async function fix() {
  await sequelize.authenticate();
  
  await CMSBlock.destroy({where:{pageSlug:'environments'}});
  await CMSBlock.destroy({where:{pageSlug:'guides'}});
  
  await CMSBlock.upsert({
    pageSlug: 'environments',
    key: 'environments_page_content',
    type: 'inner_page_hero',
    data: {
      badge: 'Sensory Hub 2025',
      titleHtml: 'Atmosphere <br/> <span class="text-[#004a8e] italic font-serif lowercase tracking-normal">is</span> <br/> Everything.',
      subtitle: 'Harmonizing architectural sensory design to stimulate deep academic performance.',
      mediaType: 'image',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'
    }
  });

  await CMSBlock.upsert({
    pageSlug: 'guides',
    key: 'guides_page_content',
    type: 'inner_page_hero',
    data: {
      badge: 'Knowledge Base 2025',
      titleHtml: 'Strategy <br/> <span class="text-[#004a8e] italic font-serif lowercase tracking-normal">for</span> <br/> Compliance.',
      subtitle: 'Deep-dive into our institutional strategy handbooks and regulatory frameworks.',
      mediaType: 'image',
      img: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&q=80'
    }
  });

  console.log('✅ FIXED');
  process.exit(0);
}

fix().catch(console.log);
