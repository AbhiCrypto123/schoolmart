import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Send } from 'lucide-react';

const ReportIssue = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('report-issue');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};
    const [sent, setSent] = useState(false);

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-2xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} /> : <>Report an <span className="text-sm-blue">Issue</span></>}
                </h1>
                <p className="text-gray-500 mb-12">{hero.subtitle || 'Help us improve. Report any order, delivery, or product issue here.'}</p>
                {content.content && (
                    <div className="prose prose-blue max-w-none mb-12" dangerouslySetInnerHTML={{ __html: content.content }} />
                )}
                {!sent ? (
                    <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Order ID / Reference</label>
                            <input type="text" className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-sm-blue transition-colors" placeholder="ORD-XXXX" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Issue Description</label>
                            <textarea rows={5} className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-sm-blue transition-colors resize-none" placeholder="Describe your issue in detail..." />
                        </div>
                        <button type="submit" className="w-full py-4 bg-sm-blue text-white font-black rounded-2xl text-[13px] uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-3">
                            <Send size={16} /> Submit Report
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[2rem]">
                        <p className="text-2xl font-black text-gray-900 mb-2">✅ Report Submitted</p>
                        <p className="text-gray-500">Our team will respond within 24-48 hours.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ReportIssue;
