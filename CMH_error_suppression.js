const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('error.log')
});

const variable_errors = [];
const scope_errors = [];
const flag_errors = [];
const modifier_errors = [];

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
        scope_errors.push(match[1]);
    }

    match = line.match(/Flag '(.+?)' is set but/);
    if (match) {
        flag_errors.push(match[1]);
    }

    match = line.match(/Modifier '(.+?)' was not used/);
    if (match) {
        modifier_errors.push(match[1]);
    }
});

rl.on('close', () => {
    // Handling Variable Errors
    let variableData = `namespace = CMH_variable_error_suppression #credit to Tobbzn

CMH_variable_error_suppression.1 = {
    hidden = yes
    orphan = yes

    immediate = {\n`;

    variable_errors.forEach(variable => {
        variableData += `        fix_variable_error = {ERROR = ${variable}}\n`;
    });

    variableData += '    }\n}';

    const variableDir = path.join(__dirname, 'CMH Error Suppression','events');

    fs.mkdir(variableDir, { recursive: true }, (err) => {
        if (err) throw err;
        
        fs.writeFile(path.join(variableDir, 'CMH_variable_error_suppression.txt'), '\ufeff' + variableData, { encoding: 'utf8' }, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Variable error file written successfully');
            }
        });
    });

    // Handling Scope Errors
    let scopeData = `namespace = CMH_scope_error_suppression #credit to Tobbzn

CMH_scope_error_suppression.1 = {
    hidden = yes
    orphan = yes

    immediate = {\n`;

    scope_errors.forEach(scope => {
        scopeData += `        fix_scope_error = {ERROR = ${scope}}\n`;
    });

    scopeData += '    }\n}';

    const scopeDir = path.join(__dirname, 'CMH Error Suppression','events');

    fs.mkdir(scopeDir, { recursive: true }, (err) => {
        if (err) throw err;
        
        fs.writeFile(path.join(scopeDir, 'CMH_scope_error_suppression.txt'), '\ufeff' + scopeData, { encoding: 'utf8' }, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Scope error file written successfully');
            }
        });
    });

    // Handling Flag Errors
    let flagData = `namespace = CMH_flag_error_suppression #credit to Tobbzn

CMH_flag_error_suppression.1 = {
    hidden = yes
    orphan = yes

    immediate = {\n`;

    flag_errors.forEach(flag => {
        flagData += `        fix_variable_error = {ERROR = ${flag}}\n`;
    });

    flagData += '    }\n}';

    const flagDir = path.join(__dirname, 'CMH Error Suppression','events');

    fs.mkdir(flagDir, { recursive: true }, (err) => {
        if (err) throw err;
        
        fs.writeFile(path.join(flagDir, 'CMH_flag_error_suppression.txt'), '\ufeff' + flagData, { encoding: 'utf8' }, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Flag error file written successfully');
            }
        });
    });

    // Handling Modifier Errors
    let modifierData = `namespace = CMH_modifier_error_suppression #credit to Tobbzn

CMH_modifier_error_suppression.1 = {
    hidden = yes
    orphan = yes

    immediate = {\n`;

    modifier_errors.forEach(modifier => {
        modifierData += `        add_character_modifier = ${modifier}\n`;
    });

    modifierData += '    }\n}';

    const modifierDir = path.join(__dirname, 'CMH Error Suppression','events');

    fs.mkdir(modifierDir, { recursive: true }, (err) => {
        if (err) throw err;
        
        fs.writeFile(path.join(modifierDir, 'CMH_modifier_error_suppression.txt'), '\ufeff' + modifierData, { encoding: 'utf8' }, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Modifier error file written successfully');
            }
        });
    });
});

// Independent file creation
const error_suppression_content = `fix_variable_error = {# ERROR = KEY #credit to Tobbzn
    if = {
        limit = {
            exists = var:$ERROR$
            var:$ERROR$ = flag:$ERROR$
        }
        set_variable = {
            name = $ERROR$
            value = flag:$ERROR$
        }
    }
}
fix_scope_error = {
    if = {
        limit = {
            exists = scope:$ERROR$
        }
        save_scope_as = $ERROR$
    }
}`;

const errorSuppressionDir = path.join(__dirname, 'CMH Error Suppression', 'common', 'scripted_effects');
const errorSuppressionFile = path.join(errorSuppressionDir, 'CMH_error_suppression.txt');

fs.mkdir(errorSuppressionDir, { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(errorSuppressionFile, '\ufeff' + error_suppression_content, { encoding: 'utf8' }, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Error suppression file written successfully');
        }
    });
});
