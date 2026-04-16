
const { connectDB } = require('./config/db');
const CMSPage = require('./models/CMSPage');

async function list() {
  try {
    await connectDB();
    const pages = await CMSPage.findAll();
    console.log('--- CMS Pages in Database ---');
    pages.forEach(p => console.log(`- ${p.title} (${p.slug})`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
list();
