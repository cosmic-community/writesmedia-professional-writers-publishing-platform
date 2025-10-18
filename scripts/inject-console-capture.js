import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');

function injectScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('dashboard-console-capture.js')) {
    return; // Already injected
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  const headEndIndex = content.indexOf('</head>');
  
  if (headEndIndex !== -1) {
    const newContent = 
      content.slice(0, headEndIndex) +
      scriptTag +
      content.slice(headEndIndex);
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Injected console capture script into ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(distDir)) {
  console.log('Injecting console capture script into HTML files...');
  walkDir(distDir);
  console.log('Console capture script injection complete!');
} else {
  console.log('dist directory not found. Run build first.');
}