/* *
 *
 *  Imports
 *
 * */

import Tester from './Tester.js';

/* *
 *
 *  Constants
 *
 * */

export const run: typeof Tester.default.run = Tester.default.run.bind(Tester.default);

export const test: typeof Tester.default.test = Tester.default.test.bind(Tester.default);

/* *
 *
 *  Namespace
 *
 * */

export namespace test {

    /* *
     *
     *  Declarations
     *
     * */

    export type Assert = Tester.DefaultAssert;

}

/* *
 *
 *  Exports
 *
 * */

export * from './CLI.js';

export * from './System.js';

export * from './Tester.js';

export * from './TSConfig.js';

/* *
 *
 *  Default Export
 *
 * */

export default test;
