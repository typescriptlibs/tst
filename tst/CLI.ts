/* *
 *
 *  Imports
 *
 * */

import test, { CLI, System } from '@typescriptlibs/tst';

/* *
 *
 *  Tests
 *
 * */

test('CLI tests', function (assert: test.Assert) {
    assert.strictEqual(
        CLI.VERSION,
        `Version ${System.VERSION}`,
        'CLI.VERSION should end with System.VERSION.'
    );
});
