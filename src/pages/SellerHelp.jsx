import React from 'react';
import { useNavigate } from 'react-router-dom';

const SellerHelp = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>
                    Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Seller <span className="text-sm-blue">Hub Help</span></h1>
                <p className="text-xl text-gray-500 mb-12">Empowering our partners with resources and support.</p>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
                    <p className="mb-6">Documentation on how to list products, manage quotes, and integrate your manufacturing workflow with the SchoolMart platform.</p>
                </div>
            </div>
        </div>
    );
};

export default SellerHelp;
