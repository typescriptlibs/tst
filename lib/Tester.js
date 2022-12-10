/* *
 *
 *  Imports
 *
 * */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { strict as Assert } from 'assert';
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
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const assert = this.assert;
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
                    result = testCode(assert);
                    if (result instanceof Promise) {
                        yield result
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
        });
    }
    run(testCode) {
        this.tests.push(['run', testCode]);
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
Tester.default = new Tester(Assert);
/* *
 *
 *  Default Export
 *
 * */
export default Tester;
