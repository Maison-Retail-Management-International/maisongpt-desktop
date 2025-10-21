// .github/scripts/pin-tauri.js
const fs = require('fs');
const path = require('path');

function walk(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(entryPath));
    } else {
      out.push(entryPath);
    }
  }
  return out;
}

const target = 'node_modules/pake-cli';
if (!fs.existsSync(target)) {
  console.error(`ERROR: ${target} not found. Make sure 'npm install pake-cli@latest' succeeded and produced node_modules.`);
  process.exit(1);
}

const files = walk(target);

for (const file of files) {
  try {
    if (file.endsWith('package.json')) {
      const json = JSON.parse(fs.readFileSync(file, 'utf8'));
      let changed = false;
      if (json.dependencies && json.dependencies['@tauri-apps/api']) {
        json.dependencies['@tauri-apps/api'] = '2.9.0';
        changed = true;
      }
      if (json.devDependencies && json.devDependencies['@tauri-apps/api']) {
        json.devDependencies['@tauri-apps/api'] = '2.9.0';
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(file, JSON.stringify(json, null, 2));
        console.log('patched', file);
      }
    }
    if (path.basename(file) === 'Cargo.toml') {
      let contents = fs.readFileSync(file, 'utf8');
      contents = contents.replace(/(^\s*tauri\s*=\s*"[^\"]+")/m, 'tauri = "2.9.0" ');
      contents = contents.replace(/version\s*=\s*"[^\"]+"/g, 'version = "2.9.0" ');
      fs.writeFileSync(file, contents);
      console.log('patched', file);
    }
  } catch (error) {
    console.error('Error processing', file, error && error.stack ? error.stack : error);
    process.exit(1);
  }
}

console.log('Pinning complete');
