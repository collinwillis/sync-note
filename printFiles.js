import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

const excludeFiles = [
  'index.css',
  'main.tsx',
  'firebaseConfig.ts',
  'App.css',
  'socket.ts',
  'vite-env.d.ts',
];

const excludeDirs = ['styles', 'assets'];

function printFiles(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      // Skip excluded directories
      if (excludeDirs.includes(file) && fs.statSync(filePath).isDirectory()) {
        return;
      }

      // Skip excluded files
      if (excludeFiles.includes(file)) {
        return;
      }

      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(`Error stating file ${filePath}:`, err);
          return;
        }

        if (stat.isDirectory()) {
          printFiles(filePath); // Recursively print files in the directory
        } else {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error(`Error reading file ${filePath}:`, err);
              return;
            }

            console.log(`\n\n=== ${filePath} ===\n`);
            console.log(data);
          });
        }
      });
    });
  });
}

printFiles(srcDir);
