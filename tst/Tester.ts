/* *
 *
 *  Imports
 *
 * */

import test, * as TST from '@typescriptlibs/tst';

/* *
 *
 *  Tests
 *
 * */

test('Tester tests', function (assert: test.Assert) {
    assert(
        typeof TST.Tester === 'function',
        'Tester should be a class constructor.'
    );
});
