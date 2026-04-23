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
    const regex = /className="grid\s+grid-cols-1\s+md:grid-cols-2\s+lg:grid-cols-3\s+gap-(\d+)([^"]*)"/g;
    const newContent = content.replace(regex, (match, gap, rest) => {
      // Safest is to just replace the grid props.
      return `className="columns-1 md:columns-2 lg:columns-3 gap-${gap}${rest.replace(' items-start', '')}"`;
    });
    if (content !== newContent) {
      fs.writeFileSync(p, newContent);
      console.log('Updated', f);
      changed++;
    }
  } else {
      console.log('Missed', f);
  }
});
console.log('Total changed:', changed);
