const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(filePath));
    } else { 
      if (file.endsWith('mermaid.min.js') || file.endsWith('mermaid.js')) {
        results.push(filePath);
      }
    }
  });
  return results;
};

const mermaidDir = path.join(__dirname, '..', 'node_modules', 'mermaid');
const logFile = path.join(__dirname, 'find_log.txt');
try {
  const matches = walk(mermaidDir);
  fs.writeFileSync(logFile, matches.join('\n'), 'utf8');
} catch (e) {
  fs.writeFileSync(logFile, 'Error: ' + e.message, 'utf8');
}
