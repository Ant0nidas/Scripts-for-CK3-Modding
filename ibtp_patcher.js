const fs = require('fs');
const path = require('path');

const outputDirName = 'output';

// Function that scans and modifies .txt files recursively
function scanAndModifyFiles(currentPath, outputPath) {
    const dir = fs.readdirSync(currentPath, { withFileTypes: true });

    dir.forEach((dirent) => {
        const fullPath = path.join(currentPath, dirent.name);
        const fullOutputPath = path.join(outputPath, dirent.name);

        if (dirent.isDirectory() && dirent.name !== outputDirName) {
            // If the dirent is a directory (and not the output directory), recursively call this function for that directory
            scanAndModifyFiles(fullPath, fullOutputPath);
        } else if (path.extname(dirent.name) === '.txt') {
            // If the dirent is a .txt file, modify it and write it to the output directory
            const data = fs.readFileSync(fullPath, 'utf-8').split('\n');
            const newData = [];
            let hasNewLineAdded = false;  // Flag to check if a new line has been added

            data.forEach(line => {
                newData.push(line);

                if (line.includes('drylands')) {
                    const newLine = line.replace('drylands', 'savanna');
                    newData.push(newLine);
                    hasNewLineAdded = true;
                }

                if (line.includes('hills')) {
                    const newLine = line.replace('hills', 'dry_hills');
                    newData.push(newLine);
                    hasNewLineAdded = true;
                }

                if (line.includes('taiga')) {
                    const newLine = line.replace('taiga', 'high_boreal');
                    newData.push(newLine);
                    hasNewLineAdded = true;
                }
            });

            // Only write to the output file if a new line has been added
            if (hasNewLineAdded) {
                fs.mkdirSync(outputPath, { recursive: true });  // Create the output directory only if a new line has been added
                const newFile = path.join(outputPath, path.basename(dirent.name, '.txt') + '_ibl.txt');
                fs.writeFileSync(newFile, newData.join('\n'), 'utf-8');
            }
        }
    });
}

// Call the function for the current directory
const currentDir = __dirname;
const outputDir = path.join(currentDir, outputDirName);

scanAndModifyFiles(currentDir, outputDir);
