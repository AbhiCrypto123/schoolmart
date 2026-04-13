require('dotenv').config({ path: './.env' });
const { sequelize } = require('./config/db');
const User = require('./models/User');

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Find if admin already exists
    let admin = await User.findOne({ where: { email: 'admin@schoolmart.in' } });

    if (admin) {
      console.log('Admin user found. Resetting password and role...');
      admin.password = 'Admin@123';
      admin.role = 'admin';
      admin.isVerified = true;
      await admin.save();
    } else {
      console.log('Admin user not found. Creating new Super-Admin...');
      await User.create({
        name: 'Super Admin',
        email: 'admin@schoolmart.in',
        password: 'Admin@123',
        phone: '919966109191',
        role: 'admin',
        isVerified: true
      });
    }

    console.log('=========================================');
    console.log('✅ ADMIN RESTORED SUCCESSFULLY');
    console.log('Email: admin@schoolmart.in');
    console.log('Password: Admin@123');
    console.log('=========================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ SEEDING FAILED:', error);
    process.exit(1);
  }
}

seedAdmin();


