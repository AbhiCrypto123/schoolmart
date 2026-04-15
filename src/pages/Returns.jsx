import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';

const FALLBACK = `<h2>1. Return Window</h2>
<p>Defective or damaged items must be reported within 7 days of delivery with photographic evidence.</p>
<h2>2. Refund Processing</h2>
<p>Approved refunds are processed within 14 business days via the original payment method.</p>
<h2>3. Non-Returnable Items</h2>
<p>Custom-manufactured furniture, lab equipment, and installed fixtures are non-returnable unless defective.</p>`;

const Returns = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('replacement-return');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} /> : <>Returns <span className="text-sm-blue">&amp; Refunds</span></>}
                </h1>
                <p className="text-xl text-gray-500 mb-12">{hero.subtitle || 'Transparent return and replacement guidelines for all institutional orders.'}</p>
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content.content || FALLBACK }} />
            </div>
        </div>
    );
};
export default Returns;
