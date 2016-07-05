var build = require('./build.js'),
    projectRoot = build.buildPathToProjectPath(__dirname);

// desc('Building Tigerkit CLI.');
// task('build', function (params) {
//     console.log(projectRoot);
// });

desc('Building TODO Example.');
task('td', function (params) {
    console.log('td');
    console.log('Project Root:', projectRoot);
});