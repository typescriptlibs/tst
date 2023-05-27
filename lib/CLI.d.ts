/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TST: TypeScript Tester

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
import System from './System.js';
export declare class CLI {
    constructor(argv: Array<string>, system: typeof System);
    readonly argv: Array<string>;
    readonly source: string;
    readonly system: typeof System;
    run(): Promise<void>;
}
export declare namespace CLI {
    interface Args extends Partial<Record<string, (boolean | string)>> {
        help?: boolean;
        source?: string;
        version?: boolean;
    }
    const VERSION: string;
    const HELP: string[];
    function run(argv: Array<string>): Promise<void>;
}
export default CLI;
