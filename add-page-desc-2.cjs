const fs = require('fs');
const path = require('path');
const files = [
  'Architecture.jsx',
  'Libraries.jsx',
  'Sports.jsx',
  'Mathematics.jsx',
  'Science.jsx'
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
    
    if (content.includes('{/* PAGE DESCRIPTION EXTENSION */}')) {
      return;
    }

    const firstSectionEnd = content.indexOf('</section>');
    if (firstSectionEnd !== -1) {
      const splitPos = firstSectionEnd + '</section>'.length;
      const newContent = content.substring(0, splitPos) + '\n' + blockToInsert + content.substring(splitPos);
      fs.writeFileSync(p, newContent);
      console.log('Successfully updated', f);
      changed++;
    } else {
      console.log('</section> NOT FOUND IN', f);
    }
  }
});
console.log('Total files changed:', changed);
