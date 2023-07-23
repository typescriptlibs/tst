/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TST: TypeScript Tester

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* *
 *
 *  Imports
 *
 * */
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
        this.file = '';
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
            let testCounter = 0;
            let title;
            for (const test of this.tests) {
                title = `#${++testCounter}`;
                if (test.title) {
                    title += `: ${test.title}`;
                }
                try {
                    result = test.code(assert);
                    if (!(result instanceof Promise)) {
                        result = Promise.resolve();
                    }
                    yield result
                        .then(() => successes.push({
                        file: test.file,
                        title
                    }))
                        .catch((error) => errors.push({
                        error,
                        file: test.file,
                        title
                    }));
                }
                catch (error) {
                    errors.push({
                        error,
                        file: test.file,
                        title
                    });
                }
            }
        });
    }
    run(testCode) {
        this.tests.push({
            code: testCode,
            file: this.file,
            title: ''
        });
    }
    test(description, testCode) {
        this.tests.push({
            code: testCode,
            file: this.file,
            title: description
        });
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
