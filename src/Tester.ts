/* *
 *
 *  Imports
 *
 * */

import * as Assert from 'assert';

/* *
 *
 *  Class
 *
 * */

export class Tester<T = unknown> {

    /* *
     *
     *  Static Properties
     *
     * */

    public static readonly defaultSession = new Tester(Assert);

    /* *
     *
     *  Constructor
     *
     * */

    public constructor(
        assert: T
    ) {
        this.assert = assert;
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly assert: T;

    public readonly errors: Array<[string, unknown]> = [];

    public readonly successes: Array<string> = [];

    public readonly tests: Array<[string, Function]> = [];

    /* *
     *
     *  Functions
     *
     * */

    public start(
        verbose?: boolean
    ): void {
        const errors = this.errors;
        const successes = this.successes;

        let result: unknown;
        let testCode: Function;
        let testCounter = 0;
        let title: string;

        for (const test of this.tests) {
            testCode = test[1];
            title = `#${++testCounter}: ${test[0]}`;

            try {
                result = testCode();

                if (result instanceof Promise) {
                    result
                        .then(() => successes.push(title))
                        .catch((error) => errors.push([title, error]));
                }
                else {
                    successes.push(title);
                }
            }
            catch (error) {
                errors.push([title, error]);
            }
        }

        if (!verbose) {
            return;
        }

        for (const success of successes) {
            console.log('✅', success);
        }

        for (const error of errors) {
            console.log('🛑', error[0]);
            console.error(error[1]);
        }
    }

    public test(
        description: string,
        testCode: (assert: T) => unknown
    ): void {
        this.tests.push([description, testCode]);
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Tester;
