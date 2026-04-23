const fs = require('fs');

let content = fs.readFileSync('src/pages/Furniture.jsx', 'utf-8');
content = content.replace(/<button[^>]*onClick=\{\(\) => \{ if\(heroBlock\.ctaPath\) window\.location\.href = heroBlock\.ctaPath \}\}[^>]*>[\s\S]*?<\/button>/, '');
fs.writeFileSync('src/pages/Furniture.jsx', content, 'utf-8');
