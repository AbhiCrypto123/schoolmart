import React from 'react';
import { Sparkles } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative group">
        {/* Glowing Background */}
        <div className="absolute inset-0 bg-sm-blue/20 rounded-full blur-[60px] animate-pulse scale-150" />
        
        {/* Core Icon */}
        <div className="relative w-24 h-24 bg-gray-900 rounded-[30px] flex items-center justify-center shadow-2xl transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
          <Sparkles className="text-sm-blue w-12 h-12 animate-pulse" />
        </div>
      </div>
      
      {/* Text Sequence */}
      <div className="mt-12 text-center space-y-3">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Initializing Campus</h2>
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-sm-blue animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1 h-1 rounded-full bg-sm-blue animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1 h-1 rounded-full bg-sm-blue animate-bounce" />
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pt-4">Synchronizing CMS Sovereignty</p>
      </div>

      {/* Edge Accents */}
      <div className="absolute top-10 left-10 w-px h-20 bg-gradient-to-b from-sm-blue/50 to-transparent" />
      <div className="absolute bottom-10 right-10 w-px h-20 bg-gradient-to-t from-sm-blue/50 to-transparent" />
    </div>
  );
};

export default PageLoader;
