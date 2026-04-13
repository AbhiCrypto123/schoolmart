import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, FileText, ChevronRight, Smartphone, Building2, Zap, Armchair, Calculator, CheckCircle2, Palette, Library, Briefcase, Users } from 'lucide-react';

const PATH_MAP = {
  'SCHOOLS FOR SALE / LEASE': '/school-sale',
  'FUNDRAISING': '/fundraising',
  'PARTNERSHIPS': '/partnerships',
  'WORKSHOPS': '/workshops',
  'SETTING UP A SCHOOL IN INDIA': '/p/setup-school-india',
  'COMPLETE GUIDE TO DIGITIZATION': '/p/digitization-guide',
  'PRODUCT CATALOG 2025': '/p/product-catalog-2025',
  'HOW TO SETUP COMPOSITE SKILL LAB?': '/p/skill-lab-guide',
};

const ICON_MAP = {
  'COMPLETE GUIDE TO DIGITIZATION': Smartphone,
  'SETTING UP A SCHOOL IN INDIA': Building2,
  'PRODUCT CATALOG 2025': FileText,
  'HOW TO SETUP COMPOSITE SKILL LAB?': Zap,
  'LOOKBOOK – PLAY FURNITURE': Armchair,
  'GAMIFIED MATH RESOURCES': Calculator,
  'COMPLETED PROJECTS': CheckCircle2,
  '20 STUNNING SCHOOL DESIGN IDEAS': Palette,
  'LIBRARY TRENDS': Library,
};

const ClassifiedsGrid = () => {
    const trending = [
        "Schools for Sale / Lease",
        "Fundraising",
        "Partnerships",
        "Workshops"
    ];

    const resources = [
        "Setup School in India",
        "Digitization Guide",
        "Product Catalog 2025",
        "Skill Lab Guide"
    ];

    const renderItems = (items, type) => {
        return items.map((item, i) => {
            const upperLabel = item.toUpperCase();
            let path = '/p/' + item.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            Object.keys(PATH_MAP).forEach(k => {
                if (upperLabel.includes(k)) path = PATH_MAP[k];
            });
            const ItemIcon = ICON_MAP[upperLabel] || FileText;

            return (
                <Link
                    key={i}
                    to={path}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm-blue shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                            <ItemIcon size={18} />
                        </div>
                        <span className="text-[13px] font-black uppercase tracking-tight text-gray-700">
                            {item}
                        </span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-sm-blue group-hover:translate-x-1 transition-all" />
                </Link>
            );
        });
    };

    return (
        <section className="py-8 px-4 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Trending Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6 border-b-2 border-sm-blue pb-3">
                            <TrendingUp className="text-sm-blue" size={24} />
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Trending</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {renderItems(trending, 'trending')}
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6 border-b-2 border-orange-500 pb-3">
                            <FileText className="text-orange-500" size={24} />
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Resources</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {renderItems(resources, 'resources')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClassifiedsGrid;
