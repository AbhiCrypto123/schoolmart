// src/pages/Guides.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Scroll, Target, ShieldCheck, Microscope, ArrowUpRight, CheckCircle2, Layers, Zap, GraduationCap, Award, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { useCMSPage } from '../hooks/useCMSBlock';
import { formatImgUrl } from '../utils/formatters';
import CMSMedia from '../components/ui/CMSMedia';
import CatalogueCard from '../components/CatalogueCard';

const DEFAULT_CONTENT = {
  hero: {
    badge: 'Knowledge Base 2025',
    titleHtml: 'Strategy <br/> <span class="text-[#004a8e] italic font-serif lowercase tracking-normal">for</span> <br/> Compliance.',
    subtitle: 'Deep-dive into our institutional strategy handbooks and regulatory frameworks.',
  },
  actionCard: {
    titleHtml: 'Request <br/> Strategy Audit.',
    btnText: 'Join Network',
  },
  heroImage: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&q=80',
  subBlocks: [
    { title: 'NEP 2024', subtitle: 'COMPLIANCE', icon: 'ShieldCheck' },
    { title: 'Parent Psychology', subtitle: 'STRATEGY', icon: 'Target' },
    { title: 'Campus Safety', subtitle: 'PROTOCOL', icon: 'BookOpen' },
  ],
  infoGrid: {
    titleHtml: 'Strategic <span class="text-[#004a8e]">Institutional growth.</span>',
    points: ['Validated Audits', 'Compliance Mapping', 'Enrollment Funnels', 'Growth Roadmap'],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80',
  },
  featured: {
    t: 'The Parents Magnet',
    c: 'Enrollment Strategy',
    d: 'How to redesign your school identity to attract the premium segment without losing heritage.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    tags: ['Branding', 'Admissions', 'Psychology']
  },
  // Mapping the environments style cards
  caseStudies: [
    { t: 'Digital Transformation', c: 'Technology', img: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80' },
    { t: 'Color Psychology', c: 'Interiors', img: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=800&q=80' },
    { t: 'Sustainable Labs', c: 'Science', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80' },
    { t: 'Inclusive Play', c: 'Sports', img: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&q=80' },
    { t: 'Library Re-imagined', c: 'Design', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80' },
    { t: 'Campus Safety 2025', c: 'Protocol', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80' },
    { t: 'Marketing Roadmap', c: 'Enrollment', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
    { t: 'Innovation Hubs', c: 'Growth', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80' },
  ],
};

const ICONS = { ShieldCheck, Target, BookOpen, Layers, Zap, GraduationCap, Award };

const Guides = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const { blocks, loading } = useCMSPage('guides');
  
  const d = blocks?.guides_page_content || DEFAULT_CONTENT;
  const heroData = blocks?.guides_page_content || d.hero;
  const items = d.caseStudies || DEFAULT_CONTENT.caseStudies;

  // Instant loading

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4">
        
        <section className="relative h-[550px] lg:h-[650px] w-full rounded-[60px] overflow-hidden mb-12 group">
           {/* Background Image / Video */}
           <div className="absolute inset-0 z-0">
              <CMSMedia 
                mediaType={heroData?.mediaType} 
                mediaUrl={heroData?.mediaUrl} 
                fallbackImg={d.heroImage || "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=1600&q=80"}
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent z-10" />
           </div>

           {/* Content Overlay */}
           <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-24">
              <div className="max-w-4xl">
                 <div className="flex items-center gap-4 mb-8 translate-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
                    <span className="h-[2px] w-12 bg-sm-blue rounded-full" />
                    <div className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-full text-[12px] uppercase tracking-[0.3em]">
                       {heroData?.badge || "Knowledge Base 2025"}
                    </div>
                 </div>

                 <h1 className="text-5xl lg:text-[110px] font-black font-heading leading-[0.85] mb-8 tracking-tighter text-white uppercase drop-shadow-2xl translate-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-forwards" 
                    dangerouslySetInnerHTML={{ __html: heroData?.titleHtml || 'Strategy <br/> <span class="text-sm-blue italic font-serif lowercase tracking-normal">for</span> <br/> Compliance.' }} />
                 
                 <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 translate-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500 fill-mode-forwards">
                    <p className="text-white/70 text-[14px] lg:text-[16px] font-medium uppercase tracking-widest max-w-md leading-relaxed border-l-2 border-sm-blue pl-6">
                       {heroData?.subtitle || "Deep-dive into our institutional strategy handbooks and regulatory frameworks."}
                    </p>
                    
                    <button 
                       onClick={() => navigate('/registration')}
                       className="px-10 py-5 bg-white text-black font-black uppercase text-[12px] tracking-widest rounded-full hover:bg-sm-blue hover:text-white transition-all shadow-2xl flex items-center gap-3 active:scale-95 group/btn"
                    >
                       Get Strategy Audit <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
                    </button>
                 </div>
              </div>
           </div>

           {/* Decorative elements to match Environments style */}
           <div className="absolute right-12 top-12 hidden lg:flex flex-col items-center gap-2 text-white/40">
              <BookOpen size={24} className="animate-pulse" />
           </div>
        </section>

        {/* SECTION 2: THE ENVIRONMENTS-STYLE MASONRY (AS REQUESTED) */}
        <section className="py-2 border-t border-gray-100 mt-2">
           <div className="flex items-center justify-between py-4 mb-4">
              <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em] font-heading">Institutional Strategy Guides</h2>
              <div className="h-[1px] flex-grow mx-8 bg-gray-100" />
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((work, i) => (
                 <CatalogueCard 
                   key={i}
                   work={{ name: work.t, subcategory: work.c, image: work.img }} 
                   isSelected={selectedItem?.t === work.t} 
                   onClick={() => setSelectedItem(selectedItem?.t === work.t ? null : work)} 
                   onAction={() => navigate(`/guides/${work.t.toLowerCase().replace(/\s+/g, '-')}`)}
                   actionText="Read More"
                   themeColor="bg-[#004a8e]"
                   ringColor="ring-blue-100"
                   textColor="text-[#004a8e]"
                 />
              ))}
           </div>
        </section>

        {/* SECTION 3: EDITORIAL BREAKOUT - THE PARENTS MAGNET */}
        <section className="my-10">
           <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col lg:flex-row min-h-[500px] group">
              <div className="flex-1 relative overflow-hidden">
                 <img src={d.featured?.img} alt="Featured" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute top-6 left-6 flex gap-2">
                    {(d.featured?.tags || []).map((tag, i) => (
                       <span key={i} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#004a8e] font-black rounded-full text-[8px] uppercase tracking-widest shadow-sm">
                          {tag}
                       </span>
                    ))}
                 </div>
              </div>
              <div className="flex-1 p-8 lg:p-20 flex flex-col justify-center bg-white relative">
                 <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#004a8e]/5 rounded-full blur-3xl -mr-32 -mb-32" />
                 <span className="text-[12px] font-black text-[#004a8e] uppercase tracking-[0.4em] mb-6 block">{d.featured?.c}</span>
                 <h2 className="text-4xl lg:text-6xl font-black font-heading leading-[0.9] mb-8 tracking-tighter text-gray-900 uppercase">
                    {d.featured?.t}
                 </h2>
                 <p className="text-gray-400 text-[13px] lg:text-[13px] font-bold uppercase tracking-widest mb-10 leading-relaxed max-w-sm">
                    {d.featured?.d}
                 </p>
                 <button 
                   onClick={() => navigate(`/guides/${d.featured?.t.toLowerCase().replace(/\s+/g, '-')}`)}
                   className="inline-flex items-center gap-4 text-[13px] font-black text-[#004a8e] uppercase tracking-widest group/btn"
                 >
                    Get Full Access <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" size={18} />
                 </button>
              </div>
           </div>
        </section>

      </div>
    </main>
  );
};

export default Guides;

