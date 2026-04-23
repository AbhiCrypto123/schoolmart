const fs = require('fs');
const path = require('path');

const files = [
  'Sports.jsx',
  'Science.jsx',
  'SchoolDesigns.jsx',
  'Mathematics.jsx',
  'LabsLibraries.jsx',
  'Libraries.jsx',
  'Furniture.jsx',
  'DigitalInfra.jsx',
  'Architecture.jsx'
];

const targetPattern = /\{\/\*\s*PAGE DESCRIPTION EXTENSION\s*\*\/\}\s*\{heroBlock\.pageDescription\s*&&\s*\(\s*<section[\s\S]*?<\/section>\s*\)\}/g;

const replacement = `{/* PAGE DESCRIPTION EXTENSION */}
        {heroBlock.pageDescription && (
           <section 
             className={heroBlock.pageDescriptionBgColor ? 'px-6 py-4 md:px-8 md:py-5 mb-6 rounded-[30px] text-center w-full shadow-sm border-0' : 'pb-6 border-b border-gray-100 max-w-5xl'}
             style={{ backgroundColor: heroBlock.pageDescriptionBgColor || 'transparent' }}
           >
              <p 
                className={\`\${heroBlock.pageDescriptionBgColor ? 'text-[15px] md:text-lg font-bold' : 'text-gray-600 font-medium text-[14px] md:text-[15px]'} leading-snug whitespace-pre-wrap max-w-4xl mx-auto\`}
                style={{ color: heroBlock.pageDescriptionTextColor || undefined }}
              >
                 {heroBlock.pageDescription}
              </p>
           </section>
        )}`;

for (const file of files) {
  const filePath = path.join('d:/SchoolMart/src/pages', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Manual replacement to be extremely safe
    const startIndex = content.indexOf('{/* PAGE DESCRIPTION EXTENSION */}');
    if (startIndex !== -1) {
      let endIndex = content.indexOf(')}', startIndex);
      if (endIndex !== -1) {
        endIndex += 2; // include the ')}'
        const oldBlock = content.substring(startIndex, endIndex);
        content = content.replace(oldBlock, replacement);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
      }
    } else {
      console.log(`Pattern not found in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
