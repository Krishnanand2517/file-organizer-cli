#!/usr/bin/env node

const help = require('./commands/help');
const organize = require('./commands/organize');
const tree = require('./commands/tree');

const inputArr = process.argv.slice(2);

const command = inputArr[0];

switch (command) {
    case "tree":
        tree.treeFn(inputArr[1]);
        break;
    case "organize":
        organize.organizeFn(inputArr[1]);
        break;
    case "help":
        help.helpFn();
        break;
    default:
        console.log(`Invalid command: '${command}'`);
        break;
}