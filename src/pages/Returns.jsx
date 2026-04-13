import React from 'react';
import { useNavigate } from 'react-router-dom';

const Returns = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>
                    Back
                </button>

                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Returns & <span className="text-sm-blue">Replacement</span></h1>
                <p className="text-xl text-gray-500 mb-12">Ensuring quality and durability for every school asset.</p>

                <div className="prose prose-blue max-w-none">
                    <h2 className="text-2xl font-black uppercase tracking-tight">1. Quality Guarantee</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Every product undergoes a rigorous 3-point QC check before leaving our warehouse. We guarantee replacement for any item damaged in transit.
                    </p>

                    <h2 className="text-2xl font-black uppercase tracking-tight">2. Replacement Process</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Institutions must report transit damage within 24 hours of delivery. A replacement will be dispatched within 7 business days for standard items.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Returns;
