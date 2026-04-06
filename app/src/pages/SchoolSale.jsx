import React, { useState } from 'react';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Building2, MapPin, ArrowUpRight, Download, FileText, Search, Filter } from 'lucide-react';
import SidebarWidget from '../components/SidebarWidget';
import CMSMedia from '../components/ui/CMSMedia';

const SchoolSale = () => {
  const { blocks, loading } = useCMSPage('school-sale');
  const [searchTerm, setSearchTerm] = useState('');

  const heroBlock = blocks?.inner_page_hero || {};
  const sidebarResources = blocks?.sidebar_resources || {};
  const sidebarTrending = blocks?.sidebar_trending || {};
  
  const listings = blocks?.listings?.items || [
    { title: 'BTS lease in Kukatpally, Hyderabad', location: 'Hyderabad, Telangana', type: 'Lease', size: '2 Acre', price: 'Contact for Price' },
    { title: 'K-12 School for Sale in Pune', location: 'Pune, Maharashtra', type: 'Sale', size: '3.5 Acre', price: '₹ 45 Cr' },
    { title: 'Preschool Franchise Opportunity', location: 'Bangalore, Karnataka', type: 'Franchise', size: '5000 Sq.Ft', price: '₹ 50 Lakh' },
    { title: 'Operational School for Lease', location: 'Chennai, Tamil Nadu', type: 'Lease', size: '1.2 Acre', price: '₹ 8 Lakh/month' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading Opportunities...</div>;

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-6 rounded-[25px] border border-gray-100 shadow-sm">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Search & Filter</h4>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search location..." 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-[11px] font-bold focus:ring-2 focus:ring-sm-blue outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="w-full py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-sm-blue transition-all flex items-center justify-center gap-2">
                  <Filter size={14} /> Apply Filters
                </button>
              </div>

              <SidebarWidget title="TRENDING" items={sidebarTrending?.items} type="trending" />
              <SidebarWidget title="RESOURCES" items={sidebarResources?.items} type="resources" />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow min-w-0">
            {/* HERO */}
            <div className="bg-white rounded-[30px] p-10 lg:p-16 mb-8 border border-gray-100 shadow-sm relative overflow-hidden group">
              <CMSMedia 
                mediaType={heroBlock.mediaType} 
                mediaUrl={heroBlock.mediaUrl} 
                fallbackImg={heroBlock.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-all duration-1000"
              />
              <div className="relative z-10 max-w-2xl text-left">
                <div className="px-3 py-1 bg-sm-blue text-white font-black rounded-full text-[8px] uppercase tracking-[0.2em] mb-6 w-fit">
                  Institutional Real Estate
                </div>
                <h1 className="text-4xl lg:text-6xl font-black font-heading leading-tight mb-6 tracking-tighter text-gray-900 uppercase" dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || 'Schools <br/> <span className="text-sm-blue italic font-serif lowercase tracking-normal">for</span> <br/> Sale & Lease.' }} />
                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest leading-loose">
                  {heroBlock.subtitle || "A curated repository of verified institutional opportunities across India. Connect with us for confidential mandates."}
                </p>
                
                <div className="flex gap-4 mt-8">
                  <button className="px-8 py-4 bg-gray-900 text-white font-black rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-sm-blue transition-all">
                    <Download size={14} /> Download NDA
                  </button>
                  <button className="px-8 py-4 bg-white border border-gray-100 text-gray-900 font-black rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-sm-blue transition-all">
                    <FileText size={14} /> Submit Mandate
                  </button>
                </div>
              </div>
            </div>

            {/* LISTINGS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.filter(l => l.location.toLowerCase().includes(searchTerm.toLowerCase())).map((item, i) => (
                <div key={i} className="bg-white rounded-[30px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="text-sm-blue" size={24} />
                  </div>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-sm-blue">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${item.type === 'Sale' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {item.type}
                      </span>
                      <h3 className="text-lg font-black text-gray-900 mt-1 leading-tight group-hover:text-sm-blue transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-6">
                    <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      <MapPin size={12} className="text-sm-blue" /> {item.location}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-sm-blue" /> {item.size}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-[14px] font-black text-gray-900 uppercase">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA BLOCK */}
            <div className="mt-12 bg-sm-blue rounded-[30px] p-10 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
               <h2 className="text-3xl font-black font-heading mb-4 uppercase tracking-tighter">Looking for a confidential deal?</h2>
               <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em] mb-8">We handle high-ticket institutional mandates with complete privacy.</p>
               <button className="px-10 py-4 bg-white text-sm-blue font-black rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                 Speak with Specialist
               </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SchoolSale;
