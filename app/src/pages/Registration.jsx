import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send, UserPlus, Sparkles, ShieldCheck, Mail, Phone, Lock, Building2, Globe, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { register, verifyOtp, resendOtp } from '../services/api';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    phone: '',
    authorisedPerson: '',
    address: '',
    pincode: '',
    schoolType: '',
    message: '',
    selectedServices: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const services = [
    "School design architecture services green schools",
    "Project management planning to completion",
    "Existing school refurbishmentredesign",
    "kindergarden furniture",
    "High school Furniture",
    "Premium furniture for International schools",
    "Hostel furniture",
    "Tablets with pre loaded content CBSE ICSE State",
    "SmartTech Computer Labs",
    "GPRS for buses student tracking",
    "Auggmented Reality Libraries",
    "AI based School content",
    "Mathematica",
    "Discovery Pod",
    "Mini and Mega Auditoriums",
    "Phygital Libraries",
    "Phygital Science labs",
    "Art Music Enviroments",
    "Animated play Interactive walls",
    "School sports acaedemy",
    "Pools aqua complex",
    "Surface Sports Tennis basketball",
    "Cricket baseball pitches",
    "Artificial turf Synthetic Acrylic surfaces",
    "Playscapes Childhood activity",
    "School funding JV & operations",
    "School buy and sell services"
  ];

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Logic for submission (e.g., mail or CRM)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center px-4">
        <div className="bg-white p-12 rounded-[60px] shadow-3xl text-center max-w-lg w-full border border-gray-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Registration Received</h2>
          <p className="text-gray-500 font-medium mb-8">Your partner school details have been submitted. Our team will contact you shortly.</p>
          <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-sm-blue text-white font-bold rounded-full hover:bg-gray-900 transition-all uppercase text-xs tracking-widest">
            Submit Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-8 lg:pt-16 pb-12 overflow-hidden relative">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[120px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-100/20 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
         
         {/* UNIQUE STORY SIDEBAR */}
         <div className="w-full lg:w-1/4 text-center lg:text-left pt-2 lg:pt-6 lg:sticky lg:top-24">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-sm-blue font-black rounded-full mb-4 lg:mb-6 text-[10px] lg:text-[11px] uppercase tracking-widest shadow-sm border border-blue-100">
               <UserPlus size={14} className="inline mr-2 lg:size-4" /> Partner Network
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 font-heading leading-[0.85] tracking-tighter mb-4 lg:mb-8 uppercase">
               Join <br/> The <span className="text-sm-blue italic font-serif opacity-80">Circle.</span>
            </h1>
            <p className="text-xs lg:text-sm text-gray-500 leading-relaxed mb-6 lg:mb-8 font-medium px-4 lg:px-0">
               Get exclusive access to architectural blueprints, customized institutional catalogs, and early-bird campus planning consultancy.
            </p>

            <div className="hidden lg:grid grid-cols-1 gap-4 text-left">
               <div className="group border-l-4 border-gray-100 pl-6 py-1 hover:border-sm-blue transition-all">
                  <h4 className="text-lg font-black text-gray-900 mb-1 leading-none uppercase">Pre-Approved</h4>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Pricing for Schools</p>
               </div>
               <div className="group border-l-4 border-gray-100 pl-6 py-1 hover:border-sm-blue transition-all">
                  <h4 className="text-lg font-black text-gray-900 mb-1 leading-none uppercase">Priority</h4>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Architect Meetings</p>
               </div>
            </div>
         </div>

         {/* HIGHLIGHT REGISTRATION BOX - EXPANDED */}
         <div className="w-full lg:flex-1 relative mt-4 lg:mt-0">
            <div className="absolute inset-0 bg-blue-600 rounded-[40px] lg:rounded-[60px] blur-[80px] opacity-10 animate-pulse" />
            <div className="bg-white rounded-[40px] lg:rounded-[60px] p-5 md:p-10 shadow-3xl relative border border-gray-100 overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-3 lg:h-4 bg-gray-900" />
               <div className="mb-6 lg:mb-8">
                  <h2 className="text-lg lg:text-xl font-black text-gray-900 font-heading tracking-tight mb-1 uppercase tracking-[0.1em]">
                    Partner school Registration Form.
                  </h2>
                  <p className="text-gray-400 text-[8px] lg:text-[9px] font-bold uppercase tracking-widest leading-relaxed">
                    Please Select the services and get information on new products discounts and seasonal offers
                  </p>
               </div>
               
               {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 text-center border border-red-100">{error}</div>}

               <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
                  {/* Fields Section */}
                  <div className="xl:col-span-5 space-y-3 lg:space-y-4">
                    <h3 className="text-base lg:text-xl font-black text-sm-blue uppercase tracking-tight flex items-center gap-2 lg:gap-3">
                      <Building2 size={20} className="lg:size-6" /> Institutional Info
                    </h3>
                    
                    <div className="space-y-2.5 pt-1">
                      <div className="space-y-1">
                        <label className="text-[9px] lg:text-xs font-bold text-gray-900 uppercase ml-6 tracking-wider opacity-60">School Name</label>
                        <input type="text" placeholder="school Name" required value={formData.schoolName} onChange={e => setFormData({...formData, schoolName: e.target.value})} className="w-full bg-white px-6 py-3.5 rounded-3xl border-2 border-gray-100 focus:border-sm-blue outline-none transition-all placeholder:text-gray-200 font-medium text-sm shadow-sm" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] lg:text-xs font-bold text-gray-900 uppercase ml-6 tracking-wider opacity-60">Email id*</label>
                        <input type="email" placeholder="Email ID*" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white px-6 py-3.5 rounded-3xl border-2 border-gray-100 focus:border-sm-blue outline-none transition-all placeholder:text-gray-200 font-medium text-sm shadow-sm" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] lg:text-xs font-bold text-gray-900 uppercase ml-6 tracking-wider opacity-60">Phone Number</label>
                        <input type="text" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white px-6 py-3.5 rounded-3xl border-2 border-gray-100 focus:border-sm-blue outline-none transition-all placeholder:text-gray-200 font-medium text-sm shadow-sm" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] lg:text-xs font-bold text-gray-900 uppercase ml-6 tracking-wider opacity-60">Authorised Person</label>
                        <input type="text" placeholder="Authorised Person" value={formData.authorisedPerson} onChange={e => setFormData({...formData, authorisedPerson: e.target.value})} className="w-full bg-white px-6 py-3.5 rounded-3xl border-2 border-gray-100 focus:border-sm-blue outline-none transition-all placeholder:text-gray-200 font-medium text-sm shadow-sm" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] lg:text-xs font-bold text-gray-900 uppercase ml-6 tracking-wider opacity-60">Address</label>
                        <input type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-white px-6 py-3.5 rounded-3xl border-2 border-gray-100 focus:border-sm-blue outline-none transition-all placeholder:text-gray-200 font-medium text-sm shadow-sm" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] lg:text-xs font-bold text-gray-900 uppercase ml-6 tracking-wider opacity-60">Pincode</label>
                        <input type="text" placeholder="Pincode" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-white px-6 py-3.5 rounded-3xl border-2 border-gray-100 focus:border-sm-blue outline-none transition-all placeholder:text-gray-200 font-medium text-sm shadow-sm" />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] lg:text-xs font-bold text-gray-900 uppercase ml-6 tracking-wider opacity-60">Type of school</label>
                        <div className="relative">
                          <select 
                            className="w-full bg-white px-6 py-3.5 rounded-3xl border-2 border-gray-100 focus:border-sm-blue outline-none transition-all text-sm font-medium appearance-none shadow-sm cursor-pointer pr-12"
                            value={formData.schoolType}
                            onChange={e => setFormData({...formData, schoolType: e.target.value})}
                          >
                            <option value="" disabled>Select school type</option>
                            <option value="International school">International school</option>
                            <option value="CBSE School">CBSE School</option>
                            <option value="ICSE School">ICSE School</option>
                            <option value="STATE Board School">STATE Board School</option>
                            <option value="College University">College University</option>
                            <option value="Business Educational Partners">Business Educational Partners</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                             <ChevronDown size={18} strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] lg:text-xs font-bold text-gray-900 uppercase ml-6 tracking-wider opacity-60">Message</label>
                        <textarea placeholder="Write your message here..." rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white px-6 py-3.5 rounded-3xl border-2 border-gray-100 focus:border-sm-blue outline-none transition-all placeholder:text-gray-200 font-medium text-sm resize-none shadow-sm"></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Services Grid Section */}
                  <div className="xl:col-span-1 border-l border-gray-100 hidden xl:block"></div>
                  
                  <div className="xl:col-span-6 space-y-4 lg:space-y-6 mt-6 xl:mt-0 pt-6 xl:pt-0 border-t xl:border-t-0 border-gray-100">
                    <h3 className="text-base lg:text-xl font-black text-sm-blue uppercase tracking-tight flex items-center gap-2 lg:gap-3">
                       <CheckCircle2 size={20} className="lg:size-6" /> Select Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 pt-2">
                      {services.map((service, idx) => (
                        <label key={idx} className="flex items-center gap-3 lg:gap-4 cursor-pointer group">
                          <div className="relative flex items-center justify-center shrink-0">
                            <input 
                              type="checkbox" 
                              className="peer sr-only"
                              checked={formData.selectedServices.includes(service)}
                              onChange={() => handleServiceToggle(service)}
                            />
                            <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-gray-300 rounded lg:rounded-lg bg-white peer-checked:bg-sm-blue peer-checked:border-sm-blue transition-all group-hover:border-sm-blue shadow-sm"></div>
                            <CheckCircle2 size={12} className="lg:size-[14px] absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-[10px] lg:text-[11px] font-black text-gray-600 leading-tight uppercase tracking-tight group-hover:text-sm-blue transition-colors">
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-8 lg:mt-12 flex justify-center lg:justify-end">
                      <button disabled={loading} className="w-full lg:w-auto px-10 lg:px-12 py-4 lg:py-5 bg-[#004a8e] text-white font-black rounded-2xl lg:rounded-3xl shadow-3xl hover:bg-gray-900 transition-all uppercase tracking-[0.2em] text-[10px] lg:text-[11px] flex items-center justify-center gap-3 active:scale-[0.98]">
                        {loading ? 'Processing...' : 'SUBMIT'} <Send size={18} />
                      </button>
                    </div>
                  </div>
               </form>
            </div>
         </div>
      </div>

      {/* DASHBOARD-STYLE PREVIEW BENTO (Unique for Registration) */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
           {[
             { i: <ShieldCheck size={32} />, t: 'Data Privacy', d: 'Your institutional data is protected by bank-level encryption.', c: 'bg-white text-gray-900' },
             { i: <Globe size={32} />, t: 'Network Access', d: 'Discover the list of our 1500+ institutional members.', c: 'bg-white text-gray-900' },
             { i: <Sparkles size={32} />, t: 'Exclusive Docs', d: 'Download 200+ case studies and architectural PDFs.', c: 'bg-white text-gray-900' },
             { i: <ArrowRight size={32} />, t: 'Direct Entry', d: 'Fast-track your first order with simplified workflow.', c: 'bg-white text-gray-900' },
           ].map((card, i) => (
             <div key={i} className={`p-8 rounded-[40px] shadow-sm border border-gray-100 group hover:shadow-3xl transition-all hover:-translate-y-4 cursor-pointer flex flex-col items-center text-center ${card.c}`}>
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
