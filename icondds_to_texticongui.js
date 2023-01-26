const fs = require('fs');
const path = require('path');

const folderPath = path.resolve("YOUR FULL PATH HERE");
const textContent = fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.dds'))
    .map(file => {
        const fileName = file.split('.')[0];
        return `texticon = {
    icon = ${fileName}_icon
    iconsize = {
        texture = "gfx/interface/icons/regimenttypes/${fileName}.dds"
        size = { 25 25 }
        offset = { 0 6 }
        fontsize = 16
    }
}\n\n`;
    }).join('');
fs.writeFileSync(path.join(folderPath, `texticon.gui`), textContent);