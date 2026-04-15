
const User = require('./models/User');
const { connectDB } = require('./config/db');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    await connectDB();
    
    const adminEmail = 'admin@schoolmart.in';
    const adminPassword = 'Admin@123';

    // Hash the password manually to be 100% sure
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const existing = await User.findOne({ where: { email: adminEmail } });
    
    if (existing) {
      console.log('Admin exists. Overwriting with manual hash and verified status...');
      // We use update to bypass hooks if they are being problematic, or just set raw values
      await User.update({
        password: hashedPassword,
        isVerified: true,
        role: 'admin'
      }, {
        where: { email: adminEmail }
      });
      console.log('Admin updated successfully.');
    } else {
      await User.create({
        name: 'SchoolMart Admin',
        email: adminEmail,
        password: hashedPassword, // Note: hooks might hash this again if not careful
        role: 'admin',
        isVerified: true
      });
      console.log('Admin user created successfully.');
    }

    // Verify match locally for sanity check
    const verify = await User.findOne({ where: { email: adminEmail } });
    const isMatch = await bcrypt.compare(adminPassword, verify.password);
    console.log('Sanity Check - Does Password Match in DB?', isMatch);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
