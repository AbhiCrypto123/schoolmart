import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Sparkles, MessageSquare, ArrowRight, Zap, Shield, Globe, Award } from 'lucide-react';
import SidebarWidget from '../components/SidebarWidget';
import CMSMedia from '../components/ui/CMSMedia';

const GenericInnerPage = () => {
  const { slug } = useParams();
  const { blocks, loading } = useCMSPage(slug);

  const heroBlock = blocks?.inner_page_hero || {};
  const sidebarResources = blocks?.sidebar_resources || {};
  const sidebarTrending = blocks?.sidebar_trending || {};
  const textContent = blocks?.text_content || { title: '', body: '' };

  const pageTitle = slug.replace(/-/g, ' ').toUpperCase();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="space-y-4 text-center">
         <div className="w-12 h-12 border-4 border-sm-blue border-t-transparent rounded-full animate-spin mx-auto" />
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Synchronizing {slug}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Enhanced Sticky Sidebar */}
          <aside className="lg:w-[300px] flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <SidebarWidget title="TRENDING" items={sidebarTrending?.items} type="trending" />
              <SidebarWidget title="RESOURCES" items={sidebarResources?.items} type="resources" />
              
              <div className="bg-gray-900 p-10 rounded-[35px] text-white overflow-hidden relative group shadow-2xl">
                 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Zap size={32} className="text-sm-blue fill-sm-blue" />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-sm-blue mb-6">Expert Briefing</h4>
                 <p className="text-lg font-black uppercase tracking-tighter leading-tight mb-8">Get a professional consultation regarding {pageTitle}.</p>
                 <button className="w-full py-4 bg-sm-blue text-white text-[9px] font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-3 shadow-lg">
                    <MessageSquare size={16} /> Direct Connect
                 </button>
              </div>
            </div>
          </aside>

          {/* Institutional Content Stream */}
          <div className="flex-grow min-w-0">
            {/* Template Hero - Premium Bento Style */}
            <div className="bg-gray-50 rounded-[45px] p-12 lg:p-20 mb-12 border border-gray-100 shadow-sm relative overflow-hidden group min-h-[450px] flex flex-col justify-center">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-l-[100px] blur-[120px] pointer-events-none" />
               <CMSMedia 
                 mediaType={heroBlock.mediaType} 
                 mediaUrl={heroBlock.mediaUrl} 
                 fallbackImg={heroBlock.img} 
                 className="absolute inset-0 w-full h-full object-cover opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-1000 grayscale"
               />
               
               <div className="relative z-10">
                  <div className="px-5 py-2 bg-white border border-gray-100 text-sm-blue font-black rounded-full text-[9px] uppercase tracking-[0.3em] mb-10 w-fit shadow-sm">
                     <Award size={14} className="inline mr-2" /> Institutional Insight
                  </div>
                  <h1 className="text-5xl lg:text-8xl font-black font-heading leading-none mb-10 tracking-tighter text-gray-900 uppercase" 
                      dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || heroBlock.title || textContent.title || pageTitle }} />
                  <p className="text-gray-400 text-[13px] font-bold uppercase tracking-widest max-w-xl leading-relaxed">
                     {heroBlock.subtitle || `Accelerating ${pageTitle.toLowerCase()} strategies through modern infrastructure and expert consultation models.`}
                  </p>
                  
                  <div className="flex gap-4 mt-12">
                     <button className="px-10 py-5 bg-gray-900 text-white font-black rounded-full text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-sm-blue transition-all shadow-2xl active:scale-95">
                        Reserve Consultation <ArrowRight size={18} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Content Body with fallback layout blocks */}
            <div className="space-y-16">
               {textContent.body ? (
                  <div className="prose prose-slate prose-lg max-w-none px-6">
                     <div className="text-gray-600 leading-relaxed font-medium space-y-8" dangerouslySetInnerHTML={{ __html: textContent.body }} />
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                     {[
                        { title: 'Strategic Planning', desc: 'Custom roadmaps for long-term growth and success.', icon: Globe },
                        { title: 'Resource Audit', desc: 'Deep-dive analysis of your current institutional assets.', icon: Shield },
                        { title: 'Implementation', desc: 'Seamless execution models for rapid deployment.', icon: Zap }
                     ].map((item, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-100 p-10 rounded-[35px] group hover:border-sm-blue transition-all">
                           <item.icon size={28} className="text-sm-blue mb-6 group-hover:scale-110 transition-transform" />
                           <h3 className="text-lg font-black uppercase tracking-tighter mb-4 text-gray-900">{item.title}</h3>
                           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{item.desc}</p>
                        </div>
                     ))}
                  </div>
               )}

               {/* Standardized Bottom Panel */}
               <div className="bg-sm-blue rounded-[45px] p-16 text-white text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 relative z-10">Start your Journey in {pageTitle}.</h2>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-12 max-w-md mx-auto relative z-10 leading-loose">
                     Our domain experts are ready to provide a detailed briefing and implementation strategy tailored to your school's unique ecosystem.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                     <button className="px-12 py-5 bg-white text-sm-blue font-black rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Contact Experts</button>
                     <Link to="/contact-us" className="px-12 py-5 bg-gray-900/20 backdrop-blur-xl border border-white/20 text-white font-black rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center">Visit Office</Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GenericInnerPage;
