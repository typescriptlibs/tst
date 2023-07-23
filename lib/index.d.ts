/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TST: TypeScript Tester

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
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
