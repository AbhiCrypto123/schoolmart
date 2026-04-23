// src/components/BannerSection.jsx
import { Link } from 'react-router-dom';
import SchoolReel from './SchoolReel';
import { useCMSBlock } from '../hooks/useCMSBlock';
import CMSMedia from './ui/CMSMedia';

const DEFAULTS = {
  badge: 'Price · Quality · Range Promise',
  headline1: 'FURNITURE',
  headline2: 'QUICK DELIVERY',
  subline1: 'Order Now',
  subline2: 'Kindergarten · Highschools · Labs · Libraries',
  cta1: { label: 'Shop Furniture →', path: '/furniture' },
  cta2: { label: 'View Catalogue', path: '/catalogues' },
};

const BannerSection = () => {
  const { data } = useCMSBlock('home', 'hero', DEFAULTS);
  const d = { ...DEFAULTS, ...data };

  return (
    <section className="pt-2 md:pt-4 pb-0 px-4 overflow-hidden relative bg-sm-gray">
      <div className="max-w-7xl mx-auto">
        <div 
          className="relative rounded-[40px] overflow-hidden shadow-sm border border-gray-200"
          style={{ background: d.bgColor || 'linear-gradient(to right, #ffffff, #f8f9fa, #f1f3f5)' }}
        >
          <div className="flex flex-col lg:flex-row items-stretch min-h-[320px]">

            {/* Left — Text Content */}
            <div className="flex-1 p-10 lg:p-14 z-10 flex flex-col justify-center">
              <p className="text-[12px] font-black text-sm-orange uppercase tracking-[0.3em] mb-4">
                {d.badge}
              </p>
              <h2
                className="text-4xl lg:text-6xl font-black font-heading leading-[1] mb-2 uppercase tracking-tighter"
                style={{ color: d.textColor || '#111827' }}
              >
                {d.headline1}
              </h2>
              <h2
                className="text-4xl lg:text-6xl font-black font-heading leading-[1] mb-8 uppercase tracking-tighter"
                style={{ color: '#F97316' }}
              >
                {d.headline2}
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={d.cta1?.path || '/furniture'}
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-sm-blue transition-all duration-300 text-[12px] uppercase tracking-widest shadow-xl shadow-gray-200"
                >
                  {d.cta1?.label || 'Get Started →'}
                </Link>
                <Link
                  to={d.cta2?.path || '/catalogues'}
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white border border-gray-200 font-black rounded-2xl hover:bg-gray-50 transition-all duration-300 text-[12px] uppercase tracking-widest"
                  style={{ color: d.textColor || '#111827' }}
                >
                  {d.cta2?.label || 'Institutional Catalogues'}
                </Link>
              </div>
            </div>

            {/* Right — School Reel / Image / Video */}
            <div className="flex-1 p-4 lg:p-5 flex items-center">
              <div className="w-full relative h-[260px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900/40">
                  <CMSMedia 
                    mediaType={d.mediaType} 
                    mediaUrl={d.mediaUrl} 
                    fallbackImg="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=85" 
                    className="w-full h-full object-cover" 
                  />
                
                {/* Branding Overlays */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-[11px] font-black uppercase tracking-widest">School Tour</span>
                </div>

                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white font-bold text-sm uppercase tracking-wide drop-shadow-lg">School Furniture</span>
                </div>


              </div>
            </div>
          </div>

          {/* Decorative left accent bar */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-l-2xl" />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
