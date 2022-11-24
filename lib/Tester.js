/* *
 *
 *  Imports
 *
 * */
import * as Assert from 'assert';
/* *
 *
 *  Class
 *
 * */
export class Tester {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(assert) {
        this.errors = [];
        this.successes = [];
        this.tests = [];
        this.assert = assert;
    }
    /* *
     *
     *  Functions
     *
     * */
    start(verbose) {
        const errors = this.errors;
        const successes = this.successes;
        let result;
        let testCode;
        let testCounter = 0;
        let title;
        for (const test of this.tests) {
            testCode = test[1];
            title = `#${++testCounter}: ${test[0]}`;
            try {
                result = testCode();
                if (result instanceof Promise) {
                    result
                        .then(() => successes.push(title))
                        .catch((error) => errors.push([title, error]));
                }
                else {
                    successes.push(title);
                }
            }
            catch (error) {
                errors.push([title, error]);
            }
        }
        if (!verbose) {
            return;
        }
        for (const success of successes) {
            console.log('✅', success);
        }
        for (const error of errors) {
            console.log('🛑', error[0]);
            console.error(error[1]);
        }
    }
    test(description, testCode) {
        this.tests.push([description, testCode]);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Tester.defaultSession = new Tester(Assert);
/* *
 *
 *  Default Export
 *
 * */
export default Tester;
