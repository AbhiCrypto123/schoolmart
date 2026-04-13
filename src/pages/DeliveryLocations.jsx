import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const DeliveryLocations = () => {
    const navigate = useNavigate();

    const regions = [
        { name: 'South India', hubs: ['Hyderabad', 'Bangalore', 'Chennai', 'Vijayawada'] },
        { name: 'North India', hubs: ['Delhi NCR', 'Chandigarh', 'Jaipur', 'Lucknow'] },
        { name: 'West India', hubs: ['Mumbai', 'Pune', 'Ahmedabad', 'Surat'] },
        { name: 'East India', hubs: ['Kolkata', 'Bhubaneswar', 'Guwahati'] }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter mb-4">Delivery <span className="text-sm-blue">Hubs</span></h1>
                <p className="text-xl text-gray-500 mb-20 max-w-2xl">Serving educational institutions across the lengths and breadths of India with dedicated academic logistics.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {regions.map((region) => (
                        <div key={region.name} className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-4">{region.name}</h3>
                            <ul className="space-y-3">
                                {region.hubs.map(city => (
                                    <li key={city} className="flex items-center gap-2 text-[13px] font-bold text-gray-800">
                                        <div className="w-1 h-1 rounded-full bg-sm-blue" />
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DeliveryLocations;
