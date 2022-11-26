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
        const system = this.system;

        if (
            this.argv.includes('-h') ||
            this.argv.includes('--help')
        ) {
            console.info(CLI.HELP.join(system.EOL));
            return;
        }

        if (
            this.argv.includes('-v') ||
            this.argv.includes('--version')
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
            console.info(`Testing ${this.source}...`);
            const result = await System.exec(`npx tsc -p ${source}`);
            console.info(result);

            const files = System.getFiles(target, /\.js$/);

            for (const file of files) {
                await import(System.join(System.CWD, target, file));
            }

            const tester = Tester.default;

            await tester.start();

            for (const success of tester.successes) {
                console.log('✅', success);
            }
    
            for (const error of tester.errors) {
                console.log('🛑', error[0]);
                console.error(error[1]);
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
