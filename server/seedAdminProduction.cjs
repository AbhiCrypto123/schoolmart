
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const connectionString = process.argv[2];
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  isVerified: { type: DataTypes.BOOLEAN }
}, { timestamps: true });

async function fix() {
  try {
    await sequelize.authenticate();
    const adminEmail = 'admin@schoolmart.in';
    const adminPassword = 'Admin@123';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const user = await User.findOne({ where: { email: adminEmail } });
    if (user) {
      await User.update({
        password: hashedPassword,
        isVerified: true,
        role: 'admin'
      }, { where: { email: adminEmail } });
      console.log('Updated existing user.');
    } else {
      await User.create({
        name: 'SchoolMart Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isVerified: true
      });
      console.log('Created new user.');
    }

    const verify = await User.findOne({ where: { email: adminEmail } });
    const isMatch = await bcrypt.compare(adminPassword, verify.password);
    console.log('LIVE DATABASE SANITY CHECK:', isMatch ? '✅ MATCH SUCCESS' : '❌ MATCH FAILED');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fix();
