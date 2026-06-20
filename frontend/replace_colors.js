const fs = require('fs');
const path = require('path');

const directory = '/Users/rajthakur/Desktop/UptoProject/frontend/src';

const replacements = [
  { regex: /#8b5cf6/gi, replacement: 'var(--primary-color)' }, // Replace purple with primary
  { regex: /#ec4899/gi, replacement: 'var(--secondary-color)' }, // Replace pink with secondary
  { regex: /rgba\(139,\s*92,\s*246/gi, replacement: 'rgba(255, 107, 53' }, // Replace purple rgb with primary rgb
  { regex: /rgba\(236,\s*72,\s*153/gi, replacement: 'rgba(0, 181, 165' }, // Replace pink rgb with secondary rgb
  { regex: /linear-gradient\(135deg,\s*#8b5cf6,\s*#ec4899\)/gi, replacement: 'var(--primary-gradient)' },
  { regex: /linear-gradient\(90deg,\s*#8b5cf6,\s*#ec4899\)/gi, replacement: 'var(--primary-gradient)' },
  { regex: /linear-gradient\(135deg,\s*#8b5cf6,\s*#6d28d9\)/gi, replacement: 'var(--primary-gradient)' },
  { regex: /linear-gradient\(135deg,\s*#ec4899,\s*#be185d\)/gi, replacement: 'var(--primary-gradient)' }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(directory);
let updatedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  replacements.forEach(r => {
    newContent = newContent.replace(r.regex, r.replacement);
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    updatedFiles++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Finished. Updated ${updatedFiles} files.`);
