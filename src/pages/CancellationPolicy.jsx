import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';

const FALLBACK = `<h2>1. Institutional Orders</h2>
<p>Due to the bespoke nature of school furniture and laboratory equipment, cancellations are only accepted within 48 hours of order placement.</p>
<h2>2. Project Milestones</h2>
<p>For turnkey campus projects, termination of contract is governed by the specific Service Level Agreement (SLA) signed during the onboarding phase.</p>`;

const CancellationPolicy = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('cancellation-policy');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} /> : <>Cancellation <span className="text-sm-blue">Policy</span></>}
                </h1>
                <p className="text-xl text-gray-500 mb-12">{hero.subtitle || 'Clear guidelines for institutional orders and project commitments.'}</p>
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content.content || FALLBACK }} />
            </div>
        </div>
    );
};
export default CancellationPolicy;
