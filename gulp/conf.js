/**
 * @author: Shoukath Mohammed
 *
 * This file contains the variables used in other gulp files
 * which defines tasks
 * By design, we only put there very generic config values
 * which are used in several places to keep good readability
 * of the tasks
 */
global.Buffer = global.Buffer || require('buffer').Buffer;

/**
 * Build configuration
 */
const moment = require('moment-timezone');
let pkg = (exports.pkg = require('./../package.json'));

/**
 * Timezone configuration
 */
const timePresets = {
    tz: 'America/New_York',
    format: 'dddd MM/DD/YYYY, h:mm:ss a z'
};

/**
 * Build configuration
 */
exports.comment = () => {
    const buildNo = new Date().getTime();
    const generatedOn = moment()
        .tz(timePresets.tz)
        .format(timePresets.format);

    return {
        html: `
      Version: ${pkg.version}
      Build: ${buildNo}
      Program: ${pkg.program}
      Generated On: ${generatedOn}
      Author: ${pkg.author}
   `,
        js: Buffer.from(
            JSON.stringify({
                version: pkg.version,
                build: buildNo,
                program: pkg.program,
                generatedOn: generatedOn,
                author: pkg.author
            })
        ).toString('base64')
    };
};

/**
 * Paths configuration
 */
exports.paths = {
    dist: 'dist'
};

/**
 * Bundle configuration
 */
exports.patterns = {
    gcp: ['bundle/temp/**', '!bundle/temp/index.html'],
    dist: ['bundle/temp/index.html'],
    index: ['dist/index.html']
};

/**
 * Replace patterns configuration
 */
exports.replacePatterns = [
    {
        pattern: /((?:\/)?vendors\/onlineopinionV5.*?)/g,
        replaceWith: '$1'
    }
];
