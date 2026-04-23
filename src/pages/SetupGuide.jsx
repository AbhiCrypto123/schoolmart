import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMSPage } from '../hooks/useCMSBlock';
import { CheckCircle2, Download, Phone, Shield } from 'lucide-react';

const DEFAULT_PHASES = [
  { num: '01', title: 'Initial Preparation', sub: 'Legal & Strategy Foundation', desc: 'The groundwork for your new institution begins with legal compliance and strategic financial modelling.', steps: ['Society / Trust Registration certificates', 'Affiliation Roadmap development', 'Site Visit & Geotagging reports'] },
  { num: '02', title: 'Infrastructure Build', sub: 'Designing Inspiring Spaces', desc: 'Transforming land into learning environments that meet NEP standards.', steps: ['NEP-ready campus master planning', 'Specialized STEM & Composite Labs', 'Library & Modern Learning Hubs'] },
  { num: '03', title: 'Digital Core Setup', sub: 'AI & Connectivity Readiness', desc: 'Future-proofing your campus with campus-wide high-speed connectivity.', steps: ['Campus-wide Ultra-fast Wi-Fi', 'Smart Classroom Panels', 'AI-enabled learning tools setup'] },
  { num: '04', title: 'Compliance & Application', sub: 'Board Affiliation Process', desc: 'Navigating the complex bureaucratic landscape of board applications.', steps: ['Online Board Application (CBSE/IB/ICSE)', 'Fee payments & form submission', 'Board Inspection Coordination'] },
];

const SetupGuide = () => {
  const navigate = useNavigate();
  const { blocks } = useCMSPage('setup-guide');
  const hero = blocks?.page_hero || {};
  const phasesCMS = blocks?.setup_phases?.items;
  const phases = phasesCMS?.length ? phasesCMS : DEFAULT_PHASES;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-white py-12 px-6 border-b border-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full mb-6">
            <Shield size={12} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">{hero.badge || 'Institutional Roadmap'}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4"
              dangerouslySetInnerHTML={{ __html: hero.titleHtml || 'Phase-Wise <span class="text-sm-blue italic font-serif lowercase tracking-normal">Setup Guide.</span>' }} />
          <p className="text-gray-500 text-[13px] font-bold uppercase tracking-widest leading-relaxed max-w-xl mx-auto">
            {hero.subtitle || 'From registration to board affiliation — our step-by-step roadmap keeps your school project on track.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, i) => (
            <div key={i} className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all group flex flex-col h-full">
              <span className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Phase {phase.num}</span>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 min-h-[3rem] line-clamp-2">{phase.title}</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-8 flex-grow">{phase.desc}</p>
              <div className="space-y-3 pt-6 border-t border-gray-50">
                {(phase.steps || []).map((step, j) => (
                  <div key={j} className="flex gap-3 items-center">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 opacity-40" />
                    <span className="text-[13px] font-bold text-gray-600 uppercase tracking-tight line-clamp-1">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto p-12 rounded-[50px] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-2/3">
            <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: hero.ctaTitle || 'Download the <br/> 48-Point Affiliation <span class="italic font-serif text-emerald-500">Roadmap.</span>' }} />
            <p className="text-white/40 text-[13px] font-black uppercase tracking-widest leading-loose mb-10">
              {hero.ctaSubtitle || 'Comprehensive compliance guide for land documents, structural safety, and board norms.'}
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-black rounded-xl text-[12px] uppercase tracking-widest hover:bg-white hover:text-emerald-600 transition-all">
              Get The Checklist <Download size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">{hero.consultTitle || 'Consult Our Experts.'}</h4>
          <a href="tel:+919966109191" className="inline-flex items-center gap-4 px-10 py-5 bg-gray-900 text-white font-black rounded-xl text-[12px] uppercase tracking-widest hover:bg-sm-blue transition-all">
            <Phone size={16} /> Schedule Strategy Call
          </a>
        </div>
      </section>
    </main>
  );
};
export default SetupGuide;
