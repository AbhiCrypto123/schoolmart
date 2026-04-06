import React, { useState } from 'react';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Calendar, Users, MapPin, ArrowRight, Play, Download, Clock, Star } from 'lucide-react';
import SidebarWidget from '../components/SidebarWidget';
import CMSMedia from '../components/ui/CMSMedia';

const Workshops = () => {
  const { blocks, loading } = useCMSPage('workshops');
  const [activeTab, setActiveTab] = useState('upcoming');

  const heroBlock = blocks?.inner_page_hero || {};
  const sidebarResources = blocks?.sidebar_resources || {};
  const sidebarTrending = blocks?.sidebar_trending || {};
  
  const upcomingEvents = blocks?.upcoming_events?.items || [
    { title: 'Digital Pedagogy Summit 2025', date: '15 May 2025', location: 'Hyderabad, TS', speakers: ['Dr. Sharma', 'R. Mehra'], type: 'Workshop', status: 'Upcoming' },
    { title: 'Campus Design Masterclass', date: '22 May 2025', location: 'Online / Zoom', speakers: ['Ar. Vikram', 'L. Bajaj'], type: 'Webinar', status: 'Open' },
    { title: 'NEP 2020 Infrastructure Sync', date: '05 June 2025', location: 'Pune, MH', speakers: ['Adv. Gupta', 'Dr. Jain'], type: 'Seminar', status: 'Book Now' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading Events Hub...</div>;

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-[300px] flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Star className="text-sm-blue" size={24} />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Past Success</h4>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4 text-xs font-black uppercase">
                       <div className="text-sm-blue">400+</div> Events Held
                    </div>
                    <div className="flex items-center gap-4 text-xs font-black uppercase">
                       <div className="text-sm-blue">12K+</div> Educators Trained
                    </div>
                 </div>
              </div>

              <SidebarWidget title="TRENDING" items={sidebarTrending?.items} type="trending" />
              <SidebarWidget title="RESOURCES" items={sidebarResources?.items} type="resources" />

              <button className="w-full py-5 bg-gray-900 text-white font-black rounded-full text-[10px] uppercase tracking-widest hover:bg-sm-blue transition-all flex items-center justify-center gap-3 shadow-xl">
                 <Play size={16} /> View Recorded Hub
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow min-w-0">
            {/* EVENT HERO */}
            <div className="bg-white rounded-[40px] p-12 lg:p-16 mb-8 border border-gray-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none group-hover:bg-sm-blue/10 transition-all duration-1000" />
               
               <div className="relative z-10">
                 <div className="px-4 py-1.5 bg-sm-blue text-white font-black rounded-full text-[9px] uppercase tracking-[0.2em] mb-8 w-fit shadow-xl shadow-blue-500/20">
                    Institutional Knowledge Hub
                 </div>
                 <h1 className="text-4xl lg:text-7xl font-black font-heading leading-tight mb-8 tracking-tighter text-gray-900 uppercase" dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || 'Empowering <br/> <span className="text-sm-blue italic font-serif lowercase tracking-normal">the</span> <br/> Educators.' }} />
                 <p className="text-gray-400 text-[12px] font-bold uppercase tracking-widest leading-loose mb-10 max-w-xl">
                   {heroBlock.subtitle || "Expert sessions and masterclasses designed to keep school founders, principals, and educators ahead of the curve."}
                 </p>
                 
                 <div className="flex gap-4">
                   <button className="px-10 py-5 bg-gray-900 text-white font-black rounded-full text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-sm-blue transition-all shadow-2xl">
                      Book Upcoming <ArrowRight size={16} />
                   </button>
                   <button className="px-10 py-5 bg-white border border-gray-100 text-gray-900 font-black rounded-full text-[10px] uppercase tracking-widest flex items-center gap-3 hover:border-sm-blue transition-all">
                      Download Event Hub <Download size={16} />
                   </button>
                 </div>
               </div>
            </div>

            {/* EVENT LISTING */}
            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
               <div className="flex items-center justify-between mb-10 px-4">
                  <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900">Academic Calendar <span className="text-sm-blue italic font-serif lowercase tracking-normal text-lg ml-2">2025</span></h2>
                  <div className="flex bg-gray-50 rounded-full p-1 border border-gray-100">
                     <button onClick={() => setActiveTab('upcoming')} className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'upcoming' ? 'bg-sm-blue text-white shadow-lg shadow-blue-500/20' : 'text-gray-400'}`}>Upcoming</button>
                     <button onClick={() => setActiveTab('past')} className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'past' ? 'bg-sm-blue text-white shadow-lg shadow-blue-500/20' : 'text-gray-400'}`}>Recorded Hub</button>
                  </div>
               </div>

               <div className="space-y-4">
                  {upcomingEvents.map((event, i) => (
                     <div key={i} className="group bg-gray-50/30 border border-gray-100 rounded-[30px] p-8 flex flex-col md:flex-row items-center gap-10 hover:bg-white hover:border-sm-blue hover:shadow-xl transition-all cursor-pointer">
                        <div className="flex flex-col items-center bg-white border border-gray-100 rounded-2xl p-6 group-hover:bg-sm-blue group-hover:text-white transition-all shadow-sm">
                           <Calendar size={24} className="mb-2" />
                           <span className="text-[14px] font-black leading-none">{event.date.split(' ')[0]}</span>
                           <span className="text-[8px] font-black uppercase tracking-widest mt-1 opacity-60 text-center">{event.date.split(' ').slice(1).join(' ')}</span>
                        </div>
                        
                        <div className="flex-grow">
                           <div className="flex items-center gap-3 mb-2">
                              <span className="text-[8px] font-black uppercase bg-white px-2 py-1 border border-gray-100 rounded-full text-gray-400 group-hover:border-sm-blue/20 group-hover:text-sm-blue transition-colors">{event.type}</span>
                              <div className="h-4 w-[1px] bg-gray-200" />
                              <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                 <MapPin size={12} className="text-sm-blue" /> {event.location}
                              </div>
                           </div>
                           <h3 className="text-xl font-black text-gray-900 group-hover:text-sm-blue transition-colors uppercase tracking-tighter leading-tight mb-4">
                              {event.title}
                           </h3>
                           <div className="flex -space-x-2">
                              {event.speakers.map((s, idx) => (
                                 <div key={idx} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] font-black uppercase group-hover:border-sm-blue transition-colors text-gray-900 bg-white">
                                    {s[0]}
                                 </div>
                              ))}
                              <div className="pl-4 flex items-center text-[9px] font-black text-gray-400 uppercase tracking-widest italic pt-2">
                                 + Verified Knowledge Hub
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-col gap-4 text-center">
                           <button className="px-8 py-3 bg-gray-900 text-white font-black rounded-full text-[9px] uppercase tracking-widest hover:bg-sm-blue transition-all shadow-xl group-hover:shadow-blue-500/20 active:scale-95">
                              {event.status}
                           </button>
                           <span className="text-[10px] font-black uppercase text-gray-400 flex items-center justify-center gap-1">
                              <Clock size={12} /> 10 AM - 4 PM
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* MINI TESTIMONY */}
            <div className="mt-12 bg-gray-50 border border-gray-100 rounded-[40px] p-12 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                  <Star className="text-sm-blue fill-sm-blue" size={24} />
               </div>
               <p className="text-2xl font-black text-gray-900 uppercase font-heading tracking-tighter mb-8 max-w-2xl mx-auto italic">"These masterclasses have become an integral part of our principal recruitment and training strategy."</p>
               <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-black uppercase mb-4">LM</div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Dr. Lavanya Murthy</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 italic">AVN Vida International School</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Workshops;
