"use strict";
exports.__esModule = true;
exports.CliCommand = exports.CliMenu = void 0;
var CliMenu = /** @class */ (function () {
    function CliMenu(message, menuItems) {
        this.message = message;
        this.menuItems = menuItems;
    }
    CliMenu.prototype.items = function () {
        return this.menuItems.slice(0);
    };
    return CliMenu;
}());
exports.CliMenu = CliMenu;
var CliCommand = /** @class */ (function () {
    function CliCommand(message, action) {
        this.message = message;
        this.action = action;
    }
    return CliCommand;
}());
exports.CliCommand = CliCommand;
