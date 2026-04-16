const { Sequelize, DataTypes } = require('sequelize');

async function run() {
  const connectionString = process.argv[2];
  if (!connectionString) {
    console.error('Please provide DATABASE_URL');
    process.exit(1);
  }

  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  const CMSBlock = sequelize.define('CMSBlock', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    pageSlug: { type: DataTypes.STRING, allowNull: false },
    key: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.JSONB, defaultValue: {} },
    order: { type: DataTypes.INTEGER, defaultValue: 0 },
    isVisible: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'CMSBlocks' });

  const Product = sequelize.define('Product', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    category: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10, 2) },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  }, { tableName: 'Products' });

  try {
    await sequelize.authenticate();
    console.log('Connected to Production.');

    // 1. Seed Home Modules
    const blocks = [
      { pageSlug: 'home', key: 'topbar', type: 'topbar', order: 1, data: { bgColor: '#0057A8', textColor: '#FFFFFF', email: 'info@schoolmart.in' } },
      { pageSlug: 'home', key: 'navbar', type: 'navbar', order: 2, data: { categories: [{ name: 'FURNITURE', path: '/furniture', icon: 'Armchair' }] } },
      { pageSlug: 'home', key: 'hero', type: 'hero', order: 3, data: { headline1: 'FURNITURE', headline2: 'QUICK DELIVERY' } },
      { pageSlug: 'aboutus', key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { titleHtml: 'The Collective', subtitle: 'Innovation in Education' } }
    ];

    for (const b of blocks) {
      await CMSBlock.findOrCreate({ where: { pageSlug: b.pageSlug, key: b.key }, defaults: b });
    }

    // 2. Seed Products
    const products = [
      { name: 'Ergonomic Student Chair', slug: 'ergo-student-chair', category: 'FURNITURE', price: 4500, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80' },
      { name: 'Interactive SMART Panel 65"', slug: 'smart-panel-65', category: 'DIGITAL', price: 125000, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' }
    ];

    for (const p of products) {
        await Product.findOrCreate({ where: { slug: p.slug }, defaults: p });
    }

    console.log('✅ Production Data Seeded Successfully (Blocks & Products).');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
