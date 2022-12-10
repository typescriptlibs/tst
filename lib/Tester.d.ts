/// <reference types="node" />
import { strict as Assert } from 'assert';
export declare class Tester<T = any> {
    static readonly default: Tester<Tester.DefaultAssert>;
    constructor(assert: T);
    readonly assert: T;
    readonly errors: Array<[string, any]>;
    readonly successes: Array<string>;
    readonly tests: Array<[string, Function]>;
    start(): Promise<void>;
    run(testCode: (assert: T) => any): asserts testCode;
    test(description: string, testCode: (assert: T) => any): asserts testCode;
}
export declare namespace Tester {
    type DefaultAssert = typeof Assert;
}
export default Tester;
