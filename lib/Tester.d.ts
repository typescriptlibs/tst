/// <reference types="node" />
import * as Assert from 'assert';
export declare class Tester<T = unknown> {
    static readonly defaultSession: Tester<typeof Assert>;
    constructor(assert: T);
    readonly assert: T;
    readonly errors: Array<[string, unknown]>;
    readonly successes: Array<string>;
    readonly tests: Array<[string, Function]>;
    start(verbose?: boolean): void;
    test(description: string, testCode: (assert: T) => unknown): void;
}
export default Tester;
