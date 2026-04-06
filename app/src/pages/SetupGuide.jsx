import React, { useState } from 'react';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Flag, Phone, MessageSquare, MapPin, Search, ArrowRight, CheckCircle2, Award, Zap, Download } from 'lucide-react';
import SidebarWidget from '../components/SidebarWidget';
import CMSMedia from '../components/ui/CMSMedia';

const SetupGuide = () => {
  const { blocks, loading } = useCMSPage('setup-guide');

  const heroBlock = blocks?.inner_page_hero || {};
  const sidebarResources = blocks?.sidebar_resources || {};
  const sidebarTrending = blocks?.sidebar_trending || {};
  
  const benefits = blocks?.benefits?.items || [
    { title: 'NEA Compliance', icon: 'CheckCircle2', description: 'Ensuring your new school meets all National Education Authorities standards.' },
    { title: 'Project Management', icon: 'Zap', description: 'End-to-end guidance from land identification to teacher training.' },
    { title: 'Cost Optimization', icon: 'Award', description: 'Institutional procurement expertise helping you save 25% on initial setup.' },
    { title: 'Brand Strategy', icon: 'Flag', description: 'Crafting a unique institutional identity for parent attraction.' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading Consultation Hub...</div>;

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <SidebarWidget title="TRENDING" items={sidebarTrending?.items} type="trending" />
              <SidebarWidget title="RESOURCES" items={sidebarResources?.items} type="resources" />

              <div className="bg-white p-8 rounded-[25px] border border-gray-100 shadow-sm overflow-hidden relative">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Expert Access</div>
                <div className="space-y-4">
                  <button className="w-full py-4 bg-emerald-500 text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                     <MessageSquare size={16} /> WhatsApp Us
                  </button>
                  <button className="w-full py-4 bg-sm-blue text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-sm-blue/90 transition-all shadow-lg shadow-blue-500/20">
                     <Phone size={16} /> Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow min-w-0">
            {/* CONSULTATION HERO */}
            <div className="bg-white rounded-[30px] p-12 lg:p-16 mb-8 border border-gray-100 shadow-sm relative overflow-hidden group">
               {/* Background Accents */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-sm-blue/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none group-hover:bg-sm-blue/10 transition-all duration-1000" />
               
               <div className="relative z-10 max-w-2xl">
                 <div className="px-4 py-1 bg-sm-blue text-white font-black rounded-full text-[9px] uppercase tracking-[0.2em] mb-8 w-fit scale-90">
                    Institutional Advisory Hub
                 </div>
                 <h1 className="text-4xl lg:text-7xl font-black font-heading leading-tight mb-8 tracking-tighter text-gray-900 uppercase" dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || 'Setting Up <br/> <span className="text-sm-blue italic font-serif lowercase tracking-normal">a</span> <br/> School in India.' }} />
                 <p className="text-gray-400 text-[12px] font-bold uppercase tracking-widest leading-loose mb-10 max-w-lg">
                   {heroBlock.subtitle || "From spatial planning to high-density procurement, we provide end-to-end expertise in guiding you through each phase of institutional growth."}
                 </p>
                 
                 <div className="flex flex-col sm:flex-row gap-5 mb-12">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase text-gray-900 tracking-widest">Connect Directly</span>
                      <div className="text-[14px] font-black text-gray-900 uppercase italic">+91 99661 09191</div>
                   </div>
                   <div className="h-full w-[1px] bg-gray-100 hidden sm:block mx-4" />
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase text-gray-900 tracking-widest">Email Our Team</span>
                      <div className="text-[14px] font-black text-gray-900 uppercase italic">vision@schoolmart.in</div>
                   </div>
                 </div>

                 <div className="flex flex-wrap gap-4">
                   <button className="px-10 py-5 bg-gray-900 text-white font-black rounded-full text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-sm-blue transition-all shadow-2xl">
                      Request Blueprint Hub <ArrowRight size={16} />
                   </button>
                   <button className="px-10 py-5 bg-white border border-gray-100 text-gray-900 font-black rounded-full text-[10px] uppercase tracking-widest flex items-center gap-3 hover:border-sm-blue transition-all">
                      Download Readiness Checklist <Download size={16} />
                   </button>
                 </div>
               </div>
            </div>

            {/* BENEFIT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
               {benefits.map((b, i) => (
                  <div key={i} className="bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm flex items-start gap-5 hover:bg-gray-50 transition-colors group">
                     {/* Icon can be dynamic if ICONS map added */}
                     <div className="w-14 h-14 rounded-2xl bg-sm-blue/5 flex items-center justify-center text-sm-blue group-hover:bg-sm-blue group-hover:text-white transition-all">
                        <CheckCircle2 size={24} />
                     </div>
                     <div className="flex-grow">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900 mb-2">{b.title}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-relaxed">{b.description}</p>
                     </div>
                  </div>
               ))}
            </div>

            {/* TRUST INDICATORS */}
            <div className="bg-white rounded-[30px] p-12 border border-gray-100 shadow-sm text-center">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-10">4000+ PARTNER SCHOOLS TRUST OUR ADVISORY</h4>
               <div className="flex flex-wrap justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all hover:opacity-100">
                  {/* Partner Logos Placeholder */}
                  {['AVN Vida', 'DRS International', 'Delhi Public School', 'Podar Int.', 'VIBGYOR'].map((p, idx) => (
                     <div key={idx} className="text-xl font-black uppercase italic text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-gray-900 flex items-center justify-center text-white text-[10px] font-bold non-italic">{p[0]}</div>
                        {p}
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SetupGuide;
