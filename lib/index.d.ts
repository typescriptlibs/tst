import Tester from './Tester.js';
declare const test: typeof Tester.default.test;
declare namespace test {
    type Assert = Tester.DefaultAssert;
}
export * from './CLI.js';
export * from './System.js';
export * from './Tester.js';
export * from './TSConfig.js';
export default test;
