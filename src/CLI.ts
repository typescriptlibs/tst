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

    public constructor (
        argv: Array<string>,
        system: typeof System
    ) {
        this.argv = argv;
        this.source = argv[argv.length-1] || './';   
        this.system = system; 
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly argv: Array<string>;

    public readonly source: string;

    public readonly system: typeof System;

    /* *
     *
     *  Functions
     *
     * */

    public async run (): Promise<void> {
        const argv = this.argv;
        const system = this.system;

        if (
            argv.includes('-h') ||
            argv.includes('--help')
        ) {
            console.info(CLI.HELP.join(system.EOL));
            return;
        }

        if (
            argv.includes('-v') ||
            argv.includes('--version')
        ) {
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
            if (argv.includes('--reset')) {
                console.info(`Reset ${target}...`);

                System.deleteFolder(target);
            }

            console.info(`Testing ${this.source}...`);

            const result = System.exec(`npx tsc -p ${source}`);

            if (argv.includes('--verbose') && result.trim()) {
                console.info(result);
            }

            let files: Array<string> = [];

            if (argv.includes('--only')) {
                const file = argv[argv.indexOf('--only') + 1];

                files = [ ( file.endsWith('.js') ? file : `${file}.js` ) ]
            }
            else {
                files = System.filesFrom(target, /\.js$/);
            }

            // @todo parallel mode to test atomic
            for (const file of files) {
                await import(System.joinPath(System.CWD, target, file));
            }

            const tester = Tester.default;

            await tester.start();

            if (argv.includes('--verbose')) {
                for (const success of tester.successes) {
                    console.info('✅', success);
                }
                for (const error of tester.errors) {
                    console.error('🛑', error[0]);
                    console.error(error[1]);
                }
            }

            console.info('✅ COMPLETED:', tester.successes.length)

            if (tester.errors.length) {
                console.error('🛑 FAILED:', tester.errors.length);

                process.exit(1);
            }
    
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace CLI {

    /* *
     *
     *  Declarations
     *
     * */

    export interface Args extends Partial<Record<string, (boolean|string)>> {
        help?: boolean;
        source?: string;
        version?: boolean;
    }

    /* *
     *
     *  Constants
     *
     * */

    export const VERSION = `Version ${System.extractPackageVersion()}`;

    export const HELP = [
        `tst: The TypeScript Tester - ${VERSION}`,
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

    export async function run (
        argv: Array<string>
    ): Promise<void> {
        return new CLI(argv, System).run();
    }
    
}

/* *
 *
 *  Default Export
 *
 * */

export default CLI;
