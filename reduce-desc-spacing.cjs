const fs = require('fs');
const path = require('path');
const files = [
  'Furniture.jsx',
  'Architecture.jsx',
  'DigitalInfra.jsx',
  'SchoolDesigns.jsx',
  'Libraries.jsx',
  'Sports.jsx',
  'Mathematics.jsx',
  'Science.jsx',
  'LabsLibraries.jsx'
];

let changed = 0;
files.forEach(f => {
  const p = path.join('d:/SchoolMart/src/pages', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    const newContent = content.replace(
      'className="py-8 mb-4 border-b border-gray-100 max-w-5xl"',
      'className="pb-6 border-b border-gray-100 max-w-5xl"' // drastical spacing reduction
    );
    
    if (content !== newContent) {
      fs.writeFileSync(p, newContent);
      console.log('Fixed spacing in', f);
      changed++;
    }
  }
});
console.log('Total files changed:', changed);
