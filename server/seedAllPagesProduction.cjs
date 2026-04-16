
const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const connectionString = process.argv[2];
if (!connectionString) {
  process.exit(1);
}

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

// Match the actual model in the repo
const CMSPage = sequelize.define('CMSPage', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

const pagesToSeed = [
  { slug: 'mathematics', title: 'Mathematics' },
  { slug: 'science', title: 'Science' },
  { slug: 'labs', title: 'Labs & Libraries' },
  { slug: 'architecture', title: 'Architecture' },
  { slug: 'environments', title: 'Environments' },
  { slug: 'guides', title: 'Guides & Manuals' },
  { slug: 'catalogues', title: 'Catalogues' },
  { slug: 'school-sale', title: 'School Sale' },
  { slug: 'design', title: 'School Designs' },
  { slug: 'manufacturing', title: 'Manufacturing' },
  { slug: 'corporate', title: 'Corporate Solutions' },
  { slug: 'aboutus', title: 'About Us' },
  { slug: 'how-it-works', title: 'How It Works' },
  { slug: 'pricing', title: 'Pricing' }
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to Production DB.');

    for (const p of pagesToSeed) {
      const existing = await CMSPage.findOne({ where: { slug: p.slug } });
      if (!existing) {
        await CMSPage.create({
          id: uuidv4(),
          slug: p.slug,
          title: p.title
        });
        console.log(`Created page: ${p.title} (/${p.slug})`);
      } else {
        console.log(`Page already exists: ${p.title} (/${p.slug})`);
      }
    }

    console.log('--- ALL PAGES SYNCED SUCCESSFULLY ---');
    process.exit(0);
  } catch (err) {
    console.error('SEED ERROR:', err);
    process.exit(1);
  }
}
seed();
