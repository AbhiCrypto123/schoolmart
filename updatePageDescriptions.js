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

const targetPattern = /\{\/\*\s*PAGE DESCRIPTION EXTENSION\s*\*\/\}\s*\{heroBlock\.pageDescription\s*&&\s*\(\s*<section className="pb-6 border-b border-gray-100 max-w-5xl">\s*<p className="text-gray-600 font-medium text-\[14px\] md:text-\[15px\] leading-relaxed whitespace-pre-wrap">\s*\{heroBlock\.pageDescription\}\s*<\/p>\s*<\/section>\s*\)\}/g;

const replacement = `{/* PAGE DESCRIPTION EXTENSION */}
        {heroBlock.pageDescription && (
           <section 
             className={\`pb-6 \${heroBlock.pageDescriptionBgColor ? 'p-6 md:p-10 mb-8 rounded-[40px] text-center w-full shadow-lg border-0' : 'border-b border-gray-100 max-w-5xl'}\`}
             style={{ backgroundColor: heroBlock.pageDescriptionBgColor || 'transparent' }}
           >
              <p 
                className={\`\${heroBlock.pageDescriptionBgColor ? 'text-lg md:text-xl font-bold' : 'text-gray-600 font-medium text-[14px] md:text-[15px]'} leading-relaxed whitespace-pre-wrap max-w-4xl mx-auto\`}
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
    if (targetPattern.test(content)) {
      content = content.replace(targetPattern, replacement);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`Pattern not found in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
