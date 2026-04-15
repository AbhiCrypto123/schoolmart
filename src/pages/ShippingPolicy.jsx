import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';

const FALLBACK_CONTENT = `
<h2>1. Delivery Timelines</h2>
<p>Most infrastructure orders are processed within 7-10 business days. Custom laboratory and furniture setups may require 21-30 days for precision manufacturing and safe transit.</p>
<h2>2. Shipping Charges</h2>
<p>Calculated based on volume and distance. For large-scale projects involving multiple labs or campus-wide furniture, we offer consolidated logistics solutions to minimize costs.</p>
<h2>3. White-Glove Installation</h2>
<p>Our specialized school logistics team ensures that all items are not just delivered but placed and installed according to the approved campus layout.</p>
`;

const ShippingPolicy = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('shipping-policy');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>
                    Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml
                        ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} />
                        : <>Shipping <span className="text-sm-blue">Policy</span></>}
                </h1>
                <p className="text-xl text-gray-500 mb-12">{hero.subtitle || 'Professional delivery and white-glove setup for educational institutions.'}</p>
                <div className="prose prose-blue max-w-none"
                    dangerouslySetInnerHTML={{ __html: content.content || FALLBACK_CONTENT }} />
            </div>
        </div>
    );
};

export default ShippingPolicy;
