import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';
import { CheckCircle2 } from 'lucide-react';

const DEFAULT_PLANS = [
  { title: 'Standard', price: 'Direct', features: ['Wholesale Rates', 'GST Invoicing', 'Standard Warranty'] },
  { title: 'Project', price: 'Custom', features: ['Bulk Discounts', 'Layout Design', 'Extended Warranty'] },
  { title: 'Enterprise', price: 'Contact', features: ['Turnkey Setup', 'Audit Support', 'NEP Compliance'] },
];

const Pricing = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('pricing');
    const hero = blocks?.page_hero || {};
    const plansCMS = blocks?.pricing_plans?.items;
    const plans = plansCMS?.length ? plansCMS : DEFAULT_PLANS;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
            </div>
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="text-center mb-20">
                    <h1 className="text-6xl lg:text-8xl font-black text-gray-900 uppercase tracking-tighter mb-6"
                        dangerouslySetInnerHTML={{ __html: hero.titleHtml || 'Value <span class="text-sm-blue">Transparent</span>' }} />
                    <p className="max-w-2xl mx-auto text-xl text-gray-400 font-medium">
                        {hero.subtitle || 'Optimized costs for maximum institutional impact. Direct-to-school pricing with no hidden overheads.'}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div key={i} className="p-10 rounded-[40px] border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl transition-all group">
                            <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">{plan.title}</h3>
                            <div className="text-4xl font-black mb-8">{plan.price}</div>
                            <ul className="space-y-4 mb-10">
                                {(plan.features || []).map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                        <CheckCircle2 size={18} className="text-sm-blue" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-sm-blue transition-colors">
                                {plan.cta || 'Get Quote'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Pricing;
