/* *
 *
 *  Imports
 *
 * */

import { run, test, Tester } from '@typescriptlibs/tst';

/* *
 *
 *  Variables
 *
 * */

let testCounter = 0;

/* *
 *
 *  Tests
 *
 * */

run((assert: test.Assert) => {
    ++testCounter;
    assert.ok(
        typeof Tester === 'function',
        'Tester should be a class constructor.'
    );
});

test('Tester tests', (assert: test.Assert) => {
    ++testCounter;
    assert.ok(
        typeof Tester === 'function',
        'Tester should be a class constructor.'
    );
});

test('Tester runs', (assert: test.Assert) => {
    assert.strictEqual(
        ++testCounter,
        3,
        'Tester should have run 3 tests in this module.'
    );
});