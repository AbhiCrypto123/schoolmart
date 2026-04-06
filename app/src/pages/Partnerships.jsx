import React, { useState } from 'react';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Award, Briefcase, BarChart3, Users, Clock, Globe, ArrowRight, ShieldCheck, Zap, Download } from 'lucide-react';
import SidebarWidget from '../components/SidebarWidget';
import CMSMedia from '../components/ui/CMSMedia';

const Partnerships = () => {
  const { blocks, loading } = useCMSPage('partnerships');

  const heroBlock = blocks?.inner_page_hero || {};
  const sidebarResources = blocks?.sidebar_resources || {};
  const sidebarTrending = blocks?.sidebar_trending || {};
  
  const categories = blocks?.categories?.items || [
    { title: 'Academic Partnerships', icon: 'Award', color: 'bg-blue-50 text-blue-600', items: ['Curriculum Planning', 'Teacher Training', 'Academic Audits'] },
    { title: 'Operational Partnerships', icon: 'Briefcase', color: 'bg-emerald-50 text-emerald-600', items: ['School Management', 'Admission Support', 'Daily Operations'] },
    { title: 'Financial Partnerships', icon: 'BarChart3', color: 'bg-orange-50 text-orange-600', items: ['Fundraising Support', 'Financial Audits', 'Investment Advisory'] },
    { title: 'Digital Transformation', icon: 'Zap', color: 'bg-purple-50 text-purple-600', items: ['Smart Campus Setup', 'ERP Integration', 'Digital Pedagogy'] },
    { title: 'Sports & Infrastructure', icon: 'Globe', color: 'bg-sky-50 text-sky-600', items: ['Sports Coaching Models', 'Facility Management', 'Hostel Operations'] },
    { title: 'Monitoring & Quality', icon: 'ShieldCheck', color: 'bg-rose-50 text-rose-600', items: ['ISO Certification', 'Quality Assurance', 'Performance Tracking'] },
  ];

  const ICONS = { Award, Briefcase, BarChart3, Users, Zap, Globe, ShieldCheck };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading Partnerships...</div>;

  return (
    <main className="min-h-screen bg-white pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <SidebarWidget title="TRENDING" items={sidebarTrending?.items} type="trending" />
              <SidebarWidget title="RESOURCES" items={sidebarResources?.items} type="resources" />
              
              <div className="bg-gray-900 p-8 rounded-[25px] text-white overflow-hidden relative group">
                <div className="relative z-10">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-sm-blue mb-4">Strategic Fund Raising</h4>
                   <p className="text-[11px] font-bold uppercase tracking-widest leading-loose opacity-60 mb-6">Expert guidance for institutional growth and investor relations.</p>
                   <button className="px-6 py-2 bg-sm-blue text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all">Connect Now</button>
                </div>
                <Users size={80} className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-all opacity-20" />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow min-w-0">
            {/* LARGE HERO BLOCK */}
            <div className="bg-gray-50 rounded-[30px] p-12 lg:p-20 flex flex-col items-center text-center border border-gray-100 shadow-sm relative overflow-hidden group min-h-[450px] justify-center mb-12">
               <CMSMedia 
                 mediaType={heroBlock.mediaType} 
                 mediaUrl={heroBlock.mediaUrl} 
                 fallbackImg={heroBlock.img} 
                 className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-all duration-1000"
               />
               <div className="px-5 py-1.5 bg-sm-blue text-white font-black rounded-full text-[10px] uppercase tracking-[0.2em] mb-8 w-fit shadow-xl shadow-blue-500/20 relative z-10">
                  <Globe size={14} className="inline mr-2" /> Global Alliances
               </div>
               <h1 className="text-4xl lg:text-7xl font-black font-heading leading-tight mb-8 tracking-tighter text-gray-900 uppercase max-w-2xl relative z-10" dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || 'Collaborative <br/> <span className="text-sm-blue italic font-serif lowercase tracking-normal">for</span> <br/> Operational Prowess.' }} />
               <p className="text-gray-400 text-[12px] font-bold uppercase tracking-widest max-w-lg leading-loose relative z-10">
                  {heroBlock.subtitle || "We partner with leading academic networks, investors, and operators to transform institutional potential into excellence."}
               </p>
            </div>

            {/* PARTNERSHIP MODELS GRID */}
            <h2 className="text-[24px] font-black text-gray-900 uppercase tracking-tighter mb-8 px-2 flex items-center gap-4">
               CORE PARTNERSHIP MODELS <div className="h-1 flex-grow bg-gray-100 rounded-full" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, i) => {
                const Icon = ICONS[cat.icon] || Award;
                return (
                  <div key={i} className="bg-white rounded-[30px] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col items-start min-h-[320px]">
                    <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-4 group-hover:text-sm-blue transition-colors">
                      {cat.title}
                    </h3>
                    <ul className="space-y-3">
                      {cat.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-sm-blue" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-auto px-6 py-2 border border-gray-100 group-hover:border-sm-blue text-[9px] font-black uppercase text-gray-400 group-hover:text-sm-blue rounded-full transition-all flex items-center gap-2">
                       Explore Model <ArrowRight size={12} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* FUND RAISING MINI SECTION */}
            <div className="mt-12 bg-gray-900 rounded-[30px] p-12 text-white relative overflow-hidden group">
               <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-10">
                  <div className="flex-1">
                     <div className="text-sm-blue text-[10px] font-black uppercase tracking-[0.3em] mb-4">Strategic Financial Advisory</div>
                     <h2 className="text-4xl font-black font-heading tracking-tighter uppercase leading-none mb-6">Securing the <br/> Future of your <br/> Institution.</h2>
                     <p className="text-white/40 text-[11px] font-black uppercase tracking-widest leading-loose max-w-sm">From identifying potential investors to organizing high-impact fundraising events, our financial advisory team guides you through the complex world of institutional investment.</p>
                  </div>
                  <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                     {['Deal Sourcing', 'Due Diligence', 'Equity Structures', 'Exit Strategies'].map((f, idx) => (
                        <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center group-hover:border-sm-blue transition-all">
                           <Zap size={24} className="text-sm-blue mb-4" />
                           <span className="text-[8px] font-black uppercase tracking-[0.2em]">{f}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Partnerships;
