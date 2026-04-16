const { Sequelize, DataTypes } = require('sequelize');

async function seedAll() {
  const connectionString = process.argv[2];
  if (!connectionString) {
    console.error('Please provide the connection string as an argument.');
    process.exit(1);
  }

  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  const CMSPage = sequelize.define('CMSPage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'CMSPages' });

  const pages = [
    { slug: 'home', title: 'HOME PAGE' },
    { slug: 'furniture', title: 'FURNITURE PAGE' },
    { slug: 'architecture', title: 'ARCHITECTURE' },
    { slug: 'digital', title: 'DIGITAL INFRASTRUCTURE' },
    { slug: 'sports', title: 'SPORTS PAGE' },
    { slug: 'libraries', title: 'LIBRARIES' },
    { slug: 'environments', title: 'ENVIRONMENTS' },
    { slug: 'aboutus', title: 'ABOUT US' },
    { slug: 'contact-us', title: 'CONTACT US' },
    { slug: 'mathematics', title: 'MATHEMATICS' },
    { slug: 'science', title: 'SCIENCE' },
    { slug: 'labs', title: 'LABS & LIBRARIES' },
    { slug: 'design', title: 'SCHOOL DESIGNS' },
    { slug: 'manufacturing', title: 'MANUFACTURING' },
    { slug: 'corporate', title: 'CORPORATE SOLUTIONS' },
    { slug: 'catalogues', title: 'CATALOGUES' },
    { slug: 'guides', title: 'GUIDES & MANUALS' },
    { slug: 'school-sale', title: 'SCHOOL SALE' },
    { slug: 'partnerships', title: 'PARTNERSHIPS' },
    { slug: 'setup-guide', title: 'SETUP GUIDE' },
    { slug: 'workshops', title: 'WORKSHOPS' },
    { slug: 'fundraising', title: 'FUNDRAISING' },
    { slug: 'how-it-works', title: 'HOW IT WORKS' },
    { slug: 'pricing', title: 'PRICING' },
    { slug: 'shipping-policy', title: 'SHIPPING POLICY' },
    { slug: 'cancellation-policy', title: 'CANCELLATION POLICY' },
    { slug: 'replacement-return', title: 'REPLACEMENT & RETURN' },
    { slug: 'payments', title: 'PAYMENTS' },
    { slug: 'order-rejection-policy', title: 'ORDER REJECTION POLICY' },
    { slug: 'seller-help', title: 'SELLER HELP' },
    { slug: 'sell-on-schoolmart', title: 'SELL ON SCHOOLMART' },
    { slug: 'report-issue', title: 'REPORT ISSUE' },
    { slug: 'blog', title: 'BLOG' },
    { slug: 'delivery-locations', title: 'DELIVERY LOCATIONS' },
    { slug: 'registration', title: 'REGISTRATION' },
    { slug: 'login', title: 'LOGIN' },
    { slug: 'forgot-password', title: 'FORGOT PASSWORD' }
  ];

  try {
    await sequelize.authenticate();
    for (const p of pages) {
      await CMSPage.findOrCreate({ where: { slug: p.slug }, defaults: p });
    }
    console.log('✅ All 37 pages synchronized with production database.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

seedAll().catch(err => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
