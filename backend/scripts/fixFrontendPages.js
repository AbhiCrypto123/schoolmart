// backend/scripts/fixFrontendPages.js
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../../app/src/pages');

// Only the 9 pages + maybe some others that share the same issue, we can just scan all
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const replaces = [
  { pattern: /work\.images\?\\.\[0\]/g, replace: 'work.image' },
  { pattern: /item\.images\?\\.\[0\]/g, replace: 'item.image' },
  { pattern: /\$\{work\.h\}/g, replace: 'h-[300px]' }, // Replace dynamic height with static masonry fallback
  { pattern: /\$\{item\.h\}/g, replace: 'h-[300px]' },
  { pattern: /\$\{work\.height\}/g, replace: 'h-[300px]' },
  { pattern: /\$\{item\.height\}/g, replace: 'h-[300px]' },
];

let totalChanges = 0;

for (const file of files) {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');
  let original = content;

  for (const { pattern, replace } of replaces) {
    // Note: because the literal string in JSX is usually `(work.images?.[0])`
    // but the regex deals with exact strings, I'll use a simpler replace
    // Actually the safest way is string replace since they are exact occurrences.
  }

  // Use raw string replacements because JSX string literals can have weird spacing
  content = content.replace(/\(work\.images\?\.\[0\]\)/g, '(work.image || "")');
  content = content.replace(/\(item\.images\?\.\[0\]\)/g, '(item.image || "")');
  content = content.replace(/\$\{work\.h\}/g, 'min-h-[300px]');
  content = content.replace(/\$\{item\.h\}/g, 'min-h-[300px]');
  content = content.replace(/\$\{work\.height\}/g, 'min-h-[300px]');
  content = content.replace(/\$\{item\.height\}/g, 'min-h-[300px]');

  if (content !== original) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log(`✅ Fixed ${file}`);
    totalChanges++;
  }
}

console.log(`Done! Fixed ${totalChanges} files.`);
process.exit();
