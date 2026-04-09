import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MessageCircle, Phone, ArrowRight, ShieldCheck, Zap, Layers, Globe } from 'lucide-react';
import { useCMSPage } from '../hooks/useCMSBlock';

const DEFAULT_DATA = {
  title: "Dining Hall Architecture & Execution",
  badge: "Case Study 2025",
  mainImg: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&q=80",
  description: "Designing a high-performance educational dining environment requires more than just furniture. It involves sensory optimization, hygiene engineering, and layout ergonomics.",
  specs: [
    { t: "Ergonomic Seating", d: "P.3 Grade materials for extreme durability in high-traffic zones." },
    { t: "Hygiene Engineering", d: "Anti-microbial surface treatments and composite flooring solutions." },
    { t: "Acoustic Dampening", d: "CFD modeled air-flow and sound integration for noise control." }
  ],
  technicalDetails: [
    "Stainless Steel 304 Grade corrosion-resistant structures.",
    "Composite ceiling panels for optimal thermal insulation.",
    "Granite work surfaces for peak heat and fire resistance.",
    "Moisture-proof HPL treatments for heavy-use durability."
  ]
};

const EnvironmentPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  // Load data from the environments listing page CMS
  const { blocks, loading } = useCMSPage('environments');
  const d = blocks?.environments_page_content || {};
  const items = d.masonryItems || [];

  // Find the matching item by slug
  const matchedItem = items.find(m =>
    m.t && m.t.toLowerCase().replace(/\s+/g, '-') === slug
  );

  const postData = {
    title: matchedItem?.t || DEFAULT_DATA.title,
    badge: matchedItem?.badge || DEFAULT_DATA.badge,
    mainImg: matchedItem?.img || DEFAULT_DATA.mainImg,
    description: matchedItem?.description || DEFAULT_DATA.description,
    specs: matchedItem?.specs?.length ? matchedItem.specs : DEFAULT_DATA.specs,
    technicalDetails: matchedItem?.technicalDetails?.length ? matchedItem.technicalDetails : DEFAULT_DATA.technicalDetails,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hub Audit Request:', formData);
    setSubmitted(true);
    setTimeout(() => {
       setSubmitted(false);
       setFormData({ name: '', email: '', phone: '' });
       alert('Success: Your Institutional Hub Audit request has been received. Our architectural panel will contact you shortly.');
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#004a8e] font-black tracking-widest uppercase py-20">Loading...</div>;

  return (
    <main className="min-h-screen bg-white pb-6 font-body">
      {/* HEADER (ULTRA COMPACT) */}
      <div className="bg-gray-50 border-b border-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between">
           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#004a8e] hover:bg-white px-3 py-1.5 rounded-full transition-all">
              <ArrowLeft size={14} /> Back
           </button>
           <div className="flex items-center gap-4">
              <span className="text-[8px] font-black text-gray-300 tracking-[0.2em] uppercase hidden sm:block">Institutional Infrastructure</span>
              <Globe size={12} className="text-gray-300" />
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* LEFT: MAIN CONTENT */}
           <div className="lg:col-span-8">
              <div className="rounded-[25px] lg:rounded-[35px] overflow-hidden mb-4 shadow-sm border border-gray-100 h-[300px] lg:h-[400px]">
                 <img src={postData.mainImg} alt="Hero" className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-6">
                 <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-[#004a8e] font-black rounded-full text-[8px] uppercase tracking-[0.2em] mb-3 border border-blue-100">
                       {postData.badge}
                    </span>
                    <h1 className="text-3xl lg:text-5xl font-black font-heading leading-[0.9] tracking-tighter uppercase mb-4 text-gray-900">
                       {postData.title}
                    </h1>
                    <p className="text-sm lg:text-base text-gray-400 font-bold uppercase tracking-tight leading-relaxed max-w-2xl">
                       {postData.description}
                    </p>
                 </div>

                 {/* TECHNICAL GRID */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {postData.specs.map((spec, i) => (
                       <div key={i} className="bg-gray-50 p-6 rounded-[25px] border border-gray-100 group hover:border-[#004a8e] transition-colors">
                          <h3 className="text-base lg:text-lg font-black font-heading text-gray-900 uppercase tracking-tight mb-1 group-hover:text-[#004a8e] transition-colors">{spec.t}</h3>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-relaxed">
                             {spec.d}
                          </p>
                       </div>
                    ))}
                 </div>

                 {/* TECHNICAL BULLETS */}
                 <div className="bg-[#004a8e] rounded-[25px] lg:rounded-[35px] p-6 lg:p-10 text-white relative overflow-hidden">
                    <h2 className="text-xl lg:text-2xl font-black font-heading uppercase tracking-tighter mb-6 relative z-10 italic">Technical Specifications</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                       {postData.technicalDetails.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3">
                             <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                             <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-widest leading-loose opacity-80">{detail}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* RIGHT: LEAD FORM PANEL */}
           <div className="lg:col-span-4 lg:sticky lg:top-4 h-fit">
              <div className="bg-white border border-gray-100 rounded-[25px] p-8 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#004a8e]" />
                 <h3 className="text-lg lg:text-xl font-black font-heading text-gray-900 uppercase tracking-tighter mb-2">Interested?</h3>
                 <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-6 leading-loose">
                    FOR CUSTOM HUB AUDITS, CONNECT WITH OUR EXPERTS.
                 </p>
                 
                 <form className="space-y-2" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                       <label className="text-[8px] font-black text-[#004a8e] uppercase tracking-widest px-1">Full Name</label>
                       <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Institution Head" className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-[10px] font-bold uppercase tracking-widest focus:bg-white focus:border-[#004a8e] transition-all outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[8px] font-black text-[#004a8e] uppercase tracking-widest px-1">Email</label>
                       <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="principal@school.com" className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-[10px] font-bold uppercase tracking-widest focus:bg-white focus:border-[#004a8e] transition-all outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[8px] font-black text-[#004a8e] uppercase tracking-widest px-1">Phone</label>
                       <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-[10px] font-bold uppercase tracking-widest focus:bg-white focus:border-[#004a8e] transition-all outline-none" />
                    </div>
                    
                    <button type="submit" className="w-full py-4 bg-[#004a8e] text-white font-black rounded-lg uppercase tracking-[0.1em] text-[9px] shadow-lg hover:bg-gray-900 transition-all mt-4 flex items-center justify-center gap-2">
                       {submitted ? 'Sending...' : 'Request Hub Audit'} <ArrowRight size={14} />
                    </button>
                 </form>
                 
                 <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest text-center mb-2">Immediate Consultation</p>
                    <div className="grid grid-cols-2 gap-2">
                       <a href="https://wa.me/919966109191" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 text-[#25D366] rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-[#25D366] hover:text-white transition-all text-center leading-none px-1">
                          <MessageCircle size={12} /> WhatsApp
                       </a>
                       <a href="tel:+919966109191" className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-[#004a8e] rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-[#004a8e] hover:text-white transition-all text-center leading-none px-1">
                          <Phone size={12} /> Call Expert
                       </a>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10">
         <div className="bg-gray-50 rounded-[40px] p-10 lg:p-12 text-center border border-gray-100 relative overflow-hidden">
            <h2 className="text-3xl lg:text-5xl font-black font-heading text-gray-900 leading-none tracking-tighter uppercase mb-4">
               Ready To Transform?
            </h2>
            <p className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest max-w-xl mx-auto leading-loose mb-6">
               BUILDING ENVIRONMENTS THAT STIMULATE LEARNING AND PROTECT WELLBEING.
            </p>
            <button 
              onClick={() => navigate('/registration')}
              className="px-10 py-4 bg-[#004a8e] text-white font-black rounded-full uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all text-[9px]"
            >
               Join Network
            </button>
         </div>
      </div>

    </main>
  );
};

export default EnvironmentPost;
