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

function dirname (
    path: string
): string {
    return Path.dirname(path);
}

function exec (
    command: string
): Promise<string> {
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

function extractPackageVersion (
    packagePath: string = Path.join(PATH, 'package.json')
): string {
    const packageJSON = JSON.parse(FS.readFileSync(packagePath).toString());

    return ( packageJSON?.version || '0.0.0' );
}

function fileExits (
    filePath: string
): boolean {
    return FS.lstatSync(filePath).isFile();
}

function getFiles (
    folderPath: string,
    positivePattern?: RegExp,
    negativePattern?: RegExp
): Array<string> {
    const items = FS.readdirSync(folderPath, { withFileTypes: true }).sort();
    const files: Array<string> = [];

    let name: string;

    for (const item of items) {
        name = item.name;

        if (item.isFile()) {

            if (
                positivePattern &&
                !positivePattern.test(name) ||
                negativePattern &&
                negativePattern.test(name)
            ) {
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

function join (
    ...paths: Array<string>
): string {
    return Path.join(...paths);
}

function pathFromURL (
    fileURL: string
): string {
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
