import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';

const FALLBACK = `<h2>Delivery Coverage</h2>
<p>We deliver to all major cities and towns across India including Tier 1, Tier 2, and Tier 3 cities. Remote and rural deliveries are available for bulk institutional orders with special logistics arrangements.</p>
<h2>State Coverage</h2>
<p>Currently serving: Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, Delhi NCR, Gujarat, Rajasthan, Uttar Pradesh, West Bengal, and 10 more states.</p>
<h2>International Shipping</h2>
<p>Export orders to Middle East, Southeast Asia, and Africa are available for select product categories. Contact us for international procurement.</p>`;

const DeliveryLocations = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('delivery-locations');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} /> : <>Delivery <span className="text-sm-blue">Locations</span></>}
                </h1>
                <p className="text-xl text-gray-500 mb-12">{hero.subtitle || 'Pan-India delivery network for institutional orders.'}</p>
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content.content || FALLBACK }} />
            </div>
        </div>
    );
};
export default DeliveryLocations;
