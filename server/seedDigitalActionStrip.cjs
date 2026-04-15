
const CMSBlock = require('./models/CMSBlock');
const CMSPage = require('./models/CMSPage');
const { connectDB } = require('./config/db');

async function seedDigitalActionStrip() {
  try {
    await connectDB();
    
    const page = await CMSPage.findOne({ where: { slug: 'digital' } });
    if (!page) {
      console.log('Digital page not found.');
      process.exit(0);
    }

    const existing = await CMSBlock.findOne({ where: { pageSlug: 'digital', key: 'action_strip' } });
    if (existing) {
      console.log('Action strip already exists for Digital Infra.');
      process.exit(0);
    }

    await CMSBlock.create({
      pageSlug: 'digital',
      key: 'action_strip',
      type: 'action_strip',
      data: {
        title: 'Digital Transformation 2025.',
        subtitle: 'UPTIME & SECURITY REPORT',
        bgColor: '#0A0A0A',
        textColor: '#FFFFFF',
        downloadPath: '/catalogues',
        btnType: 'shield'
      }
    });

    console.log('Successfully seeded Action Strip for Digital Infra.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding:', err);
    process.exit(1);
  }
}

seedDigitalActionStrip();
