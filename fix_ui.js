const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) walk(dirPath, callback);
    else callback(dirPath);
  });
}

walk('/Users/rajankumarkarn/V2r/vision2realityy-1/src', (filePath) => {
  if (!filePath.match(/\.(tsx|ts|jsx|js)$/)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Remove will-change-transform
  content = content.replace(/ will-change-transform/g, '');
  content = content.replace(/will-change-transform /g, '');
  content = content.replace(/will-change-transform/g, '');

  // 2. Replace transition-all with transition
  content = content.replace(/transition-all/g, 'transition');

  // 3. Replace 100vh and 100svh with 100dvh
  content = content.replace(/100vh/g, '100dvh');
  content = content.replace(/100svh/g, '100dvh');

  // 4. Isolate backdrop filters (add 'isolate' class if not present on backdrop-blur elements)
  content = content.replace(/(class|className)="([^"]*backdrop-blur-[^"]*)"/g, (match, attr, classes) => {
    if (!classes.includes('isolate')) {
      return `${attr}="${classes} isolate"`;
    }
    return match;
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
});
