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

const blockToInsert = `
        {/* PAGE DESCRIPTION EXTENSION */}
        {heroBlock.pageDescription && (
           <section className="py-8 mb-4 border-b border-gray-100 max-w-5xl">
              <p className="text-gray-600 font-medium text-[14px] md:text-[15px] leading-relaxed whitespace-pre-wrap">
                 {heroBlock.pageDescription}
              </p>
           </section>
        )}
`;

let changed = 0;
files.forEach(f => {
  const p = path.join('d:/SchoolMart/src/pages', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // Safety check - avoid double inserting
    if (content.includes('{/* PAGE DESCRIPTION EXTENSION */}')) {
      return;
    }

    // Usually the comment starts with {/* CATEGORY NAV
    // We will just replace it by inserting the block right before it.
    const splitToken = '{/* CATEGORY NAV';
    if (content.includes(splitToken)) {
      const parts = content.split(splitToken);
      const newContent = parts[0] + blockToInsert + '\n        ' + splitToken + parts[1];
      fs.writeFileSync(p, newContent);
      console.log('Successfully updated', f);
      changed++;
    } else {
      console.log('SPLIT TOKEN NOT FOUND IN', f);
    }
  }
});
console.log('Total files changed:', changed);
