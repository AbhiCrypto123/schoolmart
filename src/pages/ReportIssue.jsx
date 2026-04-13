import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, MessageSquare } from 'lucide-react';

const ReportIssue = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>
                    Back
                </button>

                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Report an <span className="text-sm-blue">Issue</span></h1>
                <p className="text-xl text-gray-500 mb-12">Help us maintain the highest standards of service.</p>

                <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 shadow-sm">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 px-4">Subject</label>
                                <input type="text" placeholder="e.g., Delivery Delay" className="w-full h-14 px-8 bg-white border border-gray-100 rounded-2xl focus:border-sm-blue outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 px-4">Order ID (Optional)</label>
                                <input type="text" placeholder="#SM-12345" className="w-full h-14 px-8 bg-white border border-gray-100 rounded-2xl focus:border-sm-blue outline-none transition-all font-medium" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 px-4">Description</label>
                            <textarea rows={4} placeholder="Please describe the issue in detail..." className="w-full p-8 bg-white border border-gray-100 rounded-2xl focus:border-sm-blue outline-none transition-all font-medium resize-none"></textarea>
                        </div>
                        <button className="px-12 py-5 bg-gray-900 text-white font-black rounded-[24px] uppercase tracking-[0.2em] text-[13px] hover:bg-sm-blue transition-all flex items-center gap-4">
                            Submit Report <AlertCircle size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportIssue;
