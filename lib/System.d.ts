/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TST: TypeScript Tester

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
declare function deleteFolder(path: string): void;
declare function exec(command: string): string;
declare function extractPackageVersion(packagePath?: string): string;
declare function fileExists(filePath: string): boolean;
declare function filesFrom(folderPath: string, positivePattern?: RegExp, negativePattern?: RegExp): Array<string>;
declare function folderName(path: string): string;
declare function joinPath(...paths: Array<string>): string;
declare function pathFromURL(fileURL: string): string;
export declare const System: {
    CWD: string;
    EOL: string;
    PATH: string;
    VERSION: string;
    deleteFolder: typeof deleteFolder;
    exec: typeof exec;
    extractPackageVersion: typeof extractPackageVersion;
    fileExists: typeof fileExists;
    filesFrom: typeof filesFrom;
    folderName: typeof folderName;
    joinPath: typeof joinPath;
    pathFromURL: typeof pathFromURL;
};
export default System;
