const fs = require('fs');
const path = require('path');

const dirs = ['src/pages', 'src/components'];

// Patterns to remove (only movement effects, not color/opacity changes)
const replacements = [
  // hover scale on cards/elements
  [/\s*hover:scale-\[[\d.]+\]/g, ''],
  [/\s*hover:scale-\d+/g, ''],
  [/\s*hover:-translate-y-\d+/g, ''],
  [/\s*hover:translate-y-\d+/g, ''],
  // group-hover scale on images/elements
  [/\s*group-hover:scale-\[[\d.]+\]/g, ''],
  [/\s*group-hover:scale-\d+/g, ''],
  [/\s*group-hover:scale-\d+\b/g, ''],
  // active scale (press effects)
  [/\s*active:scale-\d+/g, ''],
  // group-hover translate
  [/\s*group-hover:translate-x-\d+/g, ''],
  [/\s*group-hover:-translate-y-\d+/g, ''],
  // transform class when it paired with hover effects
];

let totalChanges = 0;

dirs.forEach(dir => {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.tsx'));
  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;

    replacements.forEach(([pattern, replacement]) => {
      content = content.replace(pattern, replacement);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${file}`);
      totalChanges++;
    }
  });
});

console.log(`\nDone. ${totalChanges} files updated.`);
