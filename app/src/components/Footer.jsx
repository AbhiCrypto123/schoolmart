// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const brandHelp = [
    { name: 'How it works', path: '/p/how-it-works' },
    { name: 'Sell on schoolmart', path: '/p/sell-on-schoolmart' },
    { name: 'Pricing', path: '/p/pricing' },
    { name: 'Seller Help', path: '/p/seller-help' },
    { name: 'Shipping Policy', path: '/p/shipping-policy' },
    { name: 'Cancellation Policy', path: '/p/cancellation-policy' },
    { name: 'Replacement & Return', path: '/p/replacement-return' },
    { name: 'Order Rejection Policy', path: '/p/order-rejection-policy' },
    { name: 'Payments', path: '/p/payments' },
  ];

  const schoolHelp = [
    { name: 'Shipping Policy', path: '/p/shipping-policy' },
    { name: 'Cancellation Policy', path: '/p/cancellation-policy' },
    { name: 'Replacement & Return', path: '/p/replacement-return' },
    { name: 'Payment Policy', path: '/p/payments' },
    { name: 'Order Rejection Policy', path: '/p/order-rejection-policy' },
  ];

  const businessLinks = [
    { name: 'About Us', path: '/aboutus' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Report Issue', path: '/p/report-issue' },
    { name: 'Blog', path: '/p/blog' },
    { name: 'Delivery Locations', path: '/p/delivery-locations' },
  ];

  const trendingLinks = [
    'NEP READY ULTRA MODERN LABS',
    'STEM LAB DESIGN',
    'FUTURISTIC SCHOOL ARCHITECTURE',
    'MINI SPORTS ACADEMIES',
    'THEME SCHOOL DESIGNS',
    'DIGITISATION OF ENTIRE CAMPUS',
    'INTERACTIVE MATH WALLS',
    'SMART SCIENCE ROOMS',
    'SCIENCE LAB DESIGN',
    'ART & CRAFT ROOMS',
    '2D/3D ANIMATED VIDEOS',
    'AUGMENTED REALITY CONTENT',
  ];

  return (
    <footer className="bg-sm-navy text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#FFDB00] font-heading">About Us</h3>
            <div className="text-[13px] text-gray-300 space-y-4 leading-relaxed font-medium">
              <p>
                <Link to="/" className="text-white hover:text-[#FFDB00] transition-colors duration-200 font-bold border-b border-white/20">
                  schoolmart.in
                </Link>{' '}
                is a consortium of architects, designers, school innovators who strive to bring the learning outcome through latest infrastructure and edtech.
              </p>
              <p>
                We help schools in setting up new schools, expanding to new schools, design to execution, new environments, NEP ready environments, labs, libraries, sports infra etc.
              </p>
              <p>
                <Link to="/" className="text-white hover:text-[#FFDB00] transition-colors duration-200 font-bold border-b border-white/20">
                  Schoolmart.in
                </Link>{' '}
                is an initiative of thirdeye group. Schoolmart has <span className="text-[#FFDB00] font-black">4000+</span> partner schools across India and helping them build their infrastructure since <span className="text-[#FFDB00] font-black">7 years</span>.
              </p>
            </div>
          </div>

          {/* Column 2 - Brand & Seller Help */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#FFDB00] mb-6 font-heading">Brand & Seller Help</h3>
            <ul className="space-y-3">
              {brandHelp.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-[13px] text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - School Help */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#FFDB00] mb-6 font-heading">School Help</h3>
            <ul className="space-y-3">
              {schoolHelp.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-[13px] text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Business */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#FFDB00] mb-6 font-heading">Business</h3>
            <ul className="space-y-3">
              {businessLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-[13px] text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-4 font-heading">Industry Insights & Trends</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {trendingLinks.map((item) => (
              <span 
                key={item} 
                className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 hover:text-[#FFDB00] cursor-pointer transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-sm-blue py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/80">
            © 2016-2023, Third Eye Retail Pvt. Ltd.
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="#" className="text-sm text-white/80 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-white/80 hover:text-white transition-colors duration-200">
              Terms of Use
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-white/80">Keep in Touch</span>
            <a 
              href="https://www.facebook.com/schoolmart.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="https://twitter.com/schoolmarts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <Twitter size={16} />
            </a>
            <a 
              href="https://www.youtube.com/channel/UCgKY_Kf8jH1hoP3p0I0tiRA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
