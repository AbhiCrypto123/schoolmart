import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';

const FALLBACK = `<h2>Getting Started as a Seller</h2>
<p>Register your business on SchoolMart by submitting your GST certificate, business PAN, and product catalogue. Our team will verify and onboard you within 5-7 business days.</p>
<h2>Listing Your Products</h2>
<p>Use our Seller Dashboard to upload products with specifications, images, and institutional pricing. Products go live after quality review.</p>
<h2>Order Fulfillment</h2>
<p>Receive orders via your dashboard or email. You are responsible for timely dispatch within the agreed SLA with SchoolMart.</p>`;

const SellerHelp = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('seller-help');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} /> : <>Seller <span className="text-sm-blue">Help Center</span></>}
                </h1>
                <p className="text-xl text-gray-500 mb-12">{hero.subtitle || 'Everything you need to start selling on SchoolMart.'}</p>
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content.content || FALLBACK }} />
            </div>
        </div>
    );
};
export default SellerHelp;
