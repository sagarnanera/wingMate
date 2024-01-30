const fs = require('fs');
const path = require('path');

const currentFile = path.basename(__filename);

const files = fs.readdirSync(__dirname);

files.forEach((file) => {
  if (file !== currentFile && file.endsWith('.js')) {
    const moduleName = file.replace('.js', '');
    exports[moduleName] = require(`./${file}`);
  }
});
