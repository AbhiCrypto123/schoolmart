import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, FileText, Key, LogOut, Building2, Mail, Phone, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

const MemberDashboard = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const [activeTab, setActiveTab] = useState('profile');

   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
         navigate('/login');
      } else {
         setUser(JSON.parse(storedUser));
      }
   }, [navigate]);

   const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
   };

   if (!user) return null;

   return (
      <main className="min-h-screen bg-gray-50 pt-24 pb-20">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
               
               {/* SIDEBAR */}
               <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                     <div className="p-8 text-center bg-gray-900 text-white">
                        <div className="w-20 h-20 bg-white/10 rounded-[30px] flex items-center justify-center mx-auto mb-4 border border-white/20">
                           <User size={40} className="text-white" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight leading-none">{user.name || 'School Partner'}</h3>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">Verified Institution</p>
                     </div>

                     <div className="p-4 space-y-2">
                        {[
                           { id: 'profile', label: 'My Profile', icon: <Building2 size={18} /> },
                           { id: 'quotes', label: 'Quote Requests', icon: <FileText size={18} /> },
                           { id: 'security', label: 'Security', icon: <Key size={18} /> },
                        ].map(item => (
                           <button 
                              key={item.id}
                              onClick={() => setActiveTab(item.id)}
                              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[13px] font-black uppercase tracking-wider transition-all ${activeTab === item.id ? 'bg-sm-blue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                           >
                              {item.icon}
                              {item.label}
                           </button>
                        ))}
                        <div className="pt-4 border-t border-gray-50 mt-4">
                           <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[13px] font-black uppercase tracking-wider text-red-500 hover:bg-red-50 transition-all">
                              <LogOut size={18} />
                              Log-out
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               {/* MAIN CONTENT */}
               <div className="flex-1">
                  {activeTab === 'profile' && (
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
                           <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8 flex items-center gap-4">
                              <Building2 size={32} className="text-sm-blue" /> Institutional Details
                           </h2>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                 <div>
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">School Entity</label>
                                    <p className="text-lg font-black text-gray-900 uppercase">{user.name}</p>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-sm-blue">
                                       <Mail size={20} />
                                    </div>
                                    <div>
                                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Work Email</label>
                                       <p className="text-sm font-black text-gray-900">{user.email}</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="space-y-6">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-sm-blue">
                                       <Phone size={20} />
                                    </div>
                                    <div>
                                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Primary Contact</label>
                                       <p className="text-sm font-black text-gray-900">{user.phone || '+91 XXXX XXXX'}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                                       <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Status</label>
                                       <p className="text-[11px] font-black text-emerald-600 uppercase">Premium Member</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Recent Activity Mini-Bento */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-all">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
                              <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">Total Quotes</h4>
                              <div className="text-6xl font-black mb-2">12</div>
                              <p className="text-sm text-white/60 font-medium">Requested this academic year</p>
                           </div>
                           <div className="bg-white rounded-[40px] p-8 border border-gray-100 group hover:border-sm-blue transition-all">
                              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Last Quote Request</h4>
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="w-12 h-12 bg-blue-50 text-sm-blue rounded-2xl flex items-center justify-center">
                                    <Clock size={24} />
                                 </div>
                                 <div>
                                    <p className="text-lg font-black text-gray-900">2 Hours Ago</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">SmartTech Lab Series</p>
                                 </div>
                              </div>
                              <button onClick={() => setActiveTab('quotes')} className="w-full py-3 bg-gray-50 text-gray-900 font-black rounded-2xl text-[11px] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all">View History</button>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'quotes' && (
                     <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8 flex items-center gap-4">
                           <FileText size={32} className="text-sm-blue" /> Quote History
                        </h2>
                        
                        <div className="space-y-4">
                           {/* Empty State or Table */}
                           <div className="text-center py-20 px-10 border-4 border-dashed border-gray-50 rounded-[40px]">
                              <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                 <Package size={40} />
                              </div>
                              <h3 className="text-xl font-black text-gray-900 uppercase mb-2">No Active Quotes</h3>
                              <p className="text-gray-400 font-medium max-w-sm mx-auto mb-8 text-sm leading-relaxed">You haven't requested any custom quotations yet. Browse our professional catalogs to get started.</p>
                              <Link to="/catalogues" className="inline-flex items-center gap-3 px-10 py-4 bg-sm-blue text-white font-black rounded-full uppercase text-[12px] tracking-widest hover:bg-gray-900 transition-all shadow-xl">
                                 Explore Inventory <ChevronRight size={18} />
                              </Link>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'security' && (
                     <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8 flex items-center gap-4">
                           <Key size={32} className="text-sm-blue" /> Access Control
                        </h2>
                        
                        <form className="max-w-md space-y-6">
                           <div className="space-y-1">
                              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Current Password</label>
                              <input type="password" placeholder="********" className="w-full bg-gray-50 px-6 py-4 rounded-3xl border-2 border-transparent focus:border-sm-blue outline-none transition-all font-bold text-sm" />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">New Password</label>
                              <input type="password" placeholder="********" className="w-full bg-gray-50 px-6 py-4 rounded-3xl border-2 border-transparent focus:border-sm-blue outline-none transition-all font-bold text-sm" />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Confirm New Password</label>
                              <input type="password" placeholder="********" className="w-full bg-gray-50 px-6 py-4 rounded-3xl border-2 border-transparent focus:border-sm-blue outline-none transition-all font-bold text-sm" />
                           </div>
                           <button className="px-10 py-4 bg-gray-900 text-white font-black rounded-full uppercase text-[12px] tracking-widest hover:bg-sm-blue transition-all shadow-lg active:scale-95">Update Security</button>
                        </form>
                     </div>
                  )}
               </div>

            </div>
         </div>
      </main>
   );
};

export default MemberDashboard;
