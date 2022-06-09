import * as lodash from 'lodash';
import * as gulp from 'gulp';
import zip from 'gulp-zip';
import comments from 'gulp-strip-comments';
import * as log from 'fancy-log';
import * as inject from 'gulp-inject-string';
import * as conf from './conf';

/**
 * @author: Dinesh Gurram,Shoukath Mohammed
 * @description : All SPA's can use the below base tasks to modify the output.
 * */

/**
 * @type: const
 * */
const del = require('del')
    , replace = require('gulp-replace');
const argValues = require('yargs').argv;
const chalk = require('chalk');


/**
 * @description: A method that gets invoked when the user passes the set of arguments to clean the
 *  output directory.
 * */

  const cleanFolders = async () => {
    const basePath = argValues.base;
    const excludePath = argValues.ignores;
    if(basePath && excludePath){
        const buildPath = [];
        lodash.each(excludePath.split(':'),(val)=>{
            buildPath.push(`!${basePath}${val}`)
        })
        await del.sync([`${basePath}*`,...buildPath]);

    }else{
        log.error(chalk.red('No proper input provided'));
    }
}


/**
 * @description: This task will zip the formatted output directory and ready to be exported.
 * */

 const zipOutput = async () => {
    return await gulp.src('./dist/**',{allowEmpty:true}) // not needed just to make sure build never fails.
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./'));
}

/**
 * @description: This task removes all the inflected comments from transpiled output js files.
 * */

const commentsCleanUp = async () => {
    return await gulp.src('./dist/**/*.js')
        .pipe(comments())
        .pipe(gulp.dest('./dist'));
}

/**
 * @description: A digital footprint is left after each build enabling team to check on the updated file.
 * */


const digitalSignature = async () =>{
     const srcFile = './dist/**/index.html';
     if(srcFile){
         await (gulp.src(srcFile, {allowEmpty:true})
        .pipe(inject.wrap('<!-- Created by CVS Digital UI Team on ' + Date() +' -->\n', ''))
        .pipe(gulp.dest('./dist')));
      }
     else{
         log.error(chalk.red('Details aren\'t updated'));
     }
 };


/**
 * @description:
 * angular-cli doesn't support `--deploy-url`
 * feature for static html templates or markups,
 * as we are using <img> elements in the code,
 * this has to be handled & replaced using an
 * external build system. Gulp to the rescue !!!
 */

 async function imagePath () {
    let src = argValues.src
        , deployUrl = argValues.deployUrl
        , pattern = /\B(\/assets\/images.*?\.\w+)/g;

    // if the deploy url or source path
    // is missing throw an error.
    if (!deployUrl || !src) {
        log.error(chalk.red('Invalid arguments!' + 'please provide valid source path & deploy URL.'));
    }

    // remove slashes if there are any
    // in the end of the image path.
    if (typeof deployUrl === 'string' && lodash.endsWith(deployUrl, '/')) {
        deployUrl = deployUrl.substring(0, deployUrl.length - 1);
    }
    return await gulp
        .src([src + '/*.js', src + '/*.map'])
        .pipe(replace(pattern, deployUrl + '$1'))
        .pipe(replace(/favicon\.ico/g, `${deployUrl}$&`))
        .pipe(gulp.dest(file => file.base));
}

/**
 * @description:
 * adding this task to update the
 * build number on every build.
 */

   async function updateBuild () {
    const comment = conf.comment();
    return await gulp
        .src(`${conf.paths.dist}/index.html`,{allowEmpty:true})
        .pipe(replace(new RegExp('<%buildInfo%>', 'g'), comment.html))
        .pipe(replace(new RegExp('<%encBuildInfo%>', 'g'), comment.js))
        .pipe(gulp.dest(file => file.base));
}

module.exports ={
    cleanFolders,
    zipOutput,
    updateBuild,
    imagePath,
    digitalSignature,
    commentsCleanUp,
}
