const fs = require('fs');
const path = require('path');

const draftPath = path.join(__dirname, '..', 'draft_article.json');
const logPath = path.join(__dirname, 'fix_log.txt');
const logs = [];

let raw = fs.readFileSync(draftPath, 'utf8');
logs.push('File length: ' + raw.length);
logs.push('Snippet [3700-3850]: ' + JSON.stringify(raw.slice(3700, 3850)));

// Fix: escape bare control characters inside JSON string values
let fixed = raw.replace(
  /"((?:[^"\\]|\\.)*)"/gs,
  (_match, inner) => {
    const result = inner
      .replace(/\r\n/g, '\\n')
      .replace(/\r/g, '\\n')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t');
    return `"${result}"`;
  }
);

try {
  const parsed = JSON.parse(fixed);
  logs.push('Fixed JSON is VALID! Title: ' + parsed.title);
  fs.writeFileSync(draftPath, JSON.stringify(parsed, null, 2), 'utf8');
  logs.push('Saved fixed draft_article.json');
} catch(e) {
  logs.push('Still invalid: ' + e.message);
  const errPos = parseInt((e.message.match(/position (\d+)/) || [])[1] || '0');
  logs.push('Error pos snippet: ' + JSON.stringify(fixed.slice(Math.max(0, errPos - 120), errPos + 120)));
}

fs.writeFileSync(logPath, logs.join('\n'), 'utf8');
