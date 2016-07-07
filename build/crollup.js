/**
 * Created by Jamey McElveen on 7/6/16.
 */

var rollup = require('rollup').rollup,
    args = process.argv.slice(2),
    inputFilePath = args[0],
    outputFilePath = inputFilePath.replace('.vue', '.js');


rollup({
    entry: inputFilePath,
    format: 'e6',
    dest: outputFilePath
});