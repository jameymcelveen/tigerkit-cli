#!/usr/bin/env node
/**
 * Created by Jamey McElveen on 7/7/16.
 */


var fs = require('fs'),
    buble = require( 'buble' ),

    args = process.argv.slice(2),
    inputFile = args[0],
    outputFile = inputFile.replace('.es6', '.js'),
    input = fs.readFileSync(inputFile, 'utf-8'),

    options = {
        transforms: {
            modules: false
        }
    },
    output = buble.transform(input, options);

fs.writeFileSync(outputFile, output.code);
fs.writeFileSync(outputFile + ".map", output.map);