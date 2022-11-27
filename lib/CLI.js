/* *
 *
 *  Imports
 *
 * */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            if (!system.fileExits(source)) {
                throw new Error(`TSConfig not found. (${source})`);
            }
            const target = TSConfig.extractOutDir(source) || source;
            try {
                console.info(`Testing ${this.source}...`);
                const result = yield System.exec(`npx tsc -p ${source}`);
                if (result) {
                    console.info(result);
                }
                let files = [];
                if (argv.includes('--only')) {
                    const file = argv[argv.indexOf('--only') + 1];
                    files = [(file.endsWith('.js') ? file : `${file}.js`)];
                }
                else {
                    files = System.getFiles(target, /\.js$/);
                }
                for (const file of files) {
                    yield import(System.join(System.CWD, target, file));
                }
                const tester = Tester.default;
                yield tester.start();
                if (argv.includes('--verbose')) {
                    for (const success of tester.successes) {
                        console.info('✅', success);
                    }
                    for (const error of tester.errors) {
                        console.error('🛑', error[0]);
                        console.error(error[1]);
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
        `tst: The TypeScript Tester - ${CLI.VERSION}`,
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
        '  --verbose      Prints this help text.',
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
