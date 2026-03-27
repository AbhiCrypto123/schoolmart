// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const howItWorksLinks = [
    { name: 'How it works', path: '#' },
    { name: 'Brand Help', path: '#' },
    { name: 'Sell on schoolmart', path: '#' },
    { name: 'Pricing', path: '#' },
    { name: 'Seller Help', path: '#' },
    { name: 'Shipping Policy', path: '#' },
    { name: 'Cancellation Policy', path: '#' },
    { name: 'Replacement & Return', path: '#' },
    { name: 'Order Rejection Policy', path: '#' },
  ];

  const businessLinks = [
    { name: 'About Us', path: '/aboutus' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Report Issue', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Delivery Locations', path: '#' },
  ];

  const categoryLinks = [
    { name: 'FURNITURE - PRIMARY & HIGH SCHOOL', path: '/furniture' },
    { name: 'KINDERGARTEN', path: '/furniture' },
    { name: 'OFFICE FURNITURE', path: '/furniture' },
    { name: 'LABS & LIBRARIES - CHEMISTRY LABS', path: '/labs' },
    { name: 'BIOLOGY LAB', path: '/labs' },
    { name: 'STEM LABS', path: '/labs' },
    { name: 'MATH LABS', path: '/gamified-math-labs' },
    { name: 'COMPUTER LABS', path: '/labs' },
    { name: 'LIBRARY', path: '/labs' },
    { name: 'SPORTS - SPORTS SURFACES', path: '/sports' },
    { name: 'TECHNOLOGY - INTERACTIVE BOARDS', path: '/digital' },
    { name: 'ENVIRONMENT ROOMS', path: '/environments' },
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1 - About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">About Us</h3>
            <div className="text-sm text-gray-300 space-y-3 leading-relaxed">
              <p>
                <Link to="/" className="text-sm-green hover:text-white transition-colors duration-200">
                  schoolmart.in
                </Link>{' '}
                is a consortium of architects, designers, school innovators who strive to bring the learning outcome through latest infrastructure and edtech.
              </p>
              <p>
                We help schools in setting up new schools, expanding to new schools, design to execution, new environments, NEP ready environments, labs, libraries, sports infra etc.
              </p>
              <p>
                <Link to="/" className="text-sm-green hover:text-white transition-colors duration-200">
                  Schoolmart.in
                </Link>{' '}
                is an initiative of thirdeye group. Schoolmart has <span className="text-sm-yellow font-semibold">4000+</span> partner schools across India and helping them build their infrastructure since <span className="text-sm-yellow font-semibold">7 years</span>.
              </p>
            </div>
          </div>

          {/* Column 2 - How it Works */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">How it Works</h3>
            <ul className="space-y-2">
              {howItWorksLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Business */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Business</h3>
            <ul className="space-y-2">
              {businessLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Categories</h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <h3 className="text-base font-semibold mb-2 font-heading">What's Trending on SchoolMart</h3>
          <div className="flex flex-wrap gap-2">
            {trendingLinks.map((item) => (
              <span 
                key={item} 
                className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
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
