const fs = require('fs');
const path = require('path');

const PAGES = [
  { file: 'Furniture.jsx', slug: 'furniture', cat: 'Furniture', arr: 'products', titleProp: 'name' },
  { file: 'Architecture.jsx', slug: 'architecture', cat: 'School Architecture', arr: 'portfolio', titleProp: 'title' },
  { file: 'DigitalInfra.jsx', slug: 'digital', cat: 'Digital Infrastructure', arr: 'techItems', titleProp: 'title' },
  { file: 'Sports.jsx', slug: 'sports', cat: 'Sports Infrastructure', arr: 'sportsFacilities', titleProp: 'title' },
  { file: 'Libraries.jsx', slug: 'libraries', cat: 'Libraries', arr: 'libraryItems', titleProp: 'title' },
  { file: 'Science.jsx', slug: 'science', cat: 'Science', arr: 'scienceProducts', titleProp: 'name' },
  { file: 'SchoolDesigns.jsx', slug: 'design', cat: 'School Designs', arr: 'designConcepts', titleProp: 'title' },
  { file: 'Mathematics.jsx', slug: 'mathematics', cat: 'Mathematics', arr: 'mathProducts', titleProp: 'name' },
  { file: 'LabsLibraries.jsx', slug: 'labs', cat: 'Composite Skill Labs', arr: 'labItems', titleProp: 'title' },
];

const dir = path.join(__dirname, '../app/src/pages');

PAGES.forEach(page => {
  const filePath = path.join(dir, page.file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${page.file} - not found`);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf-8');

  // 1. Imports
  if (!code.includes('useCMSPage')) {
    code = code.replace(/import React, \{ useState \} from 'react';/, 
      `import React, { useState, useEffect } from 'react';\nimport { useCMSPage } from '../hooks/useCMSBlock';\nimport { getProducts } from '../services/api';`);
  }

  // 2. Remove hardcoded array
  const arrRegex = new RegExp(`const ${page.arr} = \\[([\\s\\S]*?)\\];\\s*`, 'g');
  code = code.replace(arrRegex, '');

  // 3. Inject State and Filter logic
  const componentStartRegex = new RegExp(`const ${page.file.replace('.jsx', '')} = \\(\\) => \\{\\s*const \\[selectedItem, setSelectedItem\\] = useState\\(null\\);`);
  const injectState = `const ${page.file.replace('.jsx', '')} = () => {
  const { blocks, loading } = useCMSPage('${page.slug}');
  const [items, setItems] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getProducts({ category: '${page.cat}' }).then(res => {
      setItems(res || []);
    });
  }, []);

  useEffect(() => {
    const cats = blocks?.sidebar_categories?.categories || [];
    if (cats.length > 0 && !selectedCat) {
      setSelectedCat(cats[0]);
    }
  }, [blocks, selectedCat]);

  const cats = blocks?.sidebar_categories?.categories || [];
  const filteredItems = items.filter(p => !selectedCat || p.subcategory === selectedCat);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading ${page.cat}...</div>;
`;
  code = code.replace(componentStartRegex, injectState);

  // 4. Update Sidebar map
  // Finds `{['...'].map((cat, i) => (`
  const sidebarRegex = /\{\['.*?'\]\.map\(\(cat, i\) => \(/;
  code = code.replace(sidebarRegex, `{cats.length > 0 ? cats.map((cat, i) => (`);

  // 5. Update Sidebar button active state and add onClick
  // Finds `<button key={i} className={`... ${i === 0 ? '...' : '...'}...`}>`
  const btnClassRegex = /<button key=\{i\} className=\{`([^`]*) \$\{i === 0 \? '([^']+)' \: '([^']+)'\}([^`]*)`\}>/g;
  code = code.replace(btnClassRegex, `<button key={i} onClick={() => setSelectedCat(cat)} className={\`$1 \$\{selectedCat === cat ? '$2' : '$3'}$4\`}>`);
  
  // Close the ternary for cats.map if needed (Wait, if cats length is 0, we can fallback, but actually cats.map alone is fine if we replace correctly).
  const sidebarFallbackFix = /\{\['.*?'\]\.map\(\(cat, i\) => \(/;
  // Let's just use `{cats.map((cat, i) => (` instead of ternary.
  code = code.replace(/\{cats\.length > 0 \? cats\.map\(\(cat, i\) => \(/, `{cats.map((cat, i) => (`);

  // 6. Replace array maps and references
  // ${page.arr}.map => filteredItems.map
  code = code.split(`${page.arr}.map`).join('filteredItems.map');
  code = code.split(`${page.arr}.length`).join('filteredItems.length');
  code = code.split(`${page.arr}.slice`).join('filteredItems.slice');
  
  // Ensure we replace item.badge -> item.isFeatured ? 'Featured' : '' etc, but the properties match mostly.
  // We'll replace item.img -> (item.images?.[0] || 'https://via.placeholder.com/800')
  code = code.split('item.img').join('(item.images?.[0])');
  code = code.split('work.img').join('(work.images?.[0])');

  // Let's replace item.cat or work.cat with item.subcategory
  code = code.split('item.category').join('item.subcategory');
  code = code.split('work.cat').join('work.subcategory');

  fs.writeFileSync(filePath, code);
  console.log(`Updated ${page.file}`);
});
