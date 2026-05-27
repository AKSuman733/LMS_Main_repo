const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (file.endsWith('.jsx')) {
        filelist.push(dir + '/' + file);
      }
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let imports = [];
  
  if (content.includes('useState')) imports.push('useState');
  if (content.includes('useEffect')) imports.push('useEffect');
  if (content.includes('createContext')) imports.push('createContext');
  if (content.includes('useContext')) imports.push('useContext');
  
  if (imports.length > 0) {
    const importStr = `import { ${imports.join(', ')} } from 'react';\n`;
    fs.writeFileSync(file, importStr + content);
  }
});
