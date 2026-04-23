const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './server/.env' });

async function deleteDummy() {
  const connectionString = 'postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway';
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  const CMSPage = sequelize.define('CMSPage', {
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'CMSPages' });
  
  const CMSBlock = sequelize.define('CMSBlock', {
    pageSlug: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'CMSBlocks' });

  try {
    await sequelize.authenticate();
    const countBlocks = await CMSBlock.destroy({ where: { pageSlug: 'architecture' } });
    const countPages = await CMSPage.destroy({ where: { slug: 'architecture' } });
    console.log(`Deleted ${countBlocks} blocks and ${countPages} pages for "architecture"`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

deleteDummy();
