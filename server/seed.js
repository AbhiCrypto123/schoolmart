const { sequelize } = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true }); // Warning: This drops tables and recreates them
    console.log('Database cleared and synced for seeding...');

    const categories = [
      {
        name: 'Furniture', slug: 'furniture', icon: 'Armchair',
        children: [
          { name: 'Desks', slug: 'desks' },
          { name: 'Seating', slug: 'seating' },
          { name: 'Lab Furniture', slug: 'lab-furniture' },
          { name: 'Storage', slug: 'storage' },
          { name: 'Cafeteria', slug: 'cafeteria' }
        ]
      },
      {
        name: 'Architecture', slug: 'architecture', icon: 'Building',
        children: [
          { name: '3D Plans', slug: '3d-plans' },
          { name: 'Site Prep', slug: 'site-prep' },
          { name: 'Interior Design', slug: 'interior-design' },
          { name: 'Landscape', slug: 'landscape' },
          { name: 'Infrastructure', slug: 'infrastructure' }
        ]
      },
      {
        name: 'Digital Infra', slug: 'digital-infra', icon: 'Cpu',
        children: [
          { name: 'Smart Boards', slug: 'smart-boards' },
          { name: 'Networking', slug: 'networking' },
          { name: 'Servers', slug: 'servers' },
          { name: 'Audio Systems', slug: 'audio-systems' },
          { name: 'Security', slug: 'security' }
        ]
      },
      {
        name: 'School Designs', slug: 'school-designs', icon: 'PencilRuler',
        children: [
          { name: 'Theme Designs', slug: 'theme-designs' },
          { name: 'Layouts', slug: 'layouts' },
          { name: 'Modular Blocks', slug: 'modular-blocks' },
          { name: 'Safety Plans', slug: 'safety-plans' },
          { name: 'Sustainability', slug: 'sustainability' }
        ]
      },
      {
        name: 'Libraries', slug: 'libraries', icon: 'BookOpen',
        children: [
          { name: 'Stack Area', slug: 'stack-area' },
          { name: 'Reading Nooks', slug: 'reading-nooks' },
          { name: 'Digital Archives', slug: 'digital-archives' },
          { name: 'Collaborative', slug: 'collaborative' },
          { name: 'Librarian Hub', slug: 'librarian-hub' }
        ]
      },
      {
        name: 'Sports', slug: 'sports', icon: 'Trophy',
        children: [
          { name: 'Track & Field', slug: 'track-and-field' },
          { name: 'Playground', slug: 'playground' },
          { name: 'Indoor Courts', slug: 'indoor-courts' },
          { name: 'Equipment', slug: 'equipment' },
          { name: 'Gym Tech', slug: 'gym-tech' }
        ]
      },
      {
        name: 'Mathematics', slug: 'mathematics', icon: 'Calculator',
        children: [
          { name: 'Math Kits', slug: 'math-kits' },
          { name: 'Manipulatives', slug: 'manipulatives' },
          { name: 'Puzzle Tech', slug: 'puzzle-tech' },
          { name: 'Visual Aids', slug: 'visual-aids' },
          { name: 'Games', slug: 'games' }
        ]
      },
      {
        name: 'Science', slug: 'science', icon: 'FlaskConical',
        children: [
          { name: 'Chemistry', slug: 'chemistry' },
          { name: 'Physics', slug: 'physics' },
          { name: 'Biology', slug: 'biology' },
          { name: 'Composite Labs', slug: 'composite-labs' }
        ]
      },
      {
        name: 'Labs', slug: 'labs', icon: 'Beaker',
        children: [
          { name: 'Steam Lab', slug: 'steam-lab' },
          { name: 'Robotics Lab', slug: 'robotics-lab' },
          { name: 'Composite Lab', slug: 'composite-lab' }
        ]
      }
    ];

    for (const catData of categories) {
      const parent = await Category.create({
        name: catData.name,
        slug: catData.slug,
        icon: catData.icon
      });

      if (catData.children) {
        for (const sub of catData.children) {
          const child = await Category.create({
            name: sub.name,
            slug: sub.slug,
            parentId: parent.id
          });

          // Create 4 products for each sub-category
          const variations = ['Standard', 'Premium', 'Elite', 'Industrial'];
          const suffix = ['Model A', 'Pro Series', 'Gen 2', 'Plus'];

          const products = variations.map((v, i) => ({
            name: `${v} ${sub.name} ${suffix[i]}`,
            slug: `${sub.slug}-${v.toLowerCase()}-${i}`,
            description: `High-quality ${sub.name} designed specifically for professional school infrastructure. Certified for safety and durability.`,
            price: Math.floor(Math.random() * 5000) + 2000,
            CategoryId: child.id,
            isInstitutional: true,
            images: [
              i % 2 === 0 
                ? 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800'
                : 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
            ]
          }));

          await Product.bulkCreate(products);
        }
      }
    }

    console.log('Database Successfully Seeded with 50+ Products!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();

