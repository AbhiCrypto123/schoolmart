const { Sequelize } = require('sequelize');

async function prune() {
  const s = new Sequelize('postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway', {
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  const canonical = [
    'home', 'corporate', 'aboutus', 'manufacturing', 'catalogues', 'environments', 'guides', 'contact-us',
    'furniture', 'architecture', 'school-building-design', 'digital', 'libraries', 'design', 'sports',
    'mathematics', 'gamified-math-labs', 'science', 'science-is-fun', 'labs', 'registration', 'login',
    'forgot-password', 'my-account', 'member-dashboard', 'school-sale', 'partnerships', 'setup-guide',
    'workshops', 'fundraising', 'how-it-works', 'sell-on-schoolmart', 'pricing', 'seller-help',
    'shipping-policy', 'cancellation-policy', 'replacement-return', 'order-rejection-policy', 'payments',
    'payment-policy', 'report-issue', 'blog', 'delivery-locations'
  ];

  try {
    await s.authenticate();
    console.log('--- PRUNING EXTRA SLUGS ---');
    const [rows] = await s.query('SELECT slug FROM "CMSPages"');
    for (const r of rows) {
      if (!canonical.includes(r.slug)) {
        await s.query('DELETE FROM "CMSPages" WHERE slug = ?', { replacements: [r.slug] });
        console.log(`DELETED: ${r.slug}`);
      }
    }
    console.log('--- PRUNING COMPLETE: 41+ PAGES REMAIN ---');
  } catch (err) {
    console.error(err.message);
  } finally {
    await s.close();
  }
}

prune();
