// src/pages/Registration.jsx
import { Link } from 'react-router-dom';
import { Send, UserPlus, Sparkles, ShieldCheck, Mail, Phone, Lock, Building2, Globe, ArrowRight } from 'lucide-react';

const Registration = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20 overflow-hidden relative">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[120px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-100/20 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-20">
         
         {/* UNIQUE STORY SIDEBAR (Screenshot 2 Inspired but for Auth) */}
         <div className="flex-1 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-sm-blue font-black rounded-full mb-8 text-[11px] uppercase tracking-widest shadow-sm border border-blue-100">
               <UserPlus size={16} className="inline mr-2" /> Global Network
            </span>
            <h1 className="text-5xl md:text-[8vw] font-black text-gray-900 font-heading leading-[0.85] tracking-tighter mb-10 uppercase">
               Join <br/> The <span className="text-sm-blue italic font-serif opacity-80">Circle.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg mb-12 font-medium">
               Get exclusive access to architectural blueprints, customized institutional catalogs, and early-bird campus planning consultancy.
            </p>

            <div className="grid grid-cols-2 gap-8 text-left">
               <div className="group border-l-4 border-gray-100 pl-6 py-2 hover:border-sm-blue transition-all">
                  <h4 className="text-xl font-black text-gray-900 mb-1 leading-none uppercase">Pre-Approved</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing for Schools</p>
               </div>
               <div className="group border-l-4 border-gray-100 pl-6 py-2 hover:border-sm-blue transition-all">
                  <h4 className="text-xl font-black text-gray-900 mb-1 leading-none uppercase">Priority</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Architect Meetings</p>
               </div>
            </div>
         </div>

         {/* HIGHLIGHT REGISTRATION BOX (Screenshot 4 / Quote Form Style Inspired) */}
         <div className="w-full lg:w-[500px] relative mt-16 lg:mt-0">
            <div className="absolute inset-0 bg-blue-600 rounded-[60px] blur-[80px] opacity-10 animate-pulse" />
            <div className="bg-white rounded-[60px] p-10 lg:p-12 shadow-3xl relative border border-gray-100 overflow-hidden transform group hover:-rotate-1 transition-transform">
               <div className="absolute top-0 left-0 right-0 h-4 bg-gray-900" />
               <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-sm-blue text-white rounded-[25px] flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                     <Lock size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 font-heading tracking-tight mb-2 uppercase tracking-widest leading-none">REGISTRATION</h2>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Start Your Institutional Journey</p>
               </div>
               
               <form className="space-y-6">
                  <div className="relative group">
                     <input type="text" placeholder="Full Name" className="w-full bg-gray-50 px-6 py-4 rounded-3xl border border-gray-50 focus:border-sm-blue focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium text-sm" />
                  </div>
                  <div className="relative group">
                     <input type="email" placeholder="Institutional Email" className="w-full bg-gray-50 px-6 py-4 rounded-3xl border border-gray-50 focus:border-sm-blue focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium text-sm" />
                     <Mail size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-sm-blue transition-colors" />
                  </div>
                  <div className="relative group">
                     <input type="text" placeholder="Institution Name" className="w-full bg-gray-50 px-6 py-4 rounded-3xl border border-gray-50 focus:border-sm-blue focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium text-sm" />
                     <Building2 size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-sm-blue transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="City" className="w-full bg-gray-50 px-6 py-4 rounded-3xl border border-gray-50 focus:border-sm-blue focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium text-sm" />
                     <input type="tel" placeholder="Phone Number" className="w-full bg-gray-50 px-6 py-4 rounded-3xl border border-gray-50 focus:border-sm-blue focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium text-sm" />
                  </div>
                  
                  <div className="flex items-center gap-3 px-6 py-2">
                     <input type="checkbox" id="terms" className="w-4 h-4 rounded-full accent-sm-blue" />
                     <label htmlFor="terms" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors cursor-pointer">I Accept Institutional Terms.</label>
                  </div>

                  <button className="w-full py-5 bg-gray-900 text-white font-black rounded-3xl shadow-3xl hover:shadow-blue-100 hover:bg-sm-blue transition-all uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 active:scale-[0.98]">
                     Create Account <Send size={18} />
                  </button>
                  
                  <div className="text-center mt-8">
                     <Link to="/my-account" className="text-[10px] font-black text-gray-400 hover:text-sm-blue uppercase tracking-widest border-b border-transparent hover:border-sm-blue transition-all">Already a member? Sign In</Link>
                  </div>
               </form>
            </div>
         </div>

      </div>

      {/* DASHBOARD-STYLE PREVIEW BENTO (Unique for Registration) */}
      <div className="max-w-7xl mx-auto px-4 mt-40">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
           {[
             { i: <ShieldCheck size={32} />, t: 'Data Privacy', d: 'Your institutional data is protected by bank-level encryption.', c: 'bg-white text-gray-900' },
             { i: <Globe size={32} />, t: 'Network Access', d: 'Discover the list of our 1500+ institutional members.', c: 'bg-white text-gray-900' },
             { i: <Sparkles size={32} />, t: 'Exclusive Docs', d: 'Download 200+ case studies and architectural PDFs.', c: 'bg-white text-gray-900' },
             { i: <ArrowRight size={32} />, t: 'Direct Entry', d: 'Fast-track your first order with simplified workflow.', c: 'bg-white text-gray-900' },
           ].map((card, i) => (
             <div key={i} className={`p-8 rounded-[45px] shadow-sm border border-gray-100 group hover:shadow-3xl transition-all hover:-translate-y-4 cursor-pointer flex flex-col items-center text-center ${card.c}`}>
                <div className={`w-20 h-20 bg-gray-50 group-hover:bg-sm-blue group-hover:text-white rounded-[30px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                   {card.i}
                </div>
                <h3 className="text-lg font-black font-heading mb-2 leading-tight uppercase tracking-tight">{card.t}</h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">{card.d}</p>
             </div>
           ))}
        </div>
      </div>
    </main>
  );
};

export default Registration;
