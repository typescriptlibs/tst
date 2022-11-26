/* *
 *
 *  Imports
 *
 * */

import test, { Tester } from '@typescriptlibs/tst';

/* *
 *
 *  Tests
 *
 * */

test('Tester tests', function (assert: test.Assert) {
    assert.ok(
        typeof Tester === 'function',
        'Tester should be a class constructor.'
    );
});
