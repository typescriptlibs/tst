/* *
 *
 *  Imports
 *
 * */
import * as ChildProcess from 'child_process';
import * as FS from 'fs';
import * as OS from 'os';
import * as Path from 'path';
import * as URL from 'url';
/* *
 *
 *  Constants
 *
 * */
const CWD = process.cwd();
const EOL = OS.EOL;
const PATH = join(dirname(pathFromURL(import.meta.url)), '..');
const VERSION = extractPackageVersion();
/* *
 *
 *  Functions
 *
 * */
function dirname(path) {
    return Path.dirname(path);
}
function exec(command) {
    return new Promise((resolve, reject) => {
        ChildProcess.exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stderr || stdout || error);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
function extractPackageVersion(packagePath = Path.join(PATH, 'package.json')) {
    const packageJSON = JSON.parse(FS.readFileSync(packagePath).toString());
    return ((packageJSON === null || packageJSON === void 0 ? void 0 : packageJSON.version) || '0.0.0');
}
function fileExits(filePath) {
    return FS.lstatSync(filePath).isFile();
}
function getFiles(folderPath, positivePattern, negativePattern) {
    const items = FS.readdirSync(folderPath, { withFileTypes: true }).sort();
    const files = [];
    let name;
    for (const item of items) {
        name = item.name;
        if (item.isFile()) {
            if (positivePattern &&
                !positivePattern.test(name) ||
                negativePattern &&
                    negativePattern.test(name)) {
                continue;
            }
            files.push(name);
            continue;
        }
        const subFiles = getFiles(name);
        for (const file of subFiles) {
            files.push(join(name, file));
        }
    }
    return files;
}
function join(...paths) {
    return Path.join(...paths);
}
function pathFromURL(fileURL) {
    return URL.fileURLToPath(fileURL);
}
/* *
 *
 *  Default Export
 *
 * */
export const System = {
    CWD,
    EOL,
    PATH,
    VERSION,
    dirname,
    exec,
    extractPackageVersion,
    fileExits,
    getFiles,
    join,
    pathFromURL,
};
export default System;
