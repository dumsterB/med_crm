const fs = require('node:fs');
const _path = require('node:path');
const glob = require('glob');

const files = glob.sync('src/**/*.locales.json', {});
files.forEach((path) => {
  const file = fs.readFileSync(path);
  const pathExcludeSrc = path.split('/').slice(1).join('/');
  const dirname = _path.dirname(pathExcludeSrc);

  fs.mkdirSync(`locales/${dirname}`, { recursive: true });
  fs.writeFileSync(`locales/${pathExcludeSrc}`, file);
});
