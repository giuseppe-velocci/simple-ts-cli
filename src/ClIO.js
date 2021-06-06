"use strict";
exports.__esModule = true;
exports.ClIOImpl = void 0;
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});
var ClIOImpl = /** @class */ (function () {
    function ClIOImpl() {
    }
    ClIOImpl.prototype.prompt = function (action) {
        rl.question('', function (line) {
            action(line);
        });
    };
    ClIOImpl.prototype.print = function (message) {
        console.log(message);
    };
    ClIOImpl.prototype.error = function (message) {
        console.error(message);
    };
    ClIOImpl.prototype.exitProgram = function () {
        process.exit(0);
    };
    return ClIOImpl;
}());
exports.ClIOImpl = ClIOImpl;
