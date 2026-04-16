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
  }, { tableName: 'CMSBlocks' });

  try {
    await sequelize.authenticate();
    
    // Fetch existing tiles block
    const block = await CMSBlock.findOne({ where: { pageSlug: 'home', key: 'tiles' } });
    if (!block) {
       console.log('Tiles block not found. Run masterSync first.');
       return;
    }

    const currentData = block.data;
    const dummyTiles = [
      { title: 'FUTURE CAMPUS', subtitle: 'Coming Soon', path: '/', height: 'h-64', img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=600&q=80' },
      { title: 'SPATIAL PLANNING', subtitle: 'Design Philosophy', path: '/', height: 'h-80', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
      { title: 'SMART LABS', subtitle: 'Equipment Hub', path: '/', height: 'h-56', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
      { title: 'GLOBAL PARTNERS', subtitle: 'Industry Leaders', path: '/', height: 'h-72', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80' },
      { title: 'GREEN ENERGY', subtitle: 'Sustainability', path: '/', height: 'h-48', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e2?w=600&q=80' },
      { title: 'INNOVATION HUB', subtitle: 'Idea Lab', path: '/', height: 'h-64', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80' },
      { title: 'PLAY AREAS', subtitle: 'Active Learning', path: '/', height: 'h-96', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
      { title: 'EXPERT GUIDES', subtitle: 'Resources', path: '/', height: 'h-52', img: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80' }
    ];

    // Combine existing with dummy
    block.data = { 
        ...currentData, 
        tiles: [...(currentData.tiles || []), ...dummyTiles] 
    };
    
    await block.save();
    console.log('✅ 8 Dummy Tiles Injected to fill space.');

  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
