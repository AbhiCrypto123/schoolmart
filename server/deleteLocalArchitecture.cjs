const { sequelize } = require('./config/db');
const { DataTypes } = require('sequelize');

const CMSPage = sequelize.define('CMSPage', {
  slug: { type: DataTypes.STRING, unique: true, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'CMSPages' });

const CMSBlock = sequelize.define('CMSBlock', {
  pageSlug: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'CMSBlocks' });

async function deleteDummy() {
  try {
    await sequelize.authenticate();
    const countBlocks = await CMSBlock.destroy({ where: { pageSlug: 'architecture' } });
    const countPages = await CMSPage.destroy({ where: { slug: 'architecture' } });
    console.log(`Deleted ${countBlocks} blocks and ${countPages} pages for "architecture" from local DB`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

deleteDummy();
