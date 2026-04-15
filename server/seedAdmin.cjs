
const User = require('./models/User');
const { connectDB } = require('./config/db');

async function seedAdmin() {
  try {
    await connectDB();
    
    const adminEmail = 'admin@schoolmart.in';
    const adminPassword = 'Admin@123';

    const existing = await User.findOne({ where: { email: adminEmail } });
    
    if (existing) {
      console.log('Admin already exists. Updating password and verification status...');
      existing.password = adminPassword;
      existing.isVerified = true;
      existing.role = 'admin';
      await existing.save();
      console.log('Admin updated successfully.');
    } else {
      await User.create({
        name: 'SchoolMart Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isVerified: true
      });
      console.log('Admin user created successfully.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
