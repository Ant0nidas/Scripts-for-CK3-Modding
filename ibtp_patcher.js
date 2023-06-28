const fs = require('fs');
const path = require('path');

const outputDirName = 'output';
const ignoreDirNames = ['2227658180', '2416949291', '2490281800', '2995140947', 'gfx', 'map_data'];

function generateOutputPath(currentPath, basePath) {
    const baseComponents = basePath.split(path.sep);
    const currentComponents = currentPath.split(path.sep);

    const newPath = baseComponents;

    for (let i = baseComponents.length; i < currentComponents.length; i++) {
        if (!isNaN(currentComponents[i])) continue;  // skip over numeric path components
        newPath.push(currentComponents[i]);
    }

    return newPath.join(path.sep);
}

function scanAndModifyFiles(currentPath, outputPath) {
    if (ignoreDirNames.some(dirName => currentPath.includes(dirName))) return;

    const dir = fs.readdirSync(currentPath, { withFileTypes: true });

    dir.forEach((dirent) => {
        const fullPath = path.join(currentPath, dirent.name);

        if (dirent.isDirectory() && dirent.name !== outputDirName) {
            const fullOutputPath = generateOutputPath(path.join(outputPath, dirent.name), outputPath);
            scanAndModifyFiles(fullPath, fullOutputPath);
        } else if (path.extname(dirent.name) === '.txt') {
            const fullOutputPath = generateOutputPath(outputPath, outputPath);
            const data = fs.readFileSync(fullPath, 'utf-8').split('\n');
            const newData = [];
            let lineChangesCount = 0;

            data.forEach(line => {
                const forbiddenWords = ['texture', 'environment', 'background', 'graphical', 'text', 'desc'];
                const shouldIgnore = forbiddenWords.some(word => line.includes(word)) || line.trim().startsWith('#');

                newData.push(line);

                if (!shouldIgnore) {
                    if (line.includes('drylands')) {
                        const newLine = line.replace('drylands', 'savanna');
                        newData.push(newLine);
                        lineChangesCount += 1;
                    }

                    if (line.includes('hills')) {
                        const newLine = line.replace('hills', 'dry_hills');
                        newData.push(newLine);
                        lineChangesCount += 1;
                    }

                    if (line.includes('taiga')) {
                        const newLine = line.replace('taiga', 'high_boreal');
                        newData.push(newLine);
                        lineChangesCount += 1;
                    }
                }
            });

            if (lineChangesCount > 1) {
                fs.mkdirSync(fullOutputPath, { recursive: true });
                const fileNameSuffix = currentPath.includes('events') || currentPath.includes('holy_sites') ? '.txt' : '_ibtp.txt';
                const newFile = path.join(fullOutputPath, path.basename(dirent.name, '.txt') + fileNameSuffix);
                fs.writeFileSync(newFile, newData.join('\n'), 'utf-8');
            }
        }
    });
}

const currentDir = __dirname;
const outputDir = path.join(currentDir, outputDirName);

scanAndModifyFiles(currentDir, outputDir);
