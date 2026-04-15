import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';

const FALLBACK = `<h2>Grounds for Order Rejection</h2>
<p>SchoolMart reserves the right to reject any order due to: incomplete or incorrect institutional details, inability to verify the procurement authority, items out of stock, or service unavailability in your region.</p>
<h2>Notification</h2>
<p>In the event of rejection, the institution will be notified via email within 24 hours with a full explanation and alternative options.</p>
<h2>Refund on Rejection</h2>
<p>Any advance payment made for a rejected order will be refunded in full within 7 business days.</p>`;

const OrderRejectionPolicy = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('order-rejection-policy');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} /> : <>Order Rejection <span className="text-sm-blue">Policy</span></>}
                </h1>
                <p className="text-xl text-gray-500 mb-12">{hero.subtitle || 'Understanding the conditions under which orders may be declined.'}</p>
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content.content || FALLBACK }} />
            </div>
        </div>
    );
};
export default OrderRejectionPolicy;
