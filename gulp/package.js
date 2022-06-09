/**
 * @author: Shoukath Mohammed,Dinesh Gurram
 */
import gulp from 'gulp';
import { each as _each } from "lodash";
import * as yargs from 'yargs';
import * as conf from './conf';
import zip from 'gulp-zip';

/**
 * @global
 */
const
    clean = require('gulp-clean')
    , replace = require('gulp-replace');

/**************************************************************
 *************************** TASKS ****************************
 **************************************************************/
/**
 * @description:
 * adding this copy task to copy the scripts.
 */
const copyIt = (pattern, dest) => {
    return gulp.src(pattern,{allowEmpty:true}).pipe(gulp.dest(dest));
};

/**
 * @description:
 * adding this zip task bundle files.
 */
const zipIt = (pattern, dest, fileName) => {
    return gulp
        .src(pattern, {allowEmpty:true})
        .pipe(zip(fileName))
        .pipe(gulp.dest(dest));
};

/**
 * @description:
 * adding this replace the patterns.
 */
const replaceIt = (src, patterns) => {
    const assetsPath = yargs.argv.deployUrl;

    _each(patterns, o => {
         return  gulp
            .src(src , {allowEmpty:true})
            .pipe(replace(o.pattern, assetsPath + o.replaceWith))
            .pipe(gulp.dest(file => file.base))
    });
};

/**
 * @description:
 * added this task to replace script path to be
 * pointing to google cloud.
 */
const index = () => {
    return replaceIt(conf.patterns.index, conf.replacePatterns);
};

/**
 * @description:
 * adding this copy task to copy the scripts.
 */
const copyAssets = () => {
    return copyIt(conf.patterns.gcp, 'gcp');
};

/**
 * @description:
 * adding this clean task to clean the redundant files.
 */
const cleangcp = (done) => {
    return gulp.src(['dist', 'gcp', '*.zip'], { read: false, allowEmpty:true})
        .pipe(clean())
        .on('end', () => done());
};

/**
 * @description:
 * Clear the stubbed json on the gcp bundle
 */
const cleanJson = (done) => {
    return gulp.src([
        'bundle/temp/assets/api'
    ], { read: false, allowEmpty:true}).pipe(clean()).on('end', () => done());
};

/**
 * @description:
 * adding this copy task to copy the scripts.
 */
const copyIndex = () => {
    return copyIt(conf.patterns.dist, 'dist');
};

/**
 * @description:
 * adding this zip task to bundle static assets
 * for google cloud storage bucket.
 */
const zipGcp = () => {
    return zipIt('gcp/**/*', './', 'gcp.zip');
};


/**
 * @description:
 * adding this copy task to copy the scripts.
 */


exports.package = gulp.series(cleanJson,copyIndex,copyAssets);
