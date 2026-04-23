const fs = require('fs');

let c = fs.readFileSync('src/pages/DigitalInfra.jsx', 'utf-8');

c = c.replace(
  '<div className="flex-grow bg-gray-50 rounded-[30px] p-8 flex flex-col justify-center border border-gray-100 shadow-sm relative overflow-hidden group min-h-[220px]">',
  '<div className="flex-grow rounded-[30px] p-8 flex flex-col justify-center border border-gray-100 shadow-sm relative overflow-hidden group min-h-[220px]" style={{ backgroundColor: heroBlock.bgColor || \'#f9fafb\' }}>'
);

c = c.replace(
  '<div className="px-3 py-1 bg-sm-blue text-white font-black rounded-full text-[11px] uppercase tracking-[0.2em] mb-4 w-fit relative z-10 scale-90 origin-left">',
  '<div className="px-3 py-1 text-white font-black rounded-full text-[11px] uppercase tracking-[0.2em] mb-4 w-fit relative z-10 scale-90 origin-left" style={{ backgroundColor: heroBlock.textColor || \'#003DCC\' }}>'
);

c = c.replace(
  '<h1 className="text-3xl lg:text-4xl font-black font-heading leading-tight mb-4 tracking-tighter text-gray-900 uppercase relative z-10" dangerouslySetInnerHTML',
  '<h1 className="text-3xl lg:text-4xl font-black font-heading leading-tight mb-4 tracking-tighter uppercase relative z-10" style={{ color: heroBlock.textColor || \'#111827\' }} dangerouslySetInnerHTML'
);

fs.writeFileSync('src/pages/DigitalInfra.jsx', c);
console.log('done');
