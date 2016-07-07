#!/usr/bin/env node
/**
 * Created by Jamey McElveen on 7/5/16.
 */

'use strict';

var fs = require('fs'),
    buble = require( 'buble' );

// var TEMPLATE_START_REGX = /^\s*<\s*template\s*>\s*$/,
//     TEMPLATE_END_REGX = /^\s*<\/\s*template\s*>\s*$/,
//     SCRIPT_START_REGX = /^\s*<\s*script\s*>\s*$/,
//     SCRIPT_END_REGX = /^\s*<\/\s*script\s*>\s*$/,
//     MODULE_EXPORTS_REGX = /^\s*module.exports\s*=\s*({)?\s*$/,
//     EXPORT_DEFAULT_REGX = /^\s*export\s*default\s*({)\s*$/,

    // templeteIndent = ' ', scriptIndent = ' ',
    // args = process.argv.slice(2),
    // inputFilePath = args[0],
    // outputFilePath = inputFilePath.replace('.vue', '.js'),
    // inputScript = fs.readFileSync(inputFilePath, 'utf-8').split('\n'),
    // template = [],
    // script = [],
    // inTemplate = false,
    // inScript = false,
    // componentName = 'clock';

main(process.argv.slice(2));

function main(args) {
    var input, output, inputFilePath, outputFilePath;

    inputFilePath = args[0];
    outputFilePath = inputFilePath.replace('.vue', '.js');
    input = fs.readFileSync(inputFilePath, 'utf-8').split('\n');
    output = compileTemplate(input);
    fs.writeFileSync(outputFilePath, output.code);
    fs.writeFileSync(outputFilePath + ".map", output.map);
}

function compileTemplate(input) {
    var opts, parsed, injected, code;

    opts = {
        transforms: {
            modules: false // ignore modules
        }
    };

    parsed = parseTemplate(input);
    injected = injectTemplateIntoComponent(parsed);
    return buble.transform(injected.code, opts);
}

function injectTemplateIntoComponent(parsed) {
    var line, code = [],
        result =  {
            sourceScriptStart: parsed.sourceScriptStart,
            templateStart: 0,
            templateLength: 0,
            code: ""
        };
    for(var i=0;i<parsed.code.length;i++){
        line = parsed.code[i];
        code.push(line);
    }
    result.code = code.join('\n');
    return result;
}

function parseTemplate(input) {

    var sourceScriptStart = 0,
        template = [],
        inTemplate = false,
        TEMPLATE_START_REGX = /^\s*<\s*template\s*>\s*$/,
        TEMPLATE_END_REGX = /^\s*<\/\s*template\s*>\s*$/,
        script = [],
        inScript = false,
        SCRIPT_START_REGX = /^\s*<\s*script\s*>\s*$/,
        SCRIPT_END_REGX = /^\s*<\/\s*script\s*>\s*$/;

    for (var i = 0; i < input.length; i++) {
        var line = input[i];
        if (!inTemplate && line.match(TEMPLATE_START_REGX)) {
            inTemplate = true;
        }
        else if (inTemplate && line.match(TEMPLATE_END_REGX)) {
            inTemplate = false;
        }
        else if (!inScript && line.match(SCRIPT_START_REGX)) {
            inScript = true;
            sourceScriptStart = i+1;
        }
        else if (inScript && line.match(SCRIPT_END_REGX)) {
            inScript = false;
        }
        else if (inTemplate) {
            template.push(formatTemplate(line));
        }
        else if (inScript) {
            script.push(line);
        }
    }

    return {
        template: template,
        script: script,
        sourceScriptStart: sourceScriptStart
    }
}

function formatTemplate(template) {
    if(!template) return null;
    return escapeDoubleQuotes(template.trim());
}

function escapeDoubleQuotes(str) {
    return str.replace(/\\([\s\S])|(")/g,"\\$1$2"); // thanks @slevithan!
}





// for(i=0;i<inputScript.length;i++){
//     var match = null,
//         line = inputScript[i]
//     if(!inTemplate && line.match(TEMPLATE_START_REGX)) {
//         inTemplate = true;
//         // peek at the next line to get number of spaces before text is found
//         templeteIndent = inputScript[i+1].search(/\S/);
//     }
//     else if(inTemplate && line.match(TEMPLATE_END_REGX)) {
//         inTemplate = false;
//     }
//     else if(!inScript && line.match(SCRIPT_START_REGX)) {
//         inScript = true;
//         // peek at the next line to get the indent
//         scriptIndent = inputScript[i+1].search(/\S/);
//     }
//     else if(inScript && line.match(SCRIPT_END_REGX)) {
//         inScript = false;
//     }
//     else {
//
//         if (inTemplate) {
//             template.push(formatTemplate(line));
//         }
//
//         if (inScript) {
//
//             if(!match) {
//                 match = line.match(MODULE_EXPORTS_REGX) || line.match(EXPORT_DEFAULT_REGX);
//                 if(match) {
//                     script.push("var Components = Components || {};");
//                     script.push('Components["' + componentName + '"] = {');
//                     script.push(formatScript('name: "' + componentName +'",', scriptIndent, 1));
//                     if(template.length == 1) {
//                         script.push(formatScript('template: "' + formatTemplate(template[0]) + '",', scriptIndent, 1));
//                     }
//                     else {
//                         script.push(formatScript("template: [", scriptIndent, 1));
//
//                         for (j = 0; j < template.length; j++) {
//                             var text = template[j] || '';
//                             if (j < (template.length - 1)) {
//                                 script.push(formatScript('"' + text + '",', scriptIndent, 3));
//                             } else {
//                                 script.push(formatScript('"' + text + '"', scriptIndent, 3));
//                             }
//                         }
//                         script.push(formatScript('].join(""),', scriptIndent, 2));
//                     }
//                 }
//                 else if(line) {
//                     script.push(formatScript(line, scriptIndent));
//                 }
//                 else {
//                     script.push(formatScript({
//
//                     }));
//                 }
//             }
//             else {
//                 script.push(formatScript(line, scriptIndent));
//             }
//         }
//     }
// }
// script.push('Vue.component("'+ componentName +'", ' + 'Components["' + componentName + '"]);');
//
// var scriptText =  script.join('\n');
//
// console.log(outputFilePath, '\n', scriptText);
//
// var transform = buble.transform(scriptText);
// var result = transform.code + "\n";
// result += 'module.exports = ' + componentName + 'Component;';
//
// fs.writeFileSync(outputFilePath, result);
// fs.writeFileSync(outputFilePath + ".map", transform.map);
//
//
// function formatTemplate(html) {
//     if(html) {
//         var result = html.trim();
//         result = escapeDoubleQuotes(result);
//         return result;
//
//     }
//     return null;
// }
//
// function formatScript(line, indent, depthOverride) {
//     var i, depth,
//         indentSpace = '',
//         indentSpaces = '';
//
//     if(depthOverride) {
//         depth = depthOverride;
//     }
//     else {
//         depth = (line.search(/\S/) / indent) - 1;
//     }
//
//     for(i=0;i<indent;i++) {
//         indentSpace += ' ';
//     }
//
//     for(i=0;i<depth;i++) {
//         indentSpaces += indentSpace;
//     }
//
//     return indentSpaces + line.trim();
// }
//
// function escapeDoubleQuotes(str) {
//     return str.replace(/\\([\s\S])|(")/g,"\\$1$2"); // thanks @slevithan!
// }