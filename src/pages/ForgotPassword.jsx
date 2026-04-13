import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck, Key, ArrowRight, CheckCircle2, RefreshCw, Send, ShieldAlert } from 'lucide-react';
import { forgotPassword, resetPassword } from '../services/api';

const ForgotPassword = () => {
   const navigate = useNavigate();
   const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
   const [email, setEmail] = useState('');
   const [otp, setOtp] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [message, setMessage] = useState('');

   const handleRequestOtp = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      try {
         const res = await forgotPassword(email);
         if (res.error) throw new Error(res.error);
         setStep(2);
         setMessage('Verification code sent to your email.');
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   const handleVerifyAndReset = async (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
         return setError('Passwords do not match');
      }
      setLoading(true);
      setError('');
      try {
         const res = await resetPassword(email, otp, newPassword);
         if (res.error) throw new Error(res.error);
         setStep(4); // Success Step
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   return (
      <main className="min-h-screen bg-gray-50 pt-20 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[120px] -mr-32 -mt-32" />
         <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-100/20 rounded-full blur-[100px] -ml-32 -mb-32" />

         <div className="bg-white rounded-[60px] shadow-3xl w-full max-w-lg relative border border-gray-100 overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-4 ${step === 4 ? 'bg-emerald-500' : 'bg-sm-blue'}`} />
            
            <div className="p-10 md:p-14">
               {step === 4 ? (
                  <div className="text-center animate-in zoom-in-95 duration-500">
                     <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[40px] flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                     </div>
                     <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Password Recovered</h2>
                     <p className="text-gray-500 font-medium mb-10 leading-relaxed italic">Your security credentials have been updated successfully. You can now login to your portal.</p>
                     <Link to="/login" className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-black rounded-full uppercase text-[12px] tracking-widest hover:bg-emerald-600 transition-all shadow-xl">
                        Proceed to Login <ArrowRight size={18} />
                     </Link>
                  </div>
               ) : (
                  <>
                     <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gray-50 text-gray-900 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-sm">
                           {step === 1 && <Mail size={32} />}
                           {step === 2 && <ShieldCheck size={32} />}
                           {step === 3 && <Key size={32} />}
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest mb-2 leading-none">
                           {step === 1 && 'Portal Access'}
                           {step === 2 && 'Identity Check'}
                           {step === 3 && 'New Credentials'}
                        </h2>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                           {step === 1 && 'Enter your institutional email'}
                           {step === 2 && 'Enter the 6-digit code sent to your email'}
                           {step === 3 && 'Create a secure new security key'}
                        </p>
                     </div>

                     {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest mb-6 text-center border border-red-100 flex items-center justify-center gap-2">
                           <ShieldAlert size={14} /> {error}
                        </div>
                     )}
                     {message && <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest mb-6 text-center border border-emerald-100">{message}</div>}

                     {step === 1 && (
                        <form onSubmit={handleRequestOtp} className="space-y-6">
                           <div className="space-y-1">
                              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Work Email</label>
                              <div className="relative">
                                 <input 
                                    type="email" 
                                    required 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your-name@school.in" 
                                    className="w-full bg-gray-50 px-8 py-4 rounded-3xl border-2 border-transparent focus:border-sm-blue outline-none transition-all font-bold text-sm" 
                                 />
                              </div>
                           </div>
                           <button disabled={loading} className="w-full py-5 bg-gray-900 text-white font-black rounded-3xl shadow-xl hover:bg-sm-blue transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                              {loading ? 'Sending...' : 'Request Code'} <Send size={18} />
                           </button>
                        </form>
                     )}

                     {step === 2 && (
                        <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6">
                           <div className="space-y-1">
                              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4 text-center block">Security Code</label>
                              <input 
                                 type="text" 
                                 maxLength={6}
                                 required 
                                 value={otp}
                                 onChange={e => setOtp(e.target.value)}
                                 placeholder="000000" 
                                 className="w-full bg-gray-50 px-8 py-5 rounded-3xl border-2 border-transparent focus:border-sm-blue outline-none text-center text-3xl font-black tracking-[0.5em] transition-all" 
                              />
                           </div>
                           <button className="w-full py-5 bg-gray-900 text-white font-black rounded-3xl shadow-xl hover:bg-sm-blue transition-all uppercase tracking-widest text-sm">
                              Verify Code
                           </button>
                           <button type="button" onClick={() => setStep(1)} className="w-full text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-sm-blue transition-colors">
                              Use different email
                           </button>
                        </form>
                     )}

                     {step === 3 && (
                        <form onSubmit={handleVerifyAndReset} className="space-y-6">
                           <div className="space-y-4">
                              <div className="space-y-1">
                                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">New Password</label>
                                 <input 
                                    type="password" 
                                    required 
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    placeholder="********" 
                                    className="w-full bg-gray-50 px-8 py-4 rounded-3xl border-2 border-transparent focus:border-sm-blue outline-none transition-all font-bold text-sm" 
                                 />
                              </div>
                              <div className="space-y-1">
                                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Confirm New Password</label>
                                 <input 
                                    type="password" 
                                    required 
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="********" 
                                    className="w-full bg-gray-50 px-8 py-4 rounded-3xl border-2 border-transparent focus:border-sm-blue outline-none transition-all font-bold text-sm" 
                                 />
                              </div>
                           </div>
                           <button disabled={loading} className="w-full py-5 bg-emerald-600 text-white font-black rounded-3xl shadow-xl hover:bg-gray-900 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                              {loading ? 'Updating...' : 'Set New Password'} <RefreshCw size={18} />
                           </button>
                        </form>
                     )}
                     
                     <div className="mt-12 pt-8 border-t border-gray-50 text-center">
                        <Link to="/login" className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-sm-blue transition-all">Back to Sign-in</Link>
                     </div>
                  </>
               )}
            </div>
         </div>
      </main>
   );
};

export default ForgotPassword;
