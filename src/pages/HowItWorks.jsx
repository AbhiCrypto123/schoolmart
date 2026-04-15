import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const DEFAULT_STEPS = [
  { step: '01', title: 'Consultation', desc: 'Our team of campus planners analyzes your pedagogical goals and spatial constraints.' },
  { step: '02', title: 'Design & Curation', desc: 'Detailed 2D/3D layouts curated from our global library of school infrastructure.' },
  { step: '03', title: 'Implementation', desc: 'White-glove delivery, assembly, and training for your faculty and staff.' },
];

const HowItWorks = () => {
    const navigate = useNavigate();
    const { blocks } = useCMSPage('how-it-works');
    const hero = blocks?.page_hero || {};
    const stepsCMS = blocks?.how_steps?.items;
    const steps = stepsCMS?.length ? stepsCMS : DEFAULT_STEPS;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button onClick={() => navigate(-1)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-sm-blue transition-colors flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">←</div>Back
                </button>
            </div>
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/2">
                        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-sm-blue/10 rounded-full border border-sm-blue/20">
                            <div className="w-2 h-2 rounded-full bg-sm-blue animate-pulse" />
                            <span className="text-[10px] font-black text-sm-blue uppercase tracking-widest">{hero.badge || 'Process Guide'}</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-[0.9] mb-8"
                            dangerouslySetInnerHTML={{ __html: hero.titleHtml || 'How It <br/><span class="text-sm-blue">Works</span>' }} />
                        <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
                            {hero.subtitle || 'SchoolMart bridges the gap between educational visionaries and infrastructure execution.'}
                        </p>
                        <div className="space-y-12">
                            {steps.map((item) => (
                                <div key={item.step} className="flex gap-6 group">
                                    <span className="text-4xl font-black text-sm-blue/20 group-hover:text-sm-blue transition-colors">{item.step}</span>
                                    <div>
                                        <h3 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                            <img src={hero.img || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80'} alt="How It Works" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <h4 className="text-2xl font-black uppercase tracking-tighter">{hero.overlayTitle || 'NEP 2020 Compliant'}</h4>
                                <p className="opacity-70 text-sm">{hero.overlaySubtitle || "India's first modular infrastructure hub."}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HowItWorks;
