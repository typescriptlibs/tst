/* *
 *
 *  Imports
 *
 * */
import * as FS from 'fs';
import * as Path from 'path';
/* *
 *
 *  Constants
 *
 * */
const EXTENDS_REGEXP = /^\s*"extends"\s*:\s*"([^"]*)"/mu;
const OUT_DIR_REGEXP = /^\s*"outDir"\s*:\s*"([^"]*)"/mu;
/* *
 *
 *  Functions
 *
 * */
function extractOutDir(tsConfigPath) {
    const relative = Path.dirname(tsConfigPath);
    const tsConfig = FS.readFileSync(tsConfigPath).toString();
    let match = tsConfig.match(OUT_DIR_REGEXP);
    if (match && match[1]) {
        return Path.join(relative, match[1]);
    }
    match = tsConfig.match(EXTENDS_REGEXP);
    if (match && match[1]) {
        return extractOutDir(Path.join(relative, match[1]));
    }
    return '';
}
/* *
 *
 *  Default Export
 *
 * */
export const TSConfig = {
    extractOutDir,
};
export default TSConfig;
