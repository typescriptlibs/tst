/* *
 *
 *  Imports
 *
 * */

import test, { System } from '@typescriptlibs/tst';

/* *
 *
 *  Tests
 *
 * */

test('System tests', function (assert: test.Assert) {
    assert.ok(
        System.VERSION.match(/^\d+\.\d+\.\d+$/),
        'System.VERSION should be a version string.'
    );
});
