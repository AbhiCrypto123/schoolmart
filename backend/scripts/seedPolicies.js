const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Page = require('../models/Page');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schoolmart';

const policies = [
  {
    slug: 'shipping-policy',
    title: 'Shipping Policy',
    content: `
      <h2>Shipping & Delivery</h2>
      <p>At SchoolMart, we are committed to delivering your products in perfect condition and as quickly as possible. We partner with India's leading logistics providers to ensure a seamless delivery experience.</p>
      
      <h3>1. Delivery Timelines</h3>
      <ul>
        <li><strong>Standard Shipping:</strong> 7–15 business days across India.</li>
        <li><strong>Express Shipping:</strong> 3–5 business days in selected metro cities.</li>
        <li><strong>Institutional Furniture:</strong> Bulk orders or customized furniture may take 20–30 days for manufacturing and delivery.</li>
      </ul>

      <h3>2. Shipping Charges</h3>
      <ul>
        <li>Free shipping on orders above ₹10,000 for individual buyers.</li>
        <li>For institutional/bulk orders, shipping costs are calculated based on actual freight and location.</li>
      </ul>

      <h3>3. Order Tracking</h3>
      <p>Once your order is dispatched, you will receive an SMS and Email with the tracking number and link to our logistics partner's portal.</p>
    `
  },
  {
    slug: 'cancellation-policy',
    title: 'Cancellation Policy',
    content: `
      <h2>Order Cancellation</h2>
      <p>We understand that plans can change. Our cancellation policy is designed to be fair to both the customer and our manufacturing partners.</p>

      <h3>1. Cancellation Window</h3>
      <ul>
        <li>Orders can be cancelled within 24 hours of placement without any charges.</li>
        <li>Once the product enters the "Packing" or "Manufacturing" stage, cancellations are not accepted.</li>
      </ul>

      <h3>2. Refund Process</h3>
      <p>For prepaid orders cancelled within the allowed window, the refund will be processed to the original payment method within 5–7 business days.</p>
    `
  },
  {
    slug: 'replacement-return',
    title: 'Replacement & Return Policy',
    content: `
      <h2>Returns & Replacements</h2>
      <p>Due to the specialized nature of institutional supplies and furniture, we follow a strict return policy to maintain product hygiene and quality standards.</p>

      <h3>1. Manufacturing Defects</h3>
      <p>If you receive a product with a manufacturing defect or damage during transit, we provide a free replacement. You must report this within 48 hours of delivery.</p>

      <h3>2. Requirement for Claim</h3>
      <ul>
        <li>An unboxing video is mandatory for all damage/missing item claims.</li>
        <li>Items must be in original packaging with all tags and invoice.</li>
      </ul>

      <h3>3. Non-Returnable Items</h3>
      <p>Custom-designed furniture, software licenses, and digitized content are non-returnable once the order is processed.</p>
    `
  },
  {
    slug: 'order-rejection-policy',
    title: 'Order Rejection Policy',
    content: `
      <h2>Order Rejection</h2>
      <p>SchoolMart reserves the right to reject or cancel any order for reasons including but not limited to:</p>
      <ul>
        <li>Product unavailability or end-of-life status.</li>
        <li>Pricing errors or incorrect promotional codes.</li>
        <li>Failure in payment verification.</li>
        <li>Delivery location being in an unserviceable or high-risk zone.</li>
      </ul>
      <p>In all such cases, a full refund will be initiated immediately.</p>
    `
  },
  {
    slug: 'how-it-works',
    title: 'How It Works',
    content: `
      <h2>Building the Future of Learning</h2>
      <p>SchoolMart is more than just a marketplace; it is a full-service infrastructure ecosystem for educational institutions.</p>

      <h3>1. Explore & Select</h3>
      <p>Browse through our NEP-ready catalogues, from modular furniture to advanced Science and STEM labs.</p>

      <h3>2. Expert Consultation</h3>
      <p>For bulk or complex requirements, our school architects provide free layout planning and resource auditing.</p>

      <h3>3. Secure Procurement</h3>
      <p>Place your order directly on our platform or request a customized quote for institutional pricing.</p>

      <h3>4. Delivery & Installation</h3>
      <p>We handle everything from door-step delivery to professional installation and staff training.</p>
    `
  },
  {
    slug: 'sell-on-schoolmart',
    title: 'Sell on SchoolMart',
    content: `
      <h2>Partner with India's Largest School Network</h2>
      <p>Join the Consortium of 4000+ partner schools and reach decision-makers across the education sector.</p>

      <h3>Why Sell with Us?</h3>
      <ul>
        <li><strong>Direct Access:</strong> Reach B2B institutional buyers directly.</li>
        <li><strong>Marketing Support:</strong> Featured placement in our annual catalogues.</li>
        <li><strong>Logistics:</strong> Pan-India delivery support via Shiprocket.</li>
      </ul>
      <p>Contact us at vendor@schoolmart.in to start your onboarding today.</p>
    `
  },
  {
    slug: 'pricing',
    title: 'Pricing & Transparent Billing',
    content: `
      <h2>Institutional Pricing</h2>
      <p>SchoolMart offers transparent, volume-based pricing for all educational institutions.</p>
      <ul>
        <li><strong>Member Discounts:</strong> Partner schools get an average of 15% discount on MRP.</li>
        <li><strong>GST Invoicing:</strong> All orders come with valid GST invoices for input tax credit.</li>
        <li><strong>Quote-based Pricing:</strong> For custom furniture or bulk lab setups, request a formal quote for the best project rates.</li>
      </ul>
    `
  },
  {
    slug: 'seller-help',
    title: 'Seller Help Center',
    content: `
      <h2>Onboarding & Management</h2>
      <p>Our seller portal is designed to make listing school resources simple and profitable.</p>
      <ul>
        <li><strong>Catalog Management:</strong> How to upload images and descriptions.</li>
        <li><strong>Order Fulfillment:</strong> Managing Shiprocket pickups and manifests.</li>
        <li><strong>Payment Cycles:</strong> Understanding the 7-day settlement period.</li>
      </ul>
    `
  },
  {
    slug: 'payments',
    title: 'Safe & Secure Payments',
    content: `
      <h2>Payment Methods</h2>
      <p>We use industry-standard encryption to ensure your transactions are always safe.</p>
      <ul>
        <li><strong>Online Payments:</strong> Credit/Debit Cards, Net Banking, and UPI via Razorpay.</li>
        <li><strong>Institutional Credit:</strong> Available for partner schools with verified credit history (15-30 day cycles).</li>
        <li><strong>Wire Transfers:</strong> RTGS/NEFT details are available on every formal quote.</li>
      </ul>
    `
  },
  {
    slug: 'report-issue',
    title: 'Report an Issue',
    content: `
      <h2>We are here to help</h2>
      <p>If you have encountered any issues with your order, payment, or the website, please report it immediately.</p>
      <p>Contact us at support@schoolmart.in or call our helpline at +91 9966109191.</p>
    `
  },
  {
    slug: 'blog',
    title: 'SchoolMart Blog',
    content: `
      <h2>Insights for Educational Leaders</h2>
      <p>Stay updated with the latest trends in school infrastructure, NEP 2020 compliance, and educational technology.</p>
      <p>Articles coming soon in our 2025 Summer Edition.</p>
    `
  },
  {
    slug: 'delivery-locations',
    title: 'Delivery Locations',
    content: `
      <h2>Pan-India Coverage</h2>
      <p>SchoolMart delivers to educational institutions across all states and union territories in India.</p>
      <p>From rural primary schools to urban K-12 campuses, our logistics network handles it all.</p>
    `
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    for (const p of policies) {
      const pageData = {
        pageSlug: p.slug,
        pageTitle: p.title,
        blocks: [
          {
            blockType: 'inner_page_hero',
            order: 0,
            data: {
              title: p.title,
              badge: 'LEGAL & COMPLIANCE',
              description: `Last updated: April 2025. Official policies for SchoolMart India regarding ${p.title.toLowerCase()}.`,
              icon: 'Shield',
              theme: 'Dark',
              actionText: 'Contact Legal Team'
            }
          },
          {
            blockType: 'text_content',
            order: 1,
            data: {
              title: 'Policy Details',
              body: p.content
            }
          }
        ]
      };

      await Page.findOneAndUpdate(
        { pageSlug: p.slug },
        pageData,
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded page: ${p.slug}`);
    }

    console.log('✨ All policy pages seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding policies:', err);
    process.exit(1);
  }
}

seed();
