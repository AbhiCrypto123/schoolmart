import React from 'react';
import { useNavigate } from 'react-router-dom';

const SellOnSchoolmart = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-[0.9] mb-8">
                            Sell on <br /> <span className="text-sm-blue">SchoolMart</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
                            The largest institutional marketplace for manufacturers of school innovation products.
                        </p>
                        <button className="px-12 py-5 bg-sm-blue text-white font-black rounded-2xl text-[13px] uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">
                            Register now
                        </button>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="p-12 bg-gray-50 rounded-[48px] border border-gray-100">
                             <h3 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900 leading-tight">Join 500+ Qualified Manufacturers</h3>
                             <p className="text-gray-500 leading-relaxed font-medium">Reach decision makers in 4000+ partner schools and benefit from our specialized academic logistics and marketing ecosystem.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellOnSchoolmart;
