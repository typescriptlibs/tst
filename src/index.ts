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

const test: typeof Tester.default.test = Tester.default.test.bind(Tester.default);

/* *
 *
 *  Namespace
 *
 * */

namespace test {

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
