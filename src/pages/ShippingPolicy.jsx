import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, Clock } from 'lucide-react';

const ShippingPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>
                    Back
                </button>

                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Shipping <span className="text-sm-blue">Policy</span></h1>
                <p className="text-xl text-gray-500 mb-12">Professional delivery and white-glove setup for educational institutions.</p>

                <div className="prose prose-blue max-w-none">
                    <h2 className="text-2xl font-black uppercase tracking-tight">1. Delivery Timelines</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Most infrastructure orders are processed within 7-10 business days. Custom laboratory and furniture setups may require 21-30 days for precision manufacturing and safe transit.
                    </p>

                    <h2 className="text-2xl font-black uppercase tracking-tight">2. Shipping Charges</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Calculated based on volume and distance. For large-scale projects involving multiple labs or campus-wide furniture, we offer consolidatred logistics solutions to minimize costs.
                    </p>

                    <h2 className="text-2xl font-black uppercase tracking-tight">3. White-Glove Installation</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Our specialized school logistics team ensures that all items are not just delivered but placed and installed according to the approved campus layout.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
