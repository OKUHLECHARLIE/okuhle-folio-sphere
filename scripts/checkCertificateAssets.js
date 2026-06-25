const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'routes', 'index.tsx'), 'utf8');
const assetFiles = fs.readdirSync(path.join(__dirname, '..', 'src', 'assets')).filter(f => /\.(pdf|jpe?g|png)$/i.test(f));
const regex = /asset: "([^"]+)"/g;
const assets = [];
let m;
while ((m = regex.exec(content))) {
  assets.push(m[1]);
}
const assetSet = new Set(assetFiles.map(f => f.toLowerCase()));
const missing = assets.filter(a => !assetSet.has(a.toLowerCase()));
console.log('declared assets:', assets.length);
console.log('actual asset files:', assetFiles.length);
console.log('missing assets:', missing.length);
missing.forEach(x => console.log(x));
console.log('--- actual asset files ---');
assetFiles.sort().forEach(x => console.log(x));
