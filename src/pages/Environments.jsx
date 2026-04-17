// src/pages/Environments.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wind, Sun, Leaf, ArrowUpRight, CheckCircle2, Layers, ShieldCheck, Microscope } from 'lucide-react';
import { useCMSPage } from '../hooks/useCMSBlock';
import CMSMedia from '../components/ui/CMSMedia';
import CatalogueCard from '../components/CatalogueCard';

const DEFAULT_CONTENT = {
  hero: {
    badge: 'Sensory Hub 2025',
    titleHtml: 'Atmosphere <br/> <span class="text-[#004a8e] italic font-serif lowercase tracking-normal">is</span> <br/> Everything.',
    subtitle: 'Harmonizing architectural sensory design to stimulate deep academic performance.',
  },
  actionCard: {
    titleHtml: 'Request <br/> Environment Survey.',
    btnText: 'Apply Online',
  },
  heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  subBlocks: [
    { title: 'Eco Materials', subtitle: 'SUSTAINABLE', icon: 'Leaf' },
    { title: 'Sound Control', subtitle: 'ACOUSTICS', icon: 'Wind' },
    { title: 'Digital Lighting', subtitle: 'LUMENS V2', icon: 'Sun' },
  ],
  infoGrid: {
    titleHtml: 'Engineering <span class="text-[#004a8e]">Atmospheres.</span>',
    points: ['CFD Modeled', 'Acoustic Labs', 'UV Protected', 'Ergo Tech'],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80',
  },
  masonryItems: [
    { t: 'Natural Light Study', c: 'Optics', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
    { t: 'Acoustic Panel Grid', c: 'Sound', img: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=600&q=80' },
    { t: 'Biophilic Design', c: 'Nature', img: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80' },
    { t: 'Air Quality Lab', c: 'Climate', img: 'https://images.unsplash.com/photo-1581093196277-9f608109ca46?w=800&q=80' },
    { t: 'Botanical Courtyard', c: 'Organic', img: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&q=80' },
    { t: 'Zen Meditation Pod', c: 'Focus', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80' },
  ],
};

const ICONS = { Leaf, Wind, Sun, Layers };

const Environments = () => {
  const navigate = useNavigate();
  const { blocks, loading } = useCMSPage('environments');
  
  const d = blocks?.environments_page_content || DEFAULT_CONTENT;
  const heroData = blocks?.environments_page_content || d.hero;
  const masonryItems = (d.masonryItems?.length ? d.masonryItems : DEFAULT_CONTENT.masonryItems);

  // Instant fallback rendering

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4">
        
        <section className="relative h-[550px] lg:h-[650px] w-full rounded-[60px] overflow-hidden mb-12 group">
           {/* Background Image / Video */}
           <div className="absolute inset-0 z-0">
              <CMSMedia 
                mediaType={heroData?.mediaType} 
                mediaUrl={heroData?.mediaUrl} 
                fallbackImg="https://images.unsplash.com/photo-1541829070764-84a7d30dee73?w=1600&q=80"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent z-10" />
           </div>

           {/* Content Overlay */}
           <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-24">
              <div className="max-w-4xl">
                 <div className="flex items-center gap-4 mb-8 translate-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
                    <span className="h-[2px] w-12 bg-[#004a8e] rounded-full" />
                    <div className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-full text-[12px] uppercase tracking-[0.3em]">
                       {heroData?.badge || "Exploration 2025"}
                    </div>
                 </div>

                 <h1 className="text-5xl lg:text-[110px] font-black font-heading leading-[0.85] mb-8 tracking-tighter text-white uppercase drop-shadow-2xl translate-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-forwards" 
                    dangerouslySetInnerHTML={{ __html: heroData?.titleHtml || "Learning <br/> Reimagined" }} />
                 
                 <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 translate-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500 fill-mode-forwards">
                    <p className="text-white/70 text-[14px] lg:text-[16px] font-medium uppercase tracking-widest max-w-md leading-relaxed border-l-2 border-[#004a8e] pl-6">
                       {heroData?.subtitle || "Designing student-centered spaces that inspire growth."}
                    </p>
                    
                    <button className="px-10 py-5 bg-white text-black font-black uppercase text-[12px] tracking-widest rounded-full hover:bg-[#004a8e] hover:text-white transition-all shadow-2xl flex items-center gap-3 active:scale-95 group/btn">
                       Discover Zones <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
                    </button>
                 </div>
              </div>
           </div>

           {/* Animated Scroll Indicator overlay */}
           <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-6 text-white/40">
              <span className="[writing-mode:vertical-lr] text-[10px] font-black tracking-[0.4em] uppercase">Scroll</span>
              <div className="w-px h-24 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-dash" />
              </div>
           </div>
        </section>

        {/* MASONRY DISPLAY (SMALLER CARDS) */}
        <section className="py-2 border-t border-gray-100 mt-4">
           <div className="flex items-center justify-between py-4 mb-4">
              <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em] font-heading">Institutional Case Studies</h2>
              <div className="h-[1px] flex-grow mx-8 bg-gray-100" />
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                             {masonryItems.map((work, i) => (
                 <CatalogueCard 
                   key={i}
                   work={{ name: work.t, subcategory: work.c, image: work.img }} 
                   isSelected={selectedItem?.t === work.t} 
                   onClick={() => setSelectedItem(selectedItem?.t === work.t ? null : work)} 
                   onAction={() => navigate(`/environments/${work.t.toLowerCase().replace(/\s+/g, '-')}`)}
                   actionText="Read More"
                   themeColor="bg-[#004a8e]"
                   ringColor="ring-blue-100"
                   textColor="text-[#004a8e]"
                 />
              ))}
           </div>
        </section>

        {/* INFO GRID (COMPRESSED) */}
        <section className="py-10 border-t border-gray-100 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[40px] p-8 lg:p-12 shadow-sm">
           <div className="lg:col-span-7">
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 font-heading mb-8 leading-[0.9] uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: d.infoGrid?.titleHtml }} />
              <div className="grid grid-cols-2 gap-3">
                 {(d.infoGrid?.points || []).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[12px] font-black text-gray-900 uppercase tracking-widest bg-gray-50 p-5 rounded-2xl hover:border-[#004a8e]/20 border border-transparent transition-all">
                       <CheckCircle2 size={16} className="text-[#004a8e]" />
                       {item}
                    </div>
                 ))}
              </div>
           </div>
            <div className="lg:col-span-5 rounded-[40px] overflow-hidden border border-gray-100 h-[300px] lg:h-[350px]">
               <img src={d.infoGrid?.img || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80"} alt="Consultation" className="w-full h-full object-cover transition-all duration-1000" />
            </div>
        </section>

      </div>
    </main>
  );
};

export default Environments;

