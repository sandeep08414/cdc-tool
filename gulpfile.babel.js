import * as gulp from 'gulp';
import * as $ from './gulp/build';
import * as gcp from './gulp/package';


/**
 * @author: Dinesh Gurram
* @description: Common placeholder for all available gulp tasks, manually registered in this file.
 * */


/**
* @description: Options are laid here for users to run all tasks at once or independent tasks(registering to gulp).
  * Independent: They can be referenced simply by passing --> gulp "value". Ex: gulp updateBuild
 * All-Tasks: Reference value --> "gulp"( determines as default).
* */

//Individual Tasks.

exports.clean = $.cleanFolders;
exports.zipOutput = $.zipOutput;
exports.cleanComments = $.commentsCleanUp;
exports.updateBuild = $.updateBuild;
exports.imagePath =$.imagePath;


// Bundled tasks.

exports.package = gcp.package;

exports.default = gulp.parallel($.digitalSignature,$.commentsCleanUp);

