const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const outputPath = path.join(__dirname, '../anti-doomscroll-extension.zip');

// Remove existing zip file if it exists
rimraf.sync(outputPath);

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function () {
  console.log('Data has been drained');
});

archive.on('warning', function (err) {
  if (err.code !== 'ENOENT') {
    throw err;
  }
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);

// Add files and directories to the archive
archive.directory('dist/', 'dist');
archive.directory('icons/', 'icons');
archive.directory('src/', 'src');
archive.directory('_locales/', '_locales');
archive.file('manifest.json', { name: 'manifest.json' });
archive.file('tsconfig.json', { name: 'tsconfig.json' });
archive.file('package.json', { name: 'package.json' });
archive.file('README.md', { name: 'README.md' });
archive.file('LICENSE', { name: 'LICENSE' });

archive.finalize();
