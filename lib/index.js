import Tester from './Tester.js';
export const test = Tester.defaultSession.test.bind(Tester.defaultSession);
export default test;
export * from './Tester.js';
