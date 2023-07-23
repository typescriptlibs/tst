/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TST: TypeScript Tester

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License. 
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/


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

    public readonly errors: Array<Tester.Result> = [];

    public file: string = '';

    public readonly successes: Array<Tester.Result> = [];

    public readonly tests: Array<Tester.Test> = [];


    /* *
     *
     *  Functions
     *
     * */


    public async start (): Promise<void> {
        const assert = this.assert;
        const errors = this.errors;
        const successes = this.successes;

        let result: Promise<unknown>;
        let testCounter = 0;
        let title: string;

        for (const test of this.tests) {
            title = `#${++testCounter}`;

            if (test.title) {
                title += `: ${test.title}`;
            }

            try {
                result = test.code(assert);

                if (!(result instanceof Promise)) {
                    result = Promise.resolve();
                }

                await result
                    .then(() => successes.push({
                        file: test.file,
                        title
                    }))
                    .catch((error) => errors.push({
                        error,
                        file: test.file,
                        title
                    }));
            }
            catch (error) {
                errors.push({
                    error,
                    file: test.file,
                    title
                });
            }
        }
    }


    public run (
        testCode: (assert: T) => any
    ): asserts testCode {
        this.tests.push({
            code: testCode,
            file: this.file,
            title: ''
        });
    }


    public test (
        description: string,
        testCode: (assert: T) => any
    ): asserts testCode {
        this.tests.push({
            code: testCode,
            file: this.file,
            title: description
        });
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

    export interface Result {
        error?: unknown;
        file: string;
        title: string;
    }

    export interface Test {
        code: Function;
        file: string;
        title: string;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default Tester;
