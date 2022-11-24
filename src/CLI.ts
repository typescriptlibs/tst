import test from './index.js';
import { hideBin } from 'yargs/helpers';
import Yargs from 'yargs';

Yargs(hideBin(process.argv))
    .command(
        '* [testfolder]',
        false,
        function (yargs) {
            return yargs.positional('testfolder', {
                default: 'tests/',
                description: 'Path to the tests'
            });
        },
        function (argv) {
            console.log('CLI', argv);
        }
    )
    .parse();
