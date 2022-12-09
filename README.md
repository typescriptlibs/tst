TST: TypeScript Tester
======================

Simple testing tool to run and test TypeScript code in combination with assertion libraries.



Command Line Arguments
----------------------

* \[options] : Optional flags explained in the section below.

* \[source]  : Source folder with TypeScript tests.



Command Line Options
--------------------

* --help, -h    : Prints this help text.

* --only [path] : Runs a single test in [source].

* --reset       : Compiles into an empty TypeScript target.

* --verbose     : Prints test details.

* --version, -v : Prints the version string.



Examples
--------

Install the testing tool.
```sh
npm install @typescriptlibs/tst
```

Import the default test function in the following pattern. If you like to use a
custom assert library, you can ignore the assert argument.
```ts
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
```

Compile, load and run assertion tests in the "tests" folder.
```sh
$ npx tst tests/
```
