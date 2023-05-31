const fs = require('fs');
const path = require('path');

// Get all .txt files in the current directory
const files = fs.readdirSync(__dirname).filter(file => path.extname(file) === '.txt');

files.forEach(file => {
    const data = fs.readFileSync(file, 'utf-8').split('\n');
    const newData = [];

    data.forEach(line => {
        newData.push(line);

        if (line.includes('drylands = {')) {
            const newLine = line.replace('drylands', 'savanna');
            newData.push(newLine);
        }

        if (line.includes('hills = {')) {
            const newLine = line.replace('hills', 'dry_hills');
            newData.push(newLine);
        }

        if (line.includes('taiga = {')) {
            const newLine = line.replace('taiga', 'high_boreal');
            newData.push(newLine);
        }
    });

    const newFile = path.join(__dirname, path.basename(file, '.txt') + '_ibl.txt');
    fs.writeFileSync(newFile, newData.join('\n'), 'utf-8');
});
