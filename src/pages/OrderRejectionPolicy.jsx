import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderRejectionPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2 mb-16">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>
                    Back
                </button>

                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Order <span className="text-sm-blue">Rejection</span></h1>
                <p className="text-xl text-gray-500 mb-12">Guidelines for immediate rejection of incoming institutional shipments.</p>

                <div className="prose prose-blue max-w-none">
                    <h2 className="text-2xl font-black uppercase tracking-tight">1. Immediate Rejection</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Authorized school representatives should reject any shipment that shows visible structural damage or tampering at the time of delivery.
                    </p>

                    <h2 className="text-2xl font-black uppercase tracking-tight">2. Reporting Disputes</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        All rejections must be noted on the Proof of Delivery (POD) document and reported to the SchoolMart logistics desk within 2 hours.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderRejectionPolicy;
