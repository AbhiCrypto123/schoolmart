require('dotenv').config();
const { sequelize } = require('./config/db');
const CMSBlock = require('./models/CMSBlock');

async function fix() {
  await sequelize.authenticate();
  
  await CMSBlock.destroy({where:{pageSlug: 'manufacturing', key: 'manufacturing_hero'}});
  
  await CMSBlock.upsert({
    pageSlug: 'manufacturing',
    key: 'manufacturing_hero',
    type: 'manufacturing_hero',
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
  });

  console.log('✅ FIXED MANUFACTURING HERO');
  process.exit(0);
}

fix().catch(console.log);
