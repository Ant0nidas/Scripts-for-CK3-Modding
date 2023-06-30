const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('error.log')
});

const variable_errors = [];

rl.on('line', (line) => {
    let match = line.match(/Variable '(.+?)' is set but/);
    if (match) {
        variable_errors.push(match[1]);
    }

    match = line.match(/Variable '(.+?)' is used but/);
    if (match) {
        variable_errors.push(match[1]);
    }
	
	match = line.match(/Event target '(.+?)' is used but/);
    if (match) {
        variable_errors.push(match[1]);
    }
	
	match = line.match(/Flag '(.+?)' is set but/);
    if (match) {
        variable_errors.push(match[1]);
    }
});

rl.on('close', () => {
    let data = `namespace = CMH_decision_error_supression

CMH_decision_error_suppression.0001 = {
    hidden = yes
    orphan = yes

    immediate = {\n`;

    variable_errors.forEach(variable => {
        data += `        fix_variable_error = {ERROR = ${variable}}\n`;
    });

    data += '    }\n}';

    const dir = path.join(__dirname, 'events');

    fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
        
        fs.writeFile(path.join(dir, 'CMH_error_suppression.txt'), '\ufeff' + data, { encoding: 'utf8' }, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('File written successfully');
            }
        });
    });
});
