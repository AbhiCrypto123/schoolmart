const { Sequelize, DataTypes } = require('sequelize');

async function listPages() {
  const connectionString = 'postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway';
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

  const CMSPage = sequelize.define('CMSPage', {
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'CMSPages' });

  try {
    await sequelize.authenticate();
    const pages = await CMSPage.findAll();
    console.log('--- CURRENT PAGES IN DB ---');
    pages.forEach(p => console.log(`- ${p.title} (${p.slug})`));
    console.log('---------------------------');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

listPages();
