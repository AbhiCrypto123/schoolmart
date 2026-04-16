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

  const HOME_BLOCKS = [
    { key: 'topbar', type: 'topbar', order: 1, data: { bgColor: '#0057A8', textColor: '#FFFFFF', email: 'info@schoolmart.in', phone1: '+91 9966109191', phone2: '+91 9866091111' } },
    { key: 'navbar', type: 'navbar', order: 2, data: { categories: [{ name: 'FURNITURE', path: '/furniture', icon: 'Armchair' }] } },
    { key: 'hero', type: 'hero', order: 3, data: { headline1: 'FURNITURE', headline2: 'QUICK DELIVERY', subline1: 'Order Now' } },
    { key: 'solutions', type: 'solutions', order: 4, data: { heading: 'Explore Our Solutions' } }
  ];

  try {
    await sequelize.authenticate();
    console.log('Connected to Production Database.');

    for (const b of HOME_BLOCKS) {
      await CMSBlock.findOrCreate({
        where: { pageSlug: 'home', key: b.key },
        defaults: { ...b, pageSlug: 'home' }
      });
    }

    console.log('✅ Home Page Modules Seeded Successfully.');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
