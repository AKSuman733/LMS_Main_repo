const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('/Users/rajthakur/Desktop/UptoProject/frontend/src/pages');

// These elements explicitly have dark/colored backgrounds so text-white should be preserved
const IGNORED_LINES = [
  'bg-primary-color',
  'bg-blue-',
  'bg-surface-color',
  'background:',
  'itemStyle={{color:',
  'rgba(139, 92, 246'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.split('\n').map(line => {
    // If it's on a colored background, skip replacement
    if (IGNORED_LINES.some(ignored => line.includes(ignored))) {
      return line;
    }

    // Replace text-white with text-primary
    line = line.replace(/text-white/g, 'text-primary');

    // Replace text-gray-XXX with text-secondary
    line = line.replace(/text-gray-\d{3}/g, 'text-secondary');
    
    // Replace hardcoded white in inline styles
    line = line.replace(/color:\s*['"](?:#fff|#ffffff|white)['"]/gi, "color: 'var(--text-primary)'");

    return line;
  }).join('\n');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
