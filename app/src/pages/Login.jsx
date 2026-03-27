// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send, Lock, UserCheck, ShieldCheck, Mail, ArrowRight, Sparkles, Building2, Key } from 'lucide-react';
import { login, verifyOtp, resendOtp } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Password, 2: OTP
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(formData.email, formData.password);
      if (res.otpRequired) {
        setStep(2);
        setMessage('Security code sent to your email.');
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await verifyOtp(formData.email, otp);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp(formData.email);
      setMessage('OTP resent successfully.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-20">
         
         {/* UNIQUE LOGIN STORY */}
         <div className="flex-1 text-center lg:text-left hidden lg:block">
            <span className="inline-block px-5 py-2 bg-emerald-50 text-emerald-600 font-black rounded-full mb-10 text-[11px] uppercase tracking-widest border border-emerald-100 shadow-sm">
               <ShieldCheck size={16} className="inline mr-2 animate-pulse" /> Secure Institutional Portal
            </span>
            <h1 className="text-5xl md:text-9xl font-black text-gray-900 font-heading leading-[0.85] tracking-tighter mb-10 uppercase">
               Welcome <br/> <span className="text-sm-blue italic font-serif opacity-80 decoration-sm-blue decoration-4 underline underline-offset-[20px]">Back.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-sm mb-12 font-medium">
               Manage your project timelines, view your quotation history, and access exclusive design resources from one dashboard.
            </p>

            <div className="flex items-center gap-6 mt-20">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-xl hover:scale-110 transition-transform cursor-pointer">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Member" className="w-full h-full object-cover" />
                 </div>
               ))}
               <div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Member Circle</h4>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">15k+ Institutions Online</p>
               </div>
            </div>
         </div>

         {/* HIGHLIGHT LOGIN BOX */}
         <div className="w-full lg:w-[480px] relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-blue-600 rounded-full blur-[140px] opacity-10 animate-pulse" />
            <div className="bg-white rounded-[70px] p-12 lg:p-16 shadow-3xl relative border border-gray-100 overflow-hidden transform hover:scale-[1.02] transition-transform duration-700">
               <div className="absolute top-0 left-0 right-0 h-6 bg-sm-blue" />
               <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-gray-900 text-white rounded-[35px] flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:rotate-12 transition-transform">
                     {step === 1 ? <UserCheck size={36} /> : <Key size={36} />}
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 font-heading tracking-tight mb-4 uppercase tracking-[0.2em] leading-none">
                    {step === 1 ? 'SIGN IN' : '2FA VERIFY'}
                  </h2>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    {step === 1 ? 'Everything a school needs is within reach.' : 'Enter the code from your email'}
                  </p>
               </div>
               
               {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 text-center border border-red-100">{error}</div>}
               {message && <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 text-center border border-emerald-100">{message}</div>}

               {step === 1 ? (
                 <form className="space-y-8" onSubmit={handleLogin}>
                    <div className="relative group">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-6 transition-colors group-focus-within:text-sm-blue">Work Email</p>
                       <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="example@institutional.in" className="w-full bg-gray-50 px-8 py-5 rounded-[30px] border border-gray-50 focus:border-sm-blue focus:bg-white outline-none transition-all placeholder:text-gray-200 font-bold text-sm shadow-inner" />
                       <Mail size={18} className="absolute right-8 bottom-6 text-gray-200 group-focus-within:text-sm-blue transition-colors" />
                    </div>
                    <div className="relative group">
                       <div className="flex items-center justify-between mb-3 px-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest transition-colors group-focus-within:text-sm-blue">Security Key</p>
                          <Link to="#" className="text-[8px] font-black text-sm-blue hover:text-gray-900 uppercase tracking-widest transition-colors">Forgot?</Link>
                       </div>
                       <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="********" className="w-full bg-gray-50 px-8 py-5 rounded-[30px] border border-gray-50 focus:border-sm-blue focus:bg-white outline-none transition-all placeholder:text-gray-200 font-bold text-sm shadow-inner" />
                       <Lock size={18} className="absolute right-8 bottom-6 text-gray-200 group-focus-within:text-sm-blue transition-colors" />
                    </div>

                    <button disabled={loading} className="w-full py-6 bg-gray-900 text-white font-black rounded-[25px] shadow-3xl hover:shadow-blue-200 hover:bg-sm-blue transition-all uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-3 active:scale-[0.98]">
                       {loading ? 'Authorizing...' : 'Authorize Portal'} <ArrowRight size={20} />
                    </button>
                 </form>
               ) : (
                 <form className="space-y-8" onSubmit={handleVerify}>
                    <div className="relative group text-center">
                       <p className="text-[11px] text-gray-500 font-medium mb-6 leading-relaxed">Security code sent to <br/><span className="text-gray-900 font-bold">{formData.email}</span></p>
                       <input type="text" maxLength="6" placeholder="000000" required value={otp} onChange={e => setOtp(e.target.value)} className="w-full bg-gray-50 px-6 py-6 rounded-[30px] border border-gray-50 focus:border-sm-blue focus:bg-white outline-none transition-all text-center text-3xl font-black tracking-[10px] placeholder:text-gray-200" />
                    </div>
                    
                    <button disabled={loading} className="w-full py-6 bg-sm-blue text-white font-black rounded-[25px] shadow-3xl hover:bg-gray-900 transition-all uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-3 active:scale-[0.98]">
                       {loading ? 'Verifying...' : 'Verify Identity'} <ShieldCheck size={20} />
                    </button>
                    
                    <button type="button" onClick={handleResend} className="w-full text-center text-[10px] font-black text-gray-400 hover:text-sm-blue uppercase tracking-widest">Resend Security Code</button>
                 </form>
               )}
               
               <div className="text-center mt-12 bg-gray-50 p-6 rounded-[35px] border border-gray-100 group cursor-pointer hover:bg-sm-blue transition-all">
                  <p className="text-gray-400 group-hover:text-white/60 text-[10px] uppercase font-bold tracking-widest mb-2 transition-colors">New Institution?</p>
                  <Link to="/registration-new-form" className="text-[11px] font-black group-hover:text-white text-sm-blue uppercase tracking-widest transition-colors flex items-center justify-center gap-2"> Create School Account <Sparkles size={14} /></Link>
               </div>
            </div>
         </div>

      </div>
    </main>
  );
};

export default Login;
