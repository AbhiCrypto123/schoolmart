import React from 'react';
import { useParams } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Sparkles, MessageSquare, Phone, ArrowLeft } from 'lucide-react';
import SidebarWidget from '../components/SidebarWidget';
import CMSMedia from '../components/ui/CMSMedia';

const GenericInnerPage = () => {
  const { slug } = useParams();
  const { blocks, loading } = useCMSPage(slug);

  const heroBlock = blocks?.inner_page_hero || {};
  const sidebarResources = blocks?.sidebar_resources || {};
  const sidebarTrending = blocks?.sidebar_trending || {};
  const textContent = blocks?.text_content || { title: '', body: '' };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading {slug}...</div>;

  return (
    <main className="min-h-screen bg-white pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Area */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <SidebarWidget title="TRENDING" items={sidebarTrending?.items} type="trending" />
              <SidebarWidget title="RESOURCES" items={sidebarResources?.items} type="resources" />
              
              <div className="bg-emerald-500 p-8 rounded-[25px] text-white overflow-hidden relative group shadow-xl shadow-emerald-500/20">
                <div className="relative z-10">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-4">Immediate Assistance</h4>
                   <p className="text-[14px] font-black uppercase tracking-tighter leading-tight mb-6">Expert guidance for this domain.</p>
                   <button className="w-full py-3 bg-white text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                     <MessageSquare size={14} /> WhatsApp Expert
                   </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Dynamic Content Area */}
          <div className="flex-grow min-w-0">
            {/* Template Hero */}
            <div className="bg-gray-50 rounded-[30px] p-12 lg:p-20 flex flex-col items-start border border-gray-100 shadow-sm relative overflow-hidden group min-h-[400px] justify-center mb-10">
               <CMSMedia 
                 mediaType={heroBlock.mediaType} 
                 mediaUrl={heroBlock.mediaUrl} 
                 fallbackImg={heroBlock.img} 
                 className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-all duration-1000"
               />
               <div className="px-5 py-1.5 bg-sm-blue text-white font-black rounded-full text-[10px] uppercase tracking-[0.2em] mb-8 w-fit relative z-10">
                  <Sparkles size={14} className="inline mr-2" /> {slug.replace(/-/g, ' ').toUpperCase()}
               </div>
               <h1 className="text-4xl lg:text-7xl font-black font-heading leading-tight mb-8 tracking-tighter text-gray-900 uppercase relative z-10" 
                   dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || heroBlock.title || textContent.title || slug.replace(/-/g, ' ').toUpperCase() }} />
               <p className="text-gray-400 text-[12px] font-bold uppercase tracking-widest max-w-lg leading-loose relative z-10">
                  {heroBlock.subtitle || "Exploring the frontiers of institutional excellence and strategic infrastructure."}
               </p>
            </div>

            {/* Template Content Body */}
            <div className="prose prose-slate max-w-none px-4">
               {textContent.body ? (
                  <div className="text-gray-600 text-lg leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: textContent.body }} />
               ) : (
                  <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[30px]">
                     <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-[10px]">Content awaiting synchronization from CMS</p>
                  </div>
               )}
            </div>

            {/* Template Contact Block */}
            <div className="mt-20 bg-gray-900 rounded-[30px] p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-10">
               <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Detailed Consultation</h2>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Connect with our domain leads for a personalized brief.</p>
               </div>
               <div className="flex gap-4">
                  <button className="px-8 py-4 bg-sm-blue text-white font-black rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Submit Brief</button>
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all">Schedule Call</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GenericInnerPage;
