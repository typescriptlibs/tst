/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TST: TypeScript Tester

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* *
 *
 *  Imports
 *
 * */
import * as Path from 'path';
import System from './System.js';
import Tester from './Tester.js';
import TSConfig from './TSConfig.js';
/* *
 *
 *  Class
 *
 * */
export class CLI {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(argv, system) {
        this.argv = argv;
        this.source = argv[argv.length - 1] || './';
        this.system = system;
    }
    /* *
     *
     *  Functions
     *
     * */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const argv = this.argv;
            const system = this.system;
            if (argv.includes('-h') ||
                argv.includes('--help')) {
                console.info(CLI.HELP.join(system.EOL));
                return;
            }
            if (argv.includes('-v') ||
                argv.includes('--version')) {
                console.info(CLI.VERSION);
                return;
            }
            let source = this.source;
            if (!source.endsWith('.json')) {
                source = Path.join(source, 'tsconfig.json');
            }
            if (!system.fileExists(source)) {
                throw new Error(`TSConfig not found. (${source})`);
            }
            const target = TSConfig.extractOutDir(source) || source;
            try {
                if (argv.includes('--reset')) {
                    console.info(`Reset ${target}...`);
                    System.deleteFolder(target);
                }
                console.info(`Testing ${this.source}...`);
                const result = System.exec(`npx tsc -p ${source}`);
                if (argv.includes('--verbose') && result.trim()) {
                    console.info(result);
                }
                let files = [];
                if (argv.includes('--only')) {
                    const file = argv[argv.indexOf('--only') + 1];
                    files = [(file.endsWith('.js') ? file : `${file}.js`)];
                }
                else {
                    files = System.filesFrom(target, /\.js$/);
                }
                const tester = Tester.default;
                const errors = tester.errors;
                // @todo parallel mode to test atomic
                for (let file of files) {
                    try {
                        file = System.joinPath(target, file);
                        tester.file = file;
                        yield import(System.joinPath(System.CWD, file));
                    }
                    catch (error) {
                        errors.push({
                            error,
                            file,
                            title: 'import'
                        });
                    }
                }
                yield tester.start();
                const verbose = argv.includes('--verbose');
                if (verbose) {
                    for (const success of tester.successes) {
                        console.info('✅', success.title);
                    }
                }
                for (const error of tester.errors) {
                    console.error('🛑', error.title);
                    console.error('Failed in', error.file);
                    if (verbose) {
                        console.error(error.error);
                    }
                }
                console.info('✅ COMPLETED:', tester.successes.length);
                if (tester.errors.length) {
                    console.error('🛑 FAILED:', tester.errors.length);
                    process.exit(1);
                }
            }
            catch (error) {
                console.error(error);
                process.exit(1);
            }
        });
    }
}
/* *
 *
 *  Class Namespace
 *
 * */
(function (CLI) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    CLI.VERSION = `Version ${System.extractPackageVersion()}`;
    CLI.HELP = [
        `TST: TypeScript Tester - ${CLI.VERSION}`,
        '',
        `tst [options] [source]`,
        '',
        'ARGUMENTS:',
        '',
        '  [options]  Optional flags explained in the section below.',
        '',
        '  [source]   Source folder with TypeScript tests.',
        '',
        'OPTIONS:',
        '',
        '  --help, -h     Prints this help text.',
        '',
        '  --only [path]  Runs a single test in [source].',
        '',
        '  --reset        Compiles into an empty TypeScript target.',
        '',
        '  --verbose      Prints test details.',
        '',
        '  --version, -v  Prints the version string.',
        '',
        'EXAMPLES:',
        '',
        '  tst tests/',
        '  Compiles, loads and runs assertion tests in the "tests" folder.',
    ];
    /* *
     *
     *  Functions
     *
     * */
    function run(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            return new CLI(argv, System).run();
        });
    }
    CLI.run = run;
})(CLI || (CLI = {}));
/* *
 *
 *  Default Export
 *
 * */
export default CLI;
