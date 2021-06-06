"use strict";
exports.__esModule = true;
var CliEntryPoint_1 = require("./src/CliEntryPoint");
var CliItems_1 = require("./src/CliItems");
var ClIO_1 = require("./src/ClIO");
var io = new ClIO_1.ClIOImpl();
var mainList = new Array(
/*
new CliCommand('say hello', () => sayHello(io)),
new CliMenu('actions', new Array<CliItem>(
    new CliCommand('say goodbye', () => sayGoodbye(io)),
))
*/
new CliItems_1.CliCommand('say hello', function () { }), new CliItems_1.CliMenu('actions', [
    new CliItems_1.CliMenu('one', [
        new CliItems_1.CliCommand('cmd', function () { })
    ])
]));
var entryPoint = new CliEntryPoint_1["default"](mainList, io);
entryPoint.start();
