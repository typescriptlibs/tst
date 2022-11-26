/* *
 *
 *  Imports
 *
 * */

import { strict as Assert } from 'assert';

/* *
 *
 *  Class
 *
 * */

export class Tester<T = any> {

    /* *
     *
     *  Static Properties
     *
     * */

    public static readonly default: Tester<Tester.DefaultAssert> = new Tester<Tester.DefaultAssert>(Assert);

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

    public readonly errors: Array<[string, any]> = [];

    public readonly successes: Array<string> = [];

    public readonly tests: Array<[string, Function]> = [];

    /* *
     *
     *  Functions
     *
     * */

    public async start (): Promise<void> {
        const assert = this.assert;
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
                result = testCode(assert);

                if (result instanceof Promise) {
                    await result
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
    }

    public test (
        description: string,
        testCode: (assert: T) => any
    ): asserts testCode {
        this.tests.push([description, testCode]);
    }

}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace Tester {

    /* *
     *
     *  Declarations
     *
     * */

    export type DefaultAssert = typeof Assert;

}

/* *
 *
 *  Default Export
 *
 * */

export default Tester;
