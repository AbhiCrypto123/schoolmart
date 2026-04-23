import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Phone, Zap } from 'lucide-react';
import { useCMSPage } from '../hooks/useCMSBlock';

const DEFAULT_WORKSHOPS = [
  { date: { day: '18', month: 'Jul' }, title: 'NEP 2020: Developing a Growth Mindset Culture', type: 'Pedagogy Masterclass', location: 'HYD HQ / Virtual', duration: '4 Hours', price: '₹2,499', desc: 'Integrating growth mindset culture within the framework of NEP 2020.', featured: true },
  { date: { day: '05', month: 'Aug' }, title: 'Designing Inspiring Learning Environments', type: 'Infrastructure Workshop', location: 'Mumbai Studio', duration: 'Full Day', price: '₹5,999', desc: 'How physical space impacts learning outcomes and student behavior.' },
  { date: { day: '12', month: 'Sep' }, title: 'EdTech Integration: VR & AI in Classrooms', type: 'Digital Literacy', location: 'Virtual (Global)', duration: '3 Hours', price: '₹999', desc: 'Practical tools and frameworks for seamless AI & VR adoption.' },
  { date: { day: '25', month: 'Oct' }, title: 'Composite Skills Lab: Teacher Training', type: 'Hands-on Lab', location: 'SchoolMart Lab Hub', duration: '2 Days', price: '₹12,499', desc: 'Empowering teachers with practical laboratory management skills.' },
];

const Workshops = () => {
  const { blocks } = useCMSPage('workshops');
  const hero = blocks?.page_hero || {};
  const workshopsCMS = blocks?.workshops_list?.items;
  const workshops = workshopsCMS?.length ? workshopsCMS : DEFAULT_WORKSHOPS;
  const badge = hero.badge || 'Institutional Academy';
  const title = hero.titleHtml || 'Growth <span class="text-sm-blue italic font-serif lowercase tracking-normal">Mindset &amp; Workshops.</span>';
  const subtitle = hero.subtitle || "Join India's most relevant pedagogy masterclasses.";

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-white py-12 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-sm-blue" />
              <span className="text-sm-blue text-[13px] font-black uppercase tracking-[0.3em]">{badge}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="text-gray-500 text-[13px] font-bold uppercase tracking-widest leading-relaxed max-w-xl mb-8">{subtitle}</p>
            <button className="px-8 py-3.5 bg-sm-blue text-white font-black rounded-xl text-[13px] uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-blue-500/10 duration-500 group">
              Register For A Program <ArrowRight size={14} className="inline ml-2 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 text-center w-32 md:w-40">
              <span className="text-2xl font-black text-gray-900 block">{hero.stat1Value || '40+'}</span>
              <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">{hero.stat1Label || 'Runs'}</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 text-center w-32 md:w-40">
              <span className="text-2xl font-black text-sm-blue block">{hero.stat2Value || '4.9'}</span>
              <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">{hero.stat2Label || 'Rating'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((w, i) => (
              <div key={i} className="flex flex-col bg-white p-8 rounded-[35px] border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col flex-shrink-0 items-center justify-center p-3 bg-gray-50 rounded-2xl w-14 h-14 group-hover:bg-sm-blue group-hover:text-white transition-all shadow-sm">
                    <span className="text-xl font-black leading-none">{w.date?.day || ''}</span>
                    <span className="text-[12px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-white/70">{w.date?.month || ''}</span>
                  </div>
                  {w.featured && <span className="bg-amber-50 text-amber-600 text-[12px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-100">Most Popular</span>}
                </div>
                <span className="text-[13px] font-black text-sm-blue uppercase tracking-widest mb-1">{w.type}</span>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 leading-tight min-h-[3rem] line-clamp-2">{w.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed mb-8 flex-grow line-clamp-3">{w.desc}</p>
                <div className="space-y-3 mb-8 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400 text-[13px] font-black uppercase tracking-widest"><MapPin size={14} className="text-sm-blue" /> {w.location}</div>
                  <div className="flex items-center gap-2 text-gray-400 text-[13px] font-black uppercase tracking-widest"><Clock size={14} className="text-sm-blue" /> {w.duration}</div>
                  <div className="flex items-center gap-2 text-gray-900 text-[13px] font-black uppercase tracking-widest">FEE: <span className="text-sm-blue">{w.price}</span></div>
                </div>
                <button className="w-full py-4 bg-gray-50 text-gray-900 font-black rounded-2xl text-[13px] uppercase tracking-widest group-hover:bg-sm-blue group-hover:text-white transition-all">Reserve My Spot</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto rounded-[40px] bg-sm-blue p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
                {hero.ctaTitle || 'Want us to Host at your'} <br /><span className="italic font-serif tracking-normal text-gray-950">{hero.ctaSubtitle || 'Campus?'}</span>
              </h3>
              <p className="text-white/70 text-[13px] font-black uppercase tracking-widest leading-loose">{hero.ctaDesc || 'Customized faculty training programs delivered at your doorstep.'}</p>
            </div>
            <a href="tel:+919966109191" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sm-blue font-black rounded-xl text-[13px] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all shadow-xl whitespace-nowrap">
              Enquire Now <Phone size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Workshops;
