const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk('c:\\OwnFrontend\\src', (err, results) => {
  if (err) throw err;
  const targetFiles = results.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
  
  targetFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Primary Color Replacements (Blue/Indigo -> Orange)
    content = content.replace(/blue-600/g, 'brand-orange');
    content = content.replace(/blue-700/g, 'brand-orange-dark');
    content = content.replace(/blue-500/g, 'brand-orange');
    content = content.replace(/blue-400/g, 'brand-orange-light');
    content = content.replace(/blue-300/g, 'brand-orange-light');
    content = content.replace(/blue-100/g, 'orange-100');
    content = content.replace(/blue-50/g, 'orange-50');
    content = content.replace(/blue-800/g, 'orange-800');
    content = content.replace(/blue-900/g, 'orange-900');
    
    content = content.replace(/indigo-600/g, 'brand-orange');
    content = content.replace(/indigo-700/g, 'brand-orange-dark');
    content = content.replace(/indigo-500/g, 'brand-orange');

    // Secondary Color Replacements (Purple/Pink -> Teal)
    content = content.replace(/purple-600/g, 'brand-teal');
    content = content.replace(/purple-700/g, 'brand-teal-dark');
    content = content.replace(/purple-500/g, 'brand-teal');
    content = content.replace(/purple-400/g, 'brand-teal-light');
    content = content.replace(/purple-100/g, 'teal-100');
    content = content.replace(/purple-50/g, 'teal-50');

    content = content.replace(/pink-600/g, 'brand-teal');
    content = content.replace(/pink-700/g, 'brand-teal-dark');
    content = content.replace(/pink-500/g, 'brand-teal');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
  });
  console.log('Color replacement done!');
});
