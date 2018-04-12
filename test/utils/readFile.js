const fs = require('fs');
const path = require('path');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '..', filePath), 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

module.exports = readFile;
