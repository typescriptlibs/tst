/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TST: TypeScript Tester

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
/// <reference types="node" />
import { strict as Assert } from 'assert';
export declare class Tester<T = any> {
    static readonly default: Tester<Tester.DefaultAssert>;
    constructor(assert: T);
    readonly assert: T;
    readonly errors: Array<Tester.Result>;
    file: string;
    readonly successes: Array<Tester.Result>;
    readonly tests: Array<Tester.Test>;
    start(): Promise<void>;
    run(testCode: (assert: T) => any): asserts testCode;
    test(description: string, testCode: (assert: T) => any): asserts testCode;
}
export declare namespace Tester {
    type DefaultAssert = typeof Assert;
    interface Result {
        error?: unknown;
        file: string;
        title: string;
    }
    interface Test {
        code: Function;
        file: string;
        title: string;
    }
}
export default Tester;
