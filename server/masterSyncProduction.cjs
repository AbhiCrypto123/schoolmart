const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Local Database (from .env)
const localSequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
});

async function run() {
  const connectionString = process.argv[2];
  if (!connectionString) {
    console.error('Please provide Railway DATABASE_URL');
    process.exit(1);
  }

  // Production Database
  const prodSequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  // Define Models for both
  const defineModels = (s) => ({
    Category: s.define('Category', { id: { type: DataTypes.UUID, primaryKey: true }, name: DataTypes.STRING, slug: DataTypes.STRING, description: DataTypes.TEXT, image: DataTypes.STRING, icon: DataTypes.STRING, parentId: DataTypes.UUID }, { tableName: 'Categories' }),
    Product: s.define('Product', {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: { type: DataTypes.STRING },
      slug: { type: DataTypes.STRING },
      category: { type: DataTypes.STRING },
      subcategory: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL },
      isFeatured: { type: DataTypes.BOOLEAN },
      isNewProduct: { type: DataTypes.BOOLEAN },
      stats: { type: DataTypes.JSONB },
      resources: { type: DataTypes.JSONB },
      featuresTitle: { type: DataTypes.STRING },
      executionTitle: { type: DataTypes.STRING },
      ctaLabel: { type: DataTypes.STRING },
      ctaLink: { type: DataTypes.STRING },
      chatLabel: { type: DataTypes.STRING },
      chatLink: { type: DataTypes.STRING },
      features: { type: DataTypes.JSONB },
      images: { type: DataTypes.ARRAY(DataTypes.STRING) },
      isInstitutional: { type: DataTypes.BOOLEAN },
      status: { type: DataTypes.STRING },
      CategoryId: { type: DataTypes.UUID }
    }, { tableName: 'Products' }),
    CMSPage: s.define('CMSPage', { id: { type: DataTypes.UUID, primaryKey: true }, slug: DataTypes.STRING, title: DataTypes.STRING }, { tableName: 'CMSPages' }),
    CMSBlock: s.define('CMSBlock', { id: { type: DataTypes.UUID, primaryKey: true }, pageSlug: DataTypes.STRING, key: DataTypes.STRING, type: DataTypes.STRING, data: DataTypes.JSONB, order: DataTypes.INTEGER, isVisible: DataTypes.BOOLEAN }, { tableName: 'CMSBlocks' })
  });

  const local = defineModels(localSequelize);
  const prod = defineModels(prodSequelize);

  try {
    await localSequelize.authenticate();
    await prodSequelize.authenticate();
    console.log('Connected to both Local and Production databases.');

    // --- CLEANUP PRODUCTION FIRST ---
    console.log('Cleaning up live database for a fresh mirror...');
    await prod.CMSBlock.destroy({ where: {}, truncate: false });
    await prod.Product.destroy({ where: {}, truncate: false });
    await prod.CMSPage.destroy({ where: {}, truncate: false });
    await prod.Category.destroy({ where: {}, truncate: false });
    console.log('Live database cleared.');

    // --- START SYNC ---
    // 1. Sync Categories
    const categories = await local.Category.findAll({ raw: true });
    await prod.Category.bulkCreate(categories);
    console.log(`Synced ${categories.length} Categories.`);

    // 2. Sync CMS Pages
    const pages = await local.CMSPage.findAll({ raw: true });
    await prod.CMSPage.bulkCreate(pages);
    console.log(`Synced ${pages.length} CMS Pages.`);

    // 3. Sync CMS Blocks
    const blocks = await local.CMSBlock.findAll({ raw: true });
    await prod.CMSBlock.bulkCreate(blocks);
    console.log(`Synced ${blocks.length} CMS Blocks.`);

    // 4. Sync Products
    const products = await local.Product.findAll({ raw: true });
    await prod.Product.bulkCreate(products);
    console.log(`Synced ${products.length} Products.`);

    console.log('\n🚀 ALL DATA MIGRATED SUCCESSFULLY TO PRODUCTION!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    process.exit(0);
  }
}

run();
