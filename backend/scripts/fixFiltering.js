// backend/scripts/fixFiltering.js
// Fix the subcategory filtering in all 9 catalog frontend pages
// Issues to fix:
// 1. Filter must be case-insensitive: p.subcategory.toUpperCase() === selectedCat.toUpperCase()
// 2. selectedCat initialization must trigger on cats load
// 3. All work.title / work.t references in card text must be work.name

const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../../app/src/pages');

const targets = [
  'Furniture.jsx',
  'Architecture.jsx',
  'DigitalInfra.jsx',
  'SchoolDesigns.jsx',
  'Libraries.jsx',
  'Sports.jsx',
  'Mathematics.jsx',
  'Science.jsx',
  'LabsLibraries.jsx',
];

let totalFixes = 0;

for (const file of targets) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`⚠️ Not found: ${file}`); continue; }
  
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;

  // Fix 1: Make filter case-insensitive
  c = c.replace(
    /items\.filter\(p => !selectedCat \|\| p\.subcategory === selectedCat\)/g,
    `items.filter(p => !selectedCat || (p.subcategory || '').toUpperCase() === selectedCat.toUpperCase())`
  );
  
  // Fix 2: Make sure selectedCat useEffect doesn't depend on selectedCat (avoids re-running issue)
  // Pattern: useEffect(() => { const cats = ...; if (cats.length > 0 && !selectedCat) { setSelectedCat(cats[0]); } }, [blocks, selectedCat]);
  // Replace with version that forces first cat select without selectedCat in deps
  c = c.replace(
    /useEffect\(\(\) => \{\n\s+const cats = blocks\?\.sidebar_categories\?\.categories \|\| \[\];\n\s+if \(cats\.length > 0 && !selectedCat\) \{\n\s+setSelectedCat\(cats\[0\]\);\n\s+\}\n\s+\}, \[blocks, selectedCat\]\);/g,
    `useEffect(() => {
    const cats = blocks?.sidebar_categories?.categories || [];
    if (cats.length > 0) {
      setSelectedCat(cats[0]);
    }
  }, [blocks]);`
  );

  // Fix 3: Any remaining work.title in text display (not in alt tags - those already fixed)
  // This catches things like {work.title} in h3 tags etc
  c = c.replace(/\{work\.title\}/g, '{work.name || work.title}');
  c = c.replace(/\{work\.t\}/g, '{work.name || work.t}');
  c = c.replace(/\{item\.title\}/g, '{item.name || item.title}');

  if (c !== orig) {
    fs.writeFileSync(fp, c, 'utf8');
    console.log(`✅ Patched ${file}`);
    totalFixes++;
  } else {
    console.log(`ℹ️  No changes: ${file}`);
  }
}
console.log(`\nDone! Patched ${totalFixes} files.`);
process.exit();
