/**
 * Created by Jamey McElveen on 7/4/16.
 */

var path = require('path');

module.exports.buildPathToProjectPath = buildPathToProjectPath;

function buildPathToProjectPath(buildPath) {
    var folders = buildPath.split(path.sep);
    folders.pop(); // remove the last item
    return folders.join(path.sep);
}