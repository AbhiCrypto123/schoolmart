import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { formatImgUrl } from '../utils/formatters';

const CatalogueCard = ({ work, isSelected, onClick, onAction, actionText, themeColor = 'bg-[#004a8e]', ringColor = 'ring-blue-500', textColor = 'text-[#004a8e]', showExplore = true }) => {
  return (
    <div className="group">
      <div 
        className={`relative overflow-hidden rounded-[30px] border border-gray-100 group cursor-pointer aspect-[4/5] transition-all duration-500 bg-white ${isSelected ? `ring-4 ${ringColor} shadow-2xl scale-[1.02]` : 'hover:scale-[1.01] hover:shadow-lg'}`}
        onClick={onClick}
      >
        <div className="flex flex-col h-full">
          {/* Image Container */}
          <div className="aspect-square w-full bg-white relative overflow-hidden flex items-center justify-center">
            <img 
              src={formatImgUrl(work.image || work.images?.[0] || work.img || "")} 
              alt={work.name || work.title} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
            />
            {/* FLOATING ACTION ICON */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
               <div className={`w-8 h-8 rounded-full ${themeColor} shadow-xl flex items-center justify-center text-white`}>
                  <ArrowUpRight size={14} />
               </div>
            </div>
          </div>
          
          {/* Content Area - Clean and Minimal */}
          <div className="flex-[1.5] px-6 pb-6 pt-4 flex flex-col justify-between bg-white border-t border-gray-50/50">
             <div>
                {work.subcategory && (
                  <span className={`text-[9px] font-black tracking-[0.15em] uppercase block mb-1 leading-tight text-emerald-500`}>
                    {work.subcategory}
                  </span>
                )}
                <h3 className="text-[13px] lg:text-[15px] font-black text-gray-900 uppercase tracking-tighter leading-tight group-hover:text-sm-blue transition-colors mb-4">
                  {work.name || work.title}
                </h3>
             </div>
             
             <div className="flex items-center justify-between gap-2">
                {actionText && (
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       onAction && onAction(e);
                     }}
                     className={`px-5 py-2.5 ${themeColor} text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:brightness-110 transition-all shadow-md`}
                   >
                     {actionText}
                   </button>
                )}
                
                {showExplore && (
                   <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0 ml-auto">
                      Explore <ArrowRight size={10} className="text-gray-300" />
                   </span>
                )}
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CatalogueCard;
