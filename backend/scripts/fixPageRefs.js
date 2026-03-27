// backend/scripts/fixPageRefs.js
// Fix all catalog pages to use work.name (DB field) instead of work.title (old static data field)
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../../app/src/pages');

const targets = ['Architecture.jsx', 'DigitalInfra.jsx', 'Libraries.jsx', 'LabsLibraries.jsx', 'Sports.jsx', 'SchoolDesigns.jsx', 'Furniture.jsx'];

let changes = 0;

for (const file of targets) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) continue;
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;

  // Fix selectedItem comparisons using work.title -> work.name
  content = content.replace(/selectedItem\?\.title === work\.title/g, 'selectedItem?.name === work.name');
  content = content.replace(/selectedItem\?\.title === work\.title/g, 'selectedItem?.name === work.name');
  content = content.replace(/selectedItem\?\.t === work\.t/g, 'selectedItem?.name === work.name');
  
  // Fix selectedItem toggle logic
  content = content.replace(/selectedItem\?\.title === work\.title \? null : work/g, 'selectedItem?.name === work.name ? null : work');
  content = content.replace(/selectedItem\?\.t === work\.t \? null : work/g, 'selectedItem?.name === work.name ? null : work');
  
  // Fix inline expansion slice comparisons
  content = content.replace(/\.some\(dw => dw\.title === selectedItem\?\.title\)/g, '.some(dw => dw.name === selectedItem?.name)');
  content = content.replace(/\.some\(dw => dw\.t === selectedItem\?\.t\)/g, '.some(dw => dw.name === selectedItem?.name)');
  content = content.replace(/dw\.title === selectedItem\?\.title/g, 'dw.name === selectedItem?.name');
  content = content.replace(/dw\.t === selectedItem\?\.t/g, 'dw.name === selectedItem?.name');
  
  // Fix work.title in image alt and card text since it doesnt exist on DB model
  content = content.replace(/alt=\{work\.title\}/g, 'alt={work.name}');
  content = content.replace(/alt=\{work\.t\}/g, 'alt={work.name}');
  content = content.replace(/>\{work\.title\}</g, '>{work.name}<');
  content = content.replace(/>\{work\.t\}</g, '>{work.name}<');
  
  // Fix selectedItem.title comparisons at top of card compare
  content = content.replace(/selectedItem\?\.title === item\.name/g, 'selectedItem?.name === item.name');
  
  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log(`✅ Fixed ${file}`);
    changes++;
  } else {
    console.log(`ℹ️ No changes needed in ${file}`);
  }
}
console.log(`Done! Fixed ${changes} files.`);
process.exit();
