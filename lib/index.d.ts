import Tester from './Tester.js';
export declare const run: typeof Tester.default.run;
export declare const test: typeof Tester.default.test;
export declare namespace test {
    type Assert = Tester.DefaultAssert;
}
export * from './CLI.js';
export * from './System.js';
export * from './Tester.js';
export * from './TSConfig.js';
export default test;
