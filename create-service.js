const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the project name from the command-line arguments
const projectName = process.argv[2];
if (!projectName) {
    console.error('Please provide a project name.');
    process.exit(1);
}


const devToolsPaths = {
    vscodeLaunch: 'devtools/template_vscode_launch.json',
    package: 'devtools/template_package.json',
    tsconfig: 'devtools/template_tsconfig.json',
    codegen: 'devtools/template_codegen.yml',

}

const tsconfigTemplate = fs.readFileSync(devToolsPaths.tsconfig, 'utf8');
const packageTemplate = fs.readFileSync(devToolsPaths.package, 'utf8').replace(/\$\{projectName\}/g, projectName);
const vscodeLaunch = fs.readFileSync(devToolsPaths.vscodeLaunch, 'utf8')
const codegenTemplate = fs.readFileSync(devToolsPaths.codegen, 'utf8');

const projectStructure = {
    '.vscode': {
        'launch.json': vscodeLaunch,
    },
    'package.json': packageTemplate,
    'tsconfig.json': tsconfigTemplate,
    'codegen.yml': codegenTemplate,

};

// Function to create the project structure
function createProjectStructure(structure, currentPath = '') {
    for (const key in structure) {
        if (typeof structure[key] === 'string') {
            fs.writeFileSync(path.join(currentPath, key), structure[key]);
        } else {
            fs.mkdirSync(path.join(currentPath, key));
            createProjectStructure(structure[key], path.join(currentPath, key));
        }
    }
}

fs.mkdirSync(projectName);

createProjectStructure(projectStructure, projectName);

execSync('npm install', { cwd: projectName, stdio: 'inherit' });