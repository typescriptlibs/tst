import test from '@typescriptlibs/tst';

test('Test the answer to the ultimate question.', (assert: test.Assert) => {
    assert.strictEqual(
        42,
        Math.cbrt(74088),
        'The answer to the ultimate question should be the cube root of 74088.'
    );
});

test('Test the timeout function.', async (assert: test.Assert) => {
    const time = Date.now();

    await new Promise((resolve) => setTimeout(resolve, 100));

    const delta = Date.now() - time;

    assert.ok(
        delta > 100,
        `The timeout should fire after 100 milliseconds. (${delta})`
    );
});
