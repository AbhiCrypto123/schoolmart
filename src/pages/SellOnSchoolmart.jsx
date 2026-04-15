import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';

const FALLBACK = `<h2>Why Sell on SchoolMart?</h2>
<p>Access India's largest institutional B2B marketplace with 4000+ verified schools and colleges. Zero commission for the first 6 months.</p>
<h2>Who Can Sell?</h2>
<p>Manufacturers, importers, and distributors of school furniture, laboratory equipment, sports goods, digital infrastructure, and educational tools can apply to sell on SchoolMart.</p>
<h2>How to Apply</h2>
<p>Submit your application through the Partner Portal with your GST details, product catalogue, and pricing. Our team will review and respond within 5 business days.</p>`;

const SellOnSchoolmart = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('sell-on-schoolmart');
    const hero = blocks?.page_hero || {};
    const content = blocks?.page_content || {};
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                    {hero.titleHtml ? <span dangerouslySetInnerHTML={{ __html: hero.titleHtml }} /> : <>Sell on <span className="text-sm-blue">SchoolMart</span></>}
                </h1>
                <p className="text-xl text-gray-500 mb-12">{hero.subtitle || 'Reach thousands of institutions across India through our B2B marketplace.'}</p>
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content.content || FALLBACK }} />
            </div>
        </div>
    );
};
export default SellOnSchoolmart;
