import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { formatImgUrl } from '../utils/formatters';

const CatalogueCard = ({ work, isSelected, onClick, themeColor = 'bg-emerald-600', ringColor = 'ring-emerald-500', textColor = 'text-emerald-400' }) => {
  return (
    <div className="group">
      <div 
        className={`relative overflow-hidden rounded-[30px] border border-gray-100 group cursor-pointer aspect-[4/5] transition-all duration-500 bg-white ${isSelected ? `ring-4 ${ringColor} shadow-2xl scale-[1.02]` : 'hover:scale-[1.01] hover:shadow-lg'}`}
        onClick={onClick}
      >
        <div className="flex flex-col h-full">
          {/* Image Container - Full Coverage */}
          <div className="flex-[3] w-full bg-white relative overflow-hidden flex items-center justify-center">
            <img 
              src={formatImgUrl(work.image || work.images?.[0] || work.img || "")} 
              alt={work.name || work.title} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
            />
          </div>
          
          {/* Content Area - Clean and Minimal */}
          <div className="flex-[1] px-6 pb-6 flex flex-col justify-end bg-white border-t border-gray-50/50">
             {work.subcategory && (
               <span className={`text-[9px] ${textColor} font-extrabold tracking-widest uppercase mb-1`}>
                 {work.subcategory}
               </span>
             )}
             <h3 className="text-sm lg:text-base font-black text-gray-900 uppercase tracking-tighter leading-tight group-hover:text-sm-blue transition-colors">
               {work.name || work.title}
             </h3>
             <div className="flex items-center gap-2 mt-2">
               <div className="flex-grow h-[1px] bg-gray-100" />
               <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
                 Explore <ArrowRight size={10} className="text-gray-300" />
               </span>
             </div>
          </div>
        </div>
        
        {/* FLOATING ACTION ICON */}
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
          <div className={`w-8 h-8 rounded-full ${themeColor} shadow-xl flex items-center justify-center text-white`}>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogueCard;
