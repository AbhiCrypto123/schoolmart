// src/pages/SchoolDesigns.jsx
import React, { useState, useEffect } from 'react';
import { useCMSPage } from '../hooks/useCMSBlock';
import { getProducts } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Palette, Pencil, Ruler, Layers, Building, ArrowRight, ArrowUpRight, Download, Eye, FileText, CheckCircle2, Stars, Compass, Lightbulb, ChevronDown } from 'lucide-react';
import CMSMedia from '../components/ui/CMSMedia';
import CatalogueCard from '../components/CatalogueCard';

const SchoolDesigns = () => {
  const navigate = useNavigate();
  const { blocks, loading } = useCMSPage('design');
  const [items, setItems] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');

  const heroBlock = blocks?.inner_page_hero || {};
  const sidebarCategories = blocks?.sidebar_categories || {};

  useEffect(() => {
    getProducts({ category: 'School Designs' }).then(res => {
      setItems(res || []);
      const defaultCat = sidebarCategories.categories?.[0] || 'Theme Designs';
      setSelectedCat(defaultCat);
    });
  }, [sidebarCategories]);
  const sidebarResources = blocks?.sidebar_resources || {};
  const sidebarTrending = blocks?.sidebar_trending || {};
  
  const cats = sidebarCategories.categories || [];
  const filteredItems = items.filter(p => !selectedCat || (p.subcategory || '').toUpperCase() === selectedCat.toUpperCase());






  return (
    <main className="min-h-screen bg-gray-50 pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <section className="relative h-[550px] lg:h-[650px] w-full rounded-[60px] overflow-hidden mb-12 group">
           {/* Background Image / Video */}
           <div className="absolute inset-0 z-0">
              <CMSMedia 
                mediaType={heroBlock.mediaType} 
                mediaUrl={heroBlock.mediaUrl} 
                fallbackImg={heroBlock.img || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"}
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/30 to-transparent z-10" />
           </div>

           {/* Content Overlay */}
           <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-24">
              <div className="max-w-4xl">
                 <div className="flex items-center gap-4 mb-8 translate-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
                    <span className="h-[2px] w-12 bg-sm-blue rounded-full" />
                    <div className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-full text-[12px] uppercase tracking-[0.3em]">
                       {heroBlock.badge || "Studio 2025"}
                    </div>
                 </div>

                 <h1 className="text-5xl lg:text-[110px] font-black font-heading leading-[0.85] mb-8 tracking-tighter text-white uppercase drop-shadow-2xl translate-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-forwards" 
                    dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || "Imagine <br/> <span class=\"text-sm-blue italic font-serif lowercase tracking-normal\">the</span> <br/> Infinite." }} />
                 
                 <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 translate-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500 fill-mode-forwards">
                    <p className="text-white/70 text-[14px] lg:text-[16px] font-medium uppercase tracking-widest max-w-md leading-relaxed border-l-2 border-sm-blue pl-6">
                       {heroBlock.subtitle || "We create non-linear, adaptive spaces where students explore and flourish."}
                    </p>
                    
                    <button className="px-10 py-5 bg-white text-black font-black uppercase text-[12px] tracking-widest rounded-full hover:bg-sm-blue hover:text-white transition-all shadow-2xl flex items-center gap-3 active:scale-95 group/btn">
                       View Portfolio <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* CATEGORY NAV & MAIN CONTENT GALLERY */}
        <section className="py-8 border-t border-gray-100 flex flex-col md:flex-row gap-8 items-start">
            {/* LEFT SIDEBAR CATEGORY */}
            <div className="w-full md:w-64 shrink-0 space-y-6 sticky top-24">
               {/* Relevant Sub-categories */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 px-4">
                     <span className="w-1 h-4 bg-sm-blue rounded-full" />
                     <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em]">COLLECTIONS</h3>
                  </div>
                  <div className="flex flex-col gap-2 px-2">
                     {cats.map((c, i) => (
                        <button 
                          key={i} 
                          onClick={() => { setSelectedCat(c); document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' }); }} 
                          className={`w-full text-left px-5 py-4 rounded-xl text-[13px] font-black uppercase tracking-[0.05em] transition-all flex items-center justify-between group ${selectedCat.toUpperCase() === c.toUpperCase() ? 'bg-gray-900 text-white shadow-xl translate-x-1' : 'bg-white border border-gray-100 text-gray-800 hover:border-sm-blue hover:text-sm-blue hover:bg-blue-50/30'}`}
                        >
                           {c}
                           <ChevronDown size={14} className={`transition-transform ${selectedCat.toUpperCase() === c.toUpperCase() ? 'rotate-180' : 'opacity-20'}`} />
                        </button>
                     ))}
                  </div>
               </div>
           </div>

           {/* MAIN CONTENT GALLERY */}
           <div className="flex-1 min-w-0">

              
              <div id="product-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start scroll-mt-[200px]">
                 {filteredItems.map((work, i) => (
                    <React.Fragment key={i}>
                       <CatalogueCard 
                         key={i}
                         work={work} 
                         onClick={() => {
                            if (work.ctaLink && (work.ctaLink.startsWith('http') || work.ctaLink.startsWith('www'))) {
                              window.open(work.ctaLink, '_blank');
                            } else {
                              navigate(`/product/${work.slug}`);
                            }
                         }} 
                         themeColor="bg-sm-blue"
                         ringColor="ring-blue-500"
                         textColor="text-blue-400"
                       />

                     </React.Fragment>
                 ))}
              </div>


           </div>
        </section>


      </div>
    </main>
  );
};

export default SchoolDesigns;
