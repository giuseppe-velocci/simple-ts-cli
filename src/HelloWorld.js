"use strict";
exports.__esModule = true;
exports.sayGoodbye = exports.sayHello = void 0;
var sayHello = function (io) {
    io.print('Hello world!');
};
exports.sayHello = sayHello;
var sayGoodbye = function (io) {
    io.print('Goodbye world!');
};
exports.sayGoodbye = sayGoodbye;
