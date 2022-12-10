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
export const run = Tester.default.run.bind(Tester.default);
export const test = Tester.default.test.bind(Tester.default);
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
