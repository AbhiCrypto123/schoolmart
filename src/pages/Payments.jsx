import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';

const FALLBACK = `<h2>Accepted Payment Methods</h2>
<p>We accept NEFT / RTGS bank transfers, UPI, demand drafts, and institutional purchase orders. Cheques are accepted for orders above ₹1,00,000.</p>
<h2>Invoice &amp; GST</h2>
<p>All invoices include GST breakdowns. GSTIN of the institution must be provided at checkout for B2B invoicing.</p>
<h2>Advance Payment</h2>
<p>A 30-50% advance is required for custom manufacturing orders. The balance is due upon delivery confirmation.</p>`;

const Payments = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('payments');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} /> : <>Payment <span className="text-sm-blue">Methods</span></>}
                </h1>
                <p className="text-xl text-gray-500 mb-12">{hero.subtitle || 'Flexible, transparent payment options for institutional procurement.'}</p>
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content.content || FALLBACK }} />
            </div>
        </div>
    );
};
export default Payments;
