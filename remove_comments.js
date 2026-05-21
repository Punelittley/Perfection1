const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);

function stripComments(content, ext) {
  
  content = content.replace(/\/\*[\s\S]*?\*\
  
  content = content.replace(
  
  if (ext !== '.html') {
    content = content.replace(/\/\/.*$/gm, '');
  }
  return content;
}

function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.js', '.html', '.css', '.json'].includes(ext)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const stripped = stripComments(content, ext);
  if (original !== stripped) {
    fs.writeFileSync(filePath, stripped, 'utf8');
    console.log('Stripped comments from', filePath);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

walk(ROOT);
