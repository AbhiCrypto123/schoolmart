import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>
                    Back
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Secure <span className="text-sm-blue">Payments</span></h1>
                <p className="text-xl text-gray-500 mb-12">Flexible transaction methods for institutional projects.</p>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
                    <p className="mb-6">We support corporate banking, LC (Letter of Credit), and milestone-based payments for turnkey infrastructure setups.</p>
                </div>
            </div>
        </div>
    );
};

export default Payments;
